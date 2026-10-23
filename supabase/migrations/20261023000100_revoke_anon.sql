-- Signed-out visitors never need the results table; RLS already hides rows, this removes access entirely.
revoke all on public.results from anon;
