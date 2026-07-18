create extension if not exists pgcrypto;

create table public.sites (
  id uuid primary key default gen_random_uuid(), owner_id uuid references auth.users(id) not null,
  name text not null, slug text unique not null, custom_domain text unique,
  status text not null default 'draft', created_at timestamptz not null default now()
);
create table public.pages (
  id uuid primary key default gen_random_uuid(), site_id uuid references public.sites(id) on delete cascade not null,
  title text not null, slug text not null, content jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), unique(site_id, slug)
);
create table public.products (
  id uuid primary key default gen_random_uuid(), site_id uuid references public.sites(id) on delete cascade not null,
  name text not null, description text, category text, price numeric(10,2), image_url text, stock integer not null default 0, created_at timestamptz not null default now()
);
create table public.customers (
  id uuid primary key default gen_random_uuid(), site_id uuid references public.sites(id) on delete cascade not null,
  auth_user_id uuid references auth.users(id), name text, email text, created_at timestamptz not null default now(), unique(site_id, auth_user_id)
);
create table public.orders (
  id uuid primary key default gen_random_uuid(), site_id uuid references public.sites(id) on delete cascade not null,
  customer_id uuid references public.customers(id), total numeric(10,2) not null default 0, status text not null default 'pending', created_at timestamptz not null default now()
);

alter table public.sites enable row level security;
alter table public.pages enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;

create policy "Owners manage their sites" on public.sites for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "Owners manage their pages" on public.pages for all using (exists (select 1 from public.sites where sites.id = pages.site_id and sites.owner_id = auth.uid())) with check (exists (select 1 from public.sites where sites.id = pages.site_id and sites.owner_id = auth.uid()));
create policy "Owners manage their products" on public.products for all using (exists (select 1 from public.sites where sites.id = products.site_id and sites.owner_id = auth.uid())) with check (exists (select 1 from public.sites where sites.id = products.site_id and sites.owner_id = auth.uid()));
create policy "Owners manage their customers" on public.customers for all using (exists (select 1 from public.sites where sites.id = customers.site_id and sites.owner_id = auth.uid())) with check (exists (select 1 from public.sites where sites.id = customers.site_id and sites.owner_id = auth.uid()));
create policy "Owners manage their orders" on public.orders for all using (exists (select 1 from public.sites where sites.id = orders.site_id and sites.owner_id = auth.uid())) with check (exists (select 1 from public.sites where sites.id = orders.site_id and sites.owner_id = auth.uid()));
