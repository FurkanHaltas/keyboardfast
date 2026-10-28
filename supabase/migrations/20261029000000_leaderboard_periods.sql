-- Weekly / monthly leaderboards. Periods are calendar-based in UTC: the week starts on
-- Monday 00:00, the month on the 1st. 'all' keeps the all-time board.

drop function if exists public.leaderboard(text, text, text, int);

create or replace function public.leaderboard(
  p_mode text,
  p_mode2 text,
  p_lang text,
  p_limit int default 50,
  p_period text default 'all'
)
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
      and r.created_at >= case p_period
        when 'week' then date_trunc('week', now() at time zone 'utc') at time zone 'utc'
        when 'month' then date_trunc('month', now() at time zone 'utc') at time zone 'utc'
        else '-infinity'::timestamptz
      end
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

revoke all on function public.leaderboard(text, text, text, int, text) from public;
grant execute on function public.leaderboard(text, text, text, int, text) to anon, authenticated;
