#!/usr/bin/env node
/**
 * build-imoveis.mjs
 * ------------------------------------------------------------------
 * Baixa o feed VRSync do Praedium e gera data/imoveis.json, consumido
 * pelo Six Main Points no navegador.
 *
 * Existe porque assets.praedium.com.br nao envia cabecalhos CORS — o
 * navegador do cliente nao consegue ler o XML direto. Este script roda
 * no GitHub Actions (sem essa restricao) uma vez por dia.
 * ------------------------------------------------------------------
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FEED_URL =
  'https://assets.praedium.com.br/434UJSu8wWWEAI3K7y/central-de-conexoes/e30a4f4d-34f8-4740-957c-f2fc384b3e80-vrsync.xml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH  = resolve(__dirname, '..', 'data', 'imoveis.json');

// O feed traz ate 40 fotos por imovel; 3 bastam para o card e mantem
// o JSON leve o suficiente para carregar rapido no cliente.
const MAX_FOTOS = 3;

/* ─────────── Parser XML minimalista ───────────
   O feed e gerado por maquina e tem estrutura estavel, entao regex
   resolve sem precisar de dependencia externa. */

function blocos(xml, tagName) {
  const re = new RegExp('<' + tagName + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + tagName + '>', 'g');
  const out = [];
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1]);
  return out;
}

function tag(bloco, nome) {
  const m = bloco.match(new RegExp('<' + nome + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + nome + '>'));
  if (!m) return '';
  return m[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .trim();
}

function num(bloco, nome) {
  const v = tag(bloco, nome).replace(/[^\d.,-]/g, '').replace(',', '.');
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

/* ─────────── Tipologia ───────────
   O VRSync usa rotulos em ingles; o SMP usa as chaves do CATALOGO. */

function normalizarTipo(propertyType, usageType, titulo, descricao) {
  const p = (propertyType || '').toLowerCase();
  const texto = ((titulo || '') + ' ' + (descricao || '')).toLowerCase();
  const emCondominio = /condom[ií]nio fechado|em condom[ií]nio|casa de condom[ií]nio/.test(texto);

  if (p.includes('penthouse')) return 'cobertura';
  if (p.includes('apartment') || p.includes('flat')) return 'apartamento';
  if (p.includes('condo')) return 'casa_cond';
  if (p.includes('home') || p.includes('house')) return emCondominio ? 'casa_cond' : 'casa_rua';
  if (p.includes('farm') || p.includes('agricultural')) {
    if (/ch[áa]cara/.test(texto)) return 'chacara';
    if (/s[íi]tio/.test(texto))   return 'sitio';
    return 'fazenda';
  }
  if (p.includes('land') || p.includes('lot') || p.includes('allotment')) return 'terreno';
  if ((usageType || '').toLowerCase().includes('commercial')) {
    if (p.includes('office')) return 'sala_comercial';
    if (p.includes('store') || p.includes('shop')) return 'loja';
    if (p.includes('warehouse') || p.includes('industrial')) return 'galpao';
    return 'comercial';
  }
  return 'outro';
}

const ROTULO_TIPO = {
  apartamento:'Apartamento', cobertura:'Cobertura', casa_cond:'Casa em condomínio',
  casa_rua:'Casa', terreno:'Terreno / Lote', chacara:'Chácara', sitio:'Sítio',
  fazenda:'Fazenda', sala_comercial:'Sala comercial', loja:'Loja',
  galpao:'Galpão', comercial:'Comercial', outro:'Imóvel'
};

// Remove os emojis decorativos que o CRM coloca nos titulos — eles
// quebram a fonte Helvetica do jsPDF na geracao do dossie.
function limparTitulo(t) {
  if (!t) return '';
  return t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{2B00}-\u{2BFF}]/gu, '')
          .replace(/\s{2,}/g, ' ').trim();
}

function slug(s) {
  return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('-> baixando feed...');
  const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'MudeImoveis-SMP/1.0' } });
  if (!res.ok) throw new Error('feed respondeu HTTP ' + res.status);
  const xml = await res.text();
  console.log('   ' + (xml.length / 1024 / 1024).toFixed(2) + ' MB recebidos');

  const listings = blocos(xml, 'Listing');
  console.log('-> ' + listings.length + ' listings no feed');

  const imoveis = [];
  const descartados = { semId: 0, naoVenda: 0, semPreco: 0 };

  for (const L of listings) {
    const id = tag(L, 'ListingID');
    if (!id) { descartados.semId++; continue; }
    if (!/sale/i.test(tag(L, 'TransactionType'))) { descartados.naoVenda++; continue; }

    const preco = num(L, 'ListPrice') || num(blocos(L,'Details')[0] || '', 'ListPrice');
    if (!preco || preco <= 0) { descartados.semPreco++; continue; }

    const detalhes = blocos(L, 'Details')[0] || L;
    const local    = blocos(L, 'Location')[0] || L;
    const midia    = blocos(L, 'Media')[0] || '';

    const titulo    = limparTitulo(tag(L, 'Title'));
    const descricao = tag(detalhes, 'Description');

    const itens = [...midia.matchAll(/<Item[^>]*medium="image"[^>]*>([\s\S]*?)<\/Item>/g)];
    const primary = itens.filter(i => /primary="true"/.test(i[0]));
    const resto   = itens.filter(i => !/primary="true"/.test(i[0]));
    const fotos = [...primary, ...resto].slice(0, MAX_FOTOS).map(i => i[1].trim()).filter(Boolean);

    const tipo = normalizarTipo(tag(detalhes,'PropertyType'), tag(detalhes,'UsageType'), titulo, descricao);
    const bairro = tag(local, 'Neighborhood');
    const ufMatch = local.match(/<State[^>]*abbreviation="([^"]+)"/);

    imoveis.push({
      id, tipo,
      tipo_label: ROTULO_TIPO[tipo] || 'Imóvel',
      titulo,
      preco,
      condominio: num(detalhes, 'PropertyAdministrationFee'),
      area:      num(detalhes, 'LivingArea'),
      area_lote: num(detalhes, 'LotArea'),
      quartos:   num(detalhes, 'Bedrooms'),
      suites:    num(detalhes, 'Suites'),
      banheiros: num(detalhes, 'Bathrooms'),
      vagas:     num(detalhes, 'Garage'),
      bairro,
      bairro_slug: slug(bairro),
      cidade: tag(local, 'City'),
      uf: ufMatch ? ufMatch[1] : 'MS',
      // O site ignora o slug e resolve o imovel apenas pelo sufixo -id-N.
      url: 'https://mudeimobiliaria.com.br/imovel/' +
           slug(ROTULO_TIPO[tipo] || 'imovel') + '-' + (slug(bairro) || 'dourados') + '-id-' + id,
      foto: fotos[0] || '',
      fotos
    });
  }

  imoveis.sort((a, b) => b.preco - a.preco);

  const payload = {
    gerado_em: new Date().toISOString(),
    fonte: 'Praedium VRSync',
    total: imoveis.length,
    imoveis
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  const json = JSON.stringify(payload);
  writeFileSync(OUT_PATH, json, 'utf8');

  console.log('OK ' + imoveis.length + ' imoveis gravados (' + (json.length/1024).toFixed(0) + ' KB)');
  console.log('   descartados: ' + JSON.stringify(descartados));
  const porTipo = {};
  imoveis.forEach(i => { porTipo[i.tipo] = (porTipo[i.tipo] || 0) + 1; });
  console.log('   por tipo: ' + JSON.stringify(porTipo));
}

main().catch(err => { console.error('FALHOU: ' + err.message); process.exit(1); });
