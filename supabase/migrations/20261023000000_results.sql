-- Typing test results, one row per finished test. Users can only see and write their own rows.

create table public.results (
  -- generated on the client so importing local history is idempotent
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  mode text not null check (mode in ('time', 'words', 'code')),
  mode2 text not null check (char_length(mode2) <= 20),
  lang text check (char_length(lang) <= 10),
  punctuation boolean not null default false,
  numbers boolean not null default false,
  wpm numeric(6, 2) not null check (wpm >= 0 and wpm < 400),
  raw numeric(6, 2) not null check (raw >= 0 and raw < 600),
  acc numeric(5, 2) not null check (acc between 0 and 100),
  consistency numeric(5, 2) not null check (consistency between 0 and 100),
  duration_ms integer not null check (duration_ms between 1000 and 3600000),
  chars jsonb not null check (jsonb_typeof(chars) = 'object')
);

create index results_user_created_idx on public.results (user_id, created_at);

alter table public.results enable row level security;

-- "Automatically expose new tables" is off, so grant exactly what the app needs.
grant select, insert, delete on public.results to authenticated;

create policy "read own results" on public.results
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "insert own results" on public.results
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "delete own results" on public.results
  for delete to authenticated
  using ((select auth.uid()) = user_id);
