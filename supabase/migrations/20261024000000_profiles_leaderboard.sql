-- Public usernames + per-category leaderboards. Only signed-in users with a username are ranked.

create table public.profiles (
  id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  username text not null check (username ~ '^[A-Za-z0-9_]{3,20}$'),
  created_at timestamptz not null default now()
);

create unique index profiles_username_lower_idx on public.profiles (lower(username));

alter table public.profiles enable row level security;
revoke all on public.profiles from anon;
-- Upserts rewrite every supplied column, so update is granted on the row; RLS pins id to the caller.
grant select, insert, update on public.profiles to authenticated;

create policy "read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "create own profile" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "rename own profile" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Plausibility checks so obviously forged results cannot enter the leaderboard.
-- Net speed never exceeds raw speed, and a timed test lasts exactly its length.
alter table public.results
  add constraint results_wpm_le_raw check (wpm <= raw + 1),
  add constraint results_time_duration check (
    mode <> 'time' or (mode2 ~ '^\d+$' and abs(duration_ms - mode2::int * 1000) <= 1500)
  );

create index results_board_idx on public.results (mode, mode2, lang, wpm desc)
  where not punctuation and not numbers;

-- Best result per user in one category. Security definer so visitors can read rankings
-- without access to the results table; it exposes usernames and scores only.
create or replace function public.leaderboard(p_mode text, p_mode2 text, p_lang text, p_limit int default 50)
returns table (
  rank bigint,
  username text,
  is_me boolean,
  wpm numeric,
  raw numeric,
  acc numeric,
  consistency numeric,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  with best as (
    select distinct on (r.user_id)
      r.user_id, r.wpm, r.raw, r.acc, r.consistency, r.created_at
    from public.results r
    where r.mode = p_mode
      and r.mode2 = p_mode2
      and r.lang is not distinct from p_lang
      and not r.punctuation
      and not r.numbers
      and r.acc >= 75
    order by r.user_id, r.wpm desc, r.created_at asc
  )
  select
    rank() over (order by b.wpm desc, b.created_at asc),
    p.username,
    b.user_id = auth.uid(),
    b.wpm, b.raw, b.acc, b.consistency, b.created_at
  from best b
  join public.profiles p on p.id = b.user_id
  order by b.wpm desc, b.created_at asc
  limit least(greatest(p_limit, 1), 100);
$$;

revoke all on function public.leaderboard(text, text, text, int) from public;
grant execute on function public.leaderboard(text, text, text, int) to anon, authenticated;
