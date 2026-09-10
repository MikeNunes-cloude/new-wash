-- Função "gratuita / permuta" — colunas na tabela de agendamentos.
-- Rode UMA vez no Supabase (SQL Editor). É idempotente.
alter table appointments add column if not exists free        boolean default false;
alter table appointments add column if not exists free_type   text;      -- 'permuta' | 'cortesia'
alter table appointments add column if not exists free_reason text;       -- para quem / o que foi trocado
