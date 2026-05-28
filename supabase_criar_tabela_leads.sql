-- ══════════════════════════════════════════════════════════════════════════════
-- SUPABASE — Criar tabela de leads do Six Main Points
--
-- Como executar:
--   1. Acesse https://supabase.com → seu projeto "smb"
--   2. Menu lateral → "SQL Editor"
--   3. Cole este script inteiro e clique em "Run"
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.leads (
  id                  BIGSERIAL PRIMARY KEY,
  created_at          TIMESTAMPTZ DEFAULT NOW(),

  -- Identificação
  data_preenchimento  TEXT,
  nome                TEXT,
  wpp                 TEXT,
  email               TEXT,
  interesse           TEXT,

  -- Ponto 1 — Localização
  loc_bairros         TEXT[],
  loc_proximidade     TEXT[],
  obs_loc             TEXT,

  -- Ponto 2 — Tipologia
  tipologia           TEXT,
  quartos             INTEGER,
  suites              INTEGER,
  vagas               INTEGER,
  area_m2             INTEGER,

  -- Ponto 3 — Qualidade
  padrao              TEXT,
  estado_imovel       TEXT,
  prazo_compra        TEXT,

  -- Ponto 4 — Diferenciais
  diferenciais        TEXT[],
  obs_diferenciais    TEXT,

  -- Ponto 5 — Preço
  preco_min           INTEGER,
  preco_max           INTEGER,

  -- Ponto 6 — Pagamento
  pgto                TEXT[],
  obs_permuta         TEXT,
  prazo_negocio       TEXT,
  obs_finais          TEXT,

  -- Tracking & Atribuição (Meta/Google/TikTok/Bing)
  -- Contém: fbclid, gclid, gbraid, wbraid, msclkid, ttclid,
  --         fbp, fbc, utm_source/medium/campaign/content/term,
  --         referrer, landing_url
  attribution         JSONB
);

-- ── Se a tabela JÁ existe, rode só esta linha para adicionar a coluna ─────────
-- ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS attribution JSONB;

-- Índice GIN para consultas tipo: WHERE attribution->>'utm_source' = 'facebook'
CREATE INDEX IF NOT EXISTS leads_attribution_gin
  ON public.leads USING GIN (attribution);

-- ── Permissões (libera insert e select para o anon key usado no site) ─────────
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode INSERIR (preencher o formulário)
CREATE POLICY "insert_publico" ON public.leads
  FOR INSERT TO anon WITH CHECK (true);

-- Somente o service_role (painel admin) pode LER
-- Mas como usamos o anon key no admin, liberamos SELECT também:
CREATE POLICY "select_anon" ON public.leads
  FOR SELECT TO anon USING (true);
