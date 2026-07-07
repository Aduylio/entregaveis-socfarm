-- =============================================================
-- Sprint 3A — Esquema do Banco de Dados (Supabase / PostgreSQL)
-- =============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================
-- Tabela: events
-- =============================================================
CREATE TABLE events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url    TEXT,
  cover_url   TEXT,
  primary_color TEXT NOT NULL DEFAULT '#DC2626',
  initial_message TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- Tabela: categories
-- =============================================================
CREATE TABLE categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id      UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  icon          TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- Tabela: materials
-- =============================================================
CREATE TABLE materials (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id      UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  category_id   UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  type          TEXT NOT NULL,
  file_url      TEXT,
  published     BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- Triggers: updated_at automático
-- =============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER materials_updated_at
  BEFORE UPDATE ON materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================
-- Seed: Dados Iniciais
-- =============================================================

-- 1. Evento
INSERT INTO events (id, name, description, logo_url, primary_color, initial_message)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Experiência Socfarm',
  'Materiais de apoio da Experiência Socfarm 2025. Aqui você encontra apresentações, planilhas e conteúdos exclusivos do evento.',
  '/branding/logo.png',
  '#DC2626',
  'Baixe apresentações, planilhas, materiais exclusivos e conteúdos compartilhados durante a Experiência Socfarm.'
);

-- 2. Categorias
INSERT INTO categories (id, event_id, name, display_order) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Compras',    1),
  ('b0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Financeiro', 2),
  ('b0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Gestão',     3),
  ('b0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Marketing',  4),
  ('b0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'IA',         5),
  ('b0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'Outros',     6);

-- 3. Materiais
INSERT INTO materials (id, event_id, category_id, title, description, type, file_url, published, display_order) VALUES
  -- Compras
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Planilha de Cotações',       'Modelo de planilha para cotação de fornecedores.',            'Excel',     '/mock/cotacoes.xlsx',       TRUE, 1),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Guia de Compras',            'Passo a passo para realizar compras no sistema.',             'PDF',       '/mock/guia-compras.pdf',    TRUE, 2),
  -- Financeiro
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'Fluxo de Caixa',             'Apresentação sobre gestão de fluxo de caixa.',                'PowerPoint', '/mock/fluxo-caixa.pptx',   TRUE, 1),
  ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'Relatório Financeiro',       'Relatório financeiro do primeiro trimestre.',                 'PDF',       '/mock/relatorio-financeiro.pdf', TRUE, 2),
  ('c0000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000002', 'Documento de Procedimentos', 'Documento com procedimentos financeiros atualizados.',        'Documento', '/mock/procedimentos.docx',  TRUE, 3),
  -- Gestão
  ('c0000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'Ebook de Gestão',            'Material completo sobre gestão empresarial.',                 'PDF',       '/mock/ebook-gestao.pdf',    TRUE, 1),
  ('c0000000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000003', 'Materiais de Apoio',         'Arquivos complementares do módulo de gestão.',                'ZIP',       '/mock/materiais-gestao.zip', TRUE, 2),
  -- Marketing
  ('c0000000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000004', 'Vídeo: Estratégias de Marketing', 'Gravação da aula sobre estratégias de marketing digital.', 'Vídeo', 'https://youtube.com/watch?v=example', TRUE, 1),
  -- IA
  ('c0000000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000005', 'Prompt para Análise de Dados', 'Prompt otimizado para análise de dados com IA.',              'Prompt IA', '/mock/prompt-analise.txt', TRUE, 1),
  -- Outros
  ('c0000000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000006', 'Link Útil',                  'Link para ferramenta recomendada durante o evento.',          'Link',      'https://exemplo.com/ferramenta', TRUE, 1);
