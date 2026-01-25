-- Re-enable RLS on waitlist tables (idempotent - safe if already enabled)
-- This syncs production state with local migrations
--
-- Production had RLS disabled as a manual hotfix. This migration ensures
-- RLS is enabled consistently across all environments.

ALTER TABLE public.waitlist_matchmakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_referrals ENABLE ROW LEVEL SECURITY;

-- Existing policies from 20260105000000_add_waitlist_tables.sql:
--   - anon can INSERT (public signups work)
--   - service_role can SELECT (admin can read data)
