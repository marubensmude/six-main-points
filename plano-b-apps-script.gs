/**
 * ════════════════════════════════════════════════════════════════════════
 *  MUDE IMÓVEIS — PLANO B DE NOTIFICAÇÃO DE LEADS (Google Apps Script)
 * ────────────────────────────────────────────────────────────────────────
 *  Recebe um lead do Six Main Points (smp.imoveismude.com.br) e envia um
 *  e-mail para a Mude. Funciona de forma INDEPENDENTE do EmailJS — sem
 *  Allowlist, sem cota de terceiros, usando o próprio Google Workspace.
 *
 *  ┌─ COMO PUBLICAR (uma única vez) ─────────────────────────────────────┐
 *  │ 1. Acesse https://script.google.com  logado como                    │
 *  │    mario@mudeimobiliaria.com.br                                      │
 *  │ 2. Novo projeto → apague o conteúdo → cole TODO este arquivo → salve.│
 *  │ 3. (Opcional) Rode a função  testar  uma vez e autorize as permissões│
 *  │    quando o Google pedir. Confira se o e-mail de teste chegou.       │
 *  │ 4. Implantar → Nova implantação → engrenagem → "App da Web".         │
 *  │       • Descrição: Plano B Six Main Points                           │
 *  │       • Executar como: Eu (mario@mudeimobiliaria.com.br)             │
 *  │       • Quem pode acessar: QUALQUER PESSOA                           │
 *  │ 5. Copie a URL que termina em  /exec  e cole no index.html na        │
 *  │    constante  APPS_SCRIPT_URL.                                       │
 *  └─────────────────────────────────────────────────────────────────────┘
 *
 *  IMPORTANTE: a cada alteração no código, use "Implantar → Gerenciar
 *  implantações → editar (lápis) → Nova versão" para que a URL /exec passe
 *  a refletir a mudança (a URL continua a mesma).
 * ════════════════════════════════════════════════════════════════════════
 */

// ── Configuração ───────────────────────────────────────────────────────────
const DESTINO = 'mario@mudeimobiliaria.com.br';   // para quem chega o lead
const ASSUNTO = 'Novo lead — Six Main Points';     // prefixo do assunto

// ── Recebe o POST vindo do site ────────────────────────────────────────────
function doPost(e) {
  try {
    var lead = {};
    if (e && e.postData && e.postData.contents) {
      lead = JSON.parse(e.postData.contents);
    }

    // Gera o Dossiê em PDF (a partir do HTML enviado pelo site, ou de um
    // resumo do lead caso o HTML não venha) e anexa ao e-mail.
    var pdf = gerarPdf(lead);

    MailApp.sendEmail({
      to:          DESTINO,
      replyTo:     lead.email || DESTINO,
      subject:     ASSUNTO + ' — ' + (lead.nome || 'Novo Cliente'),
      htmlBody:    montarHtml(lead),
      body:        montarTexto(lead),
      attachments: pdf ? [pdf] : []
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Registra o erro no Apps Script (Execuções) e devolve detalhe
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Gera o PDF do lead ──────────────────────────────────────────────────────
// Converte o HTML do Dossiê (campo pdf_html, vindo do site) em PDF. Se o HTML
// não vier, monta um PDF de resumo com os dados do lead.
function gerarPdf(lead) {
  try {
    var html = (lead.pdf_html && lead.pdf_html.length > 20)
      ? lead.pdf_html
      : '<div style="font-family:Arial,sans-serif;padding:24px;">' + montarHtml(lead) + '</div>';

    // Garante uma estrutura HTML mínima válida para a conversão
    var doc = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' + html + '</body></html>';

    var nomeArq = 'Dossie Six Main Points - ' + (lead.nome || 'Lead') + '.pdf';
    var blob = Utilities.newBlob(doc, 'text/html', 'dossie.html').getAs('application/pdf');
    blob.setName(nomeArq);
    return blob;
  } catch (err) {
    // Se a conversão falhar por qualquer motivo, segue sem anexo (não perde o lead)
    return null;
  }
}

// Healthcheck simples ao abrir a URL no navegador (método GET)
function doGet() {
  return ContentService
    .createTextOutput('Plano B Six Main Points — ativo.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── E-mail em HTML no padrão visual da Mude (preto / dourado / branco) ──────
function montarHtml(lead) {
  var dourado = '#B8893C', preto = '#111111', cinza = '#666666';
  function linha(rotulo, valor) {
    return '<tr>' +
      '<td style="padding:8px 14px;border-bottom:1px solid #eee;color:' + cinza +
        ';font-size:13px;white-space:nowrap;">' + rotulo + '</td>' +
      '<td style="padding:8px 14px;border-bottom:1px solid #eee;color:' + preto +
        ';font-size:14px;font-weight:600;">' + (valor || '—') + '</td>' +
    '</tr>';
  }
  var quer = (lead.quer_consultor === 'SIM' || lead.quer_consultor === true);

  return '' +
  '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;' +
       'border:1px solid #eee;border-radius:10px;overflow:hidden;">' +
    '<div style="background:' + preto + ';padding:18px 22px;">' +
      '<div style="color:' + dourado + ';font-size:12px;letter-spacing:2px;text-transform:uppercase;">Mude Imóveis</div>' +
      '<div style="color:#fff;font-size:18px;font-weight:700;margin-top:2px;">Novo lead — Six Main Points</div>' +
    '</div>' +
    '<div style="padding:18px 22px;">' +
      (quer
        ? '<div style="background:' + dourado + ';color:#fff;display:inline-block;padding:6px 12px;border-radius:6px;font-size:13px;font-weight:700;margin-bottom:14px;">★ Cliente PEDIU contato de um consultor</div>'
        : '<div style="background:#f3f3f3;color:' + cinza + ';display:inline-block;padding:6px 12px;border-radius:6px;font-size:13px;margin-bottom:14px;">Cliente apenas salvou o perfil (sem pedir contato)</div>') +
      '<table style="width:100%;border-collapse:collapse;">' +
        linha('Nome',        lead.nome) +
        linha('WhatsApp',    lead.wpp) +
        linha('E-mail',      lead.email) +
        linha('Interesse',   lead.interesse) +
        linha('Origem',      lead.utm_source) +
        linha('Mídia',       lead.utm_medium) +
        linha('Campanha',    lead.utm_campaign) +
        linha('Anúncio',     lead.utm_content) +
        linha('Recebido em', lead.quando) +
      '</table>' +
      '<p style="color:' + cinza + ';font-size:11px;margin-top:16px;">Notificação automática (Plano B · Google Apps Script). ' +
        'Enviada de forma independente do EmailJS para garantir que nenhum lead se perca.</p>' +
    '</div>' +
  '</div>';
}

// ── Versão texto-puro (fallback) ───────────────────────────────────────────
function montarTexto(lead) {
  return [
    'NOVO LEAD — SIX MAIN POINTS (Plano B)',
    '',
    'Quer consultor: ' + (lead.quer_consultor || 'Nao'),
    'Nome: '       + (lead.nome || '—'),
    'WhatsApp: '   + (lead.wpp || '—'),
    'E-mail: '     + (lead.email || '—'),
    'Interesse: '  + (lead.interesse || '—'),
    'Origem: '     + (lead.utm_source || '—'),
    'Mídia: '      + (lead.utm_medium || '—'),
    'Campanha: '   + (lead.utm_campaign || '—'),
    'Anúncio: '    + (lead.utm_content || '—'),
    'Recebido em: '+ (lead.quando || '—')
  ].join('\n');
}

// ── Teste manual (rode uma vez no editor para autorizar e validar) ─────────
function testar() {
  doPost({ postData: { contents: JSON.stringify({
    nome: 'Cliente Teste',
    email: 'teste@exemplo.com',
    wpp: '(67) 99999-9999',
    interesse: 'Investir',
    quer_consultor: 'SIM',
    utm_source: 'teste', utm_medium: 'manual',
    utm_campaign: '-', utm_content: '-',
    quando: new Date().toLocaleString('pt-BR')
  }) } });
}
