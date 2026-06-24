-- Postgres schema for when you graduate from the JSON store.
-- Matches the shapes used by the controllers.

create table if not exists users (
  id            text primary key,
  name          text not null,
  email         text unique not null,
  niche         text,
  password_hash text,                       -- null for social-only accounts
  provider      text,                       -- google | microsoft | yahoo | apple | null
  plan          text not null default 'trial',
  drafts_used   int  not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists profiles (
  id         text primary key,
  user_id    text not null references users(id) on delete cascade,
  name       text not null,
  niche      text,
  slug       text,
  color      text,
  model      jsonb not null default '{}',   -- the generated brand model
  created_at timestamptz not null default now()
);

create table if not exists workspaces (
  user_id    text primary key references users(id) on delete cascade,
  doc        jsonb not null default '{}',   -- block-editor document
  updated_at timestamptz not null default now()
);

create table if not exists pages (
  slug       text primary key,
  user_id    text not null references users(id) on delete cascade,
  profile_id text references profiles(id) on delete set null,
  published  boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  user_id    text primary key references users(id) on delete cascade,
  status     text not null,                 -- active | canceled | trialing
  plan       text,                          -- monthly | yearly
  provider_id text,                         -- stripe subscription id
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);
