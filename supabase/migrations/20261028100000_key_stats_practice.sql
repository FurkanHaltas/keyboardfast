-- Per-test key data for the weak-key heatmap and practice mode, plus the "practice" mode.

alter table public.results
  add column key_stats jsonb check (key_stats is null or (jsonb_typeof(key_stats) = 'object' and pg_column_size(key_stats) < 16384));

-- Browsers may write key_stats too (verified/ticket_nonce stay server-only).
grant insert (key_stats) on public.results to authenticated;

alter table public.results drop constraint results_mode_check;
alter table public.results add constraint results_mode_check check (mode in ('time', 'words', 'code', 'practice'));
