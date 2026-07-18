# Creova

Multi-tenant experience builder for brand websites, storefronts, bookings and memberships.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The legacy visual prototype remains available at `/index.html`. The Next.js application is the production foundation.

## Supabase

1. Create a Supabase project and add the values from `.env.example` to `.env.local`.
2. Run `supabase/migrations/0001_initial_schema.sql` in the Supabase SQL editor or via the Supabase CLI.
3. Create a private Storage bucket named `product-images` and add per-site storage policies.

The schema uses `site_id` on tenant data and RLS policies to ensure a brand owner only manages their own sites.

## Domains

Add `thecreova.com` and `*.thecreova.com` to Vercel. Set `NEXT_PUBLIC_ROOT_DOMAIN=thecreova.com`. Middleware rewrites a request like `nordik.thecreova.com` to `/sites/nordik` internally.
