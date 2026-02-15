-- 1. Subscriptions (Synced with Stripe)
create table if not exists subscriptions (
  user_id text primary key,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text,
  price_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean,
  updated_at timestamptz default now()
);

-- 2. Usage Tracking
create table if not exists usage (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  period_start timestamptz,
  period_end timestamptz,
  count int default 0,
  updated_at timestamptz default now(),
  unique (user_id, period_start, period_end)
);

-- 3. Designs
create table if not exists designs (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  prompt text,
  hoodie_color text,
  hoodie_size text,
  image_url text,
  created_at timestamptz default now()
);

-- 4. Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  design_id uuid references designs(id),
  hoodie_color text,
  hoodie_size text,
  shipping_option_id text,
  base_price_gbp numeric,
  discount_percent numeric,
  discount_amount_gbp numeric,
  shipping_gbp numeric,
  total_gbp numeric,
  stripe_checkout_session_id text,
  status text default 'draft', -- draft, submitted, paid, canceled
  created_at timestamptz default now()
);

-- Enable RLS (though we mostly use Admin client, it's good practice)
alter table subscriptions enable row level security;
alter table usage enable row level security;
alter table designs enable row level security;
alter table orders enable row level security;
