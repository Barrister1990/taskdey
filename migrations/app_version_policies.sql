-- App version policy for optional/forced store updates.
-- One active row per platform.

create table if not exists public.app_version_policies (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('android', 'ios')),
  latest_version text not null,
  minimum_supported_version text not null default '0.0.0',
  force_update boolean not null default false,
  store_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists app_version_policies_platform_active_idx
  on public.app_version_policies(platform)
  where is_active = true;

alter table public.app_version_policies enable row level security;

drop policy if exists "Anyone can read app version policies" on public.app_version_policies;
create policy "Anyone can read app version policies"
  on public.app_version_policies
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "No client writes app version policies" on public.app_version_policies;
create policy "No client writes app version policies"
  on public.app_version_policies
  for all
  to anon, authenticated
  using (false)
  with check (false);

drop trigger if exists app_version_policies_updated_at on public.app_version_policies;
create trigger app_version_policies_updated_at
before update on public.app_version_policies
for each row execute function public.set_updated_at();

-- Seed defaults (safe upsert).
insert into public.app_version_policies (
  platform,
  latest_version,
  minimum_supported_version,
  force_update,
  store_url,
  is_active
)
values
  ('android', '1.4.0', '1.4.0', false, 'https://play.google.com/store/apps/details?id=com.barrister1990.joymish', true),
  ('ios', '1.4.0', '1.4.0', false, null, true)
on conflict do nothing;
