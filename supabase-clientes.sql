-- Aba "Clientes": plano de assinatura (prata/ouro), observações e último contato.
-- Rode UMA vez no Supabase (SQL Editor → New query → Run). É idempotente.
create table if not exists clients (
  id           text primary key,   -- 'p' + telefone (ou 'n' + nome, se não tiver telefone)
  name         text,
  phone        text,
  plan         text,               -- 'prata' | 'ouro' | null
  notes        text,
  last_contact bigint,             -- quando foi chamado no WhatsApp (ms)
  updated_at   bigint
);

alter table clients enable row level security;
drop policy if exists "app acesso clients" on clients;
create policy "app acesso clients" on clients for all to anon, authenticated using (true) with check (true);

-- sincronização em tempo real entre os celulares
do $$ begin
  alter publication supabase_realtime add table clients;
exception when duplicate_object then null; end $$;
