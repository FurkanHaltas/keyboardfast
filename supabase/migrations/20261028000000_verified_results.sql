-- Server-verified results. Our API replays each test's keystrokes (see src/server/verify.ts)
-- and writes verified rows with the secret key; browsers can no longer set these columns,
-- and only verified results are ranked.

alter table public.results
  add column verified boolean not null default false,
  -- the ticket that verified this result; unique so one ticket can't verify two results
  add column ticket_nonce text unique check (char_length(ticket_nonce) <= 64);

-- Column-level insert grant: everything except verified / ticket_nonce.
revoke insert on public.results from authenticated;
grant insert (id, user_id, created_at, mode, mode2, lang, punctuation, numbers, wpm, raw, acc, consistency, duration_ms, chars)
  on public.results to authenticated;

drop index if exists public.results_board_idx;
create index results_board_idx on public.results (mode, mode2, lang, wpm desc)
  where verified and not punctuation and not numbers;

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
    where r.verified
      and r.mode = p_mode
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
