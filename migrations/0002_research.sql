-- ResearchConnect domain schema — the server-side source of truth.
--
-- The demo build kept every study, consent, notice and report in the browser
-- (`localStorage`). These tables are what those screens read and write when the
-- app runs against a real database: Neon in production (`DATABASE_URL` set),
-- the embedded PGLite fallback in a local preview. The browser demo is still
-- the fallback when no database is configured at all.
--
-- Conventions (match migrations/auth/0001_auth.sql):
--   * snake_case columns, mapped to the camelCase client shapes in
--     src/lib/research/db.server.ts — the schema never leaks into the UI.
--   * per-user tables carry `user_id TEXT` (TEXT, not UUID — the preview dev
--     user id is the string 'dev-user'), and every query is scoped to the
--     verified session user server-side.
--   * `origin` records where a row came from: 'sample' (seeded demo record) or
--     'server' (created through the app).
--   * `created_at` / `updated_at` are timestamptz; the client shapes carry ISO
--     strings.

create table if not exists rc_profiles (
  user_id text primary key,
  email text not null default '',
  name text not null default '',
  role text not null default 'participant',
  institution text not null default '',
  programme text not null default '',
  email_verified boolean not null default false,
  notify_email boolean not null default true,
  notify_in_app boolean not null default true,
  suspended boolean not null default false,
  origin text not null default 'server',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rc_profiles_role_check check (role in ('researcher', 'participant', 'admin'))
);

-- One profile per email: a person signs in once, however they authenticate.
create unique index if not exists rc_profiles_email_idx
  on rc_profiles (lower(email))
  where email <> '';

create table if not exists rc_studies (
  id text primary key,
  owner_id text not null,
  title text not null default '',
  purpose text not null default '',
  description text not null default '',
  category text not null default 'Other',
  institution text not null default '',
  target_population text not null default '',
  age_min integer,
  age_max integer,
  location text not null default '',
  inclusion text not null default '',
  exclusion text not null default '',
  extra_questions text not null default '',
  target_count integer not null default 0,
  deadline text not null default '',
  method text not null default '',
  completion_minutes integer not null default 0,
  questionnaire_url text not null default '',
  incentive text not null default '',
  information_statement text not null default '',
  privacy_ack boolean not null default false,
  approval_ack boolean not null default false,
  status text not null default 'draft',
  rejection_reason text not null default '',
  change_request text not null default '',
  paused_by_admin boolean not null default false,
  origin text not null default 'server',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rc_studies_status_check check (
    status in ('draft', 'pending_review', 'approved', 'active', 'paused', 'completed', 'rejected')
  )
);

create index if not exists rc_studies_owner_idx on rc_studies (owner_id);
create index if not exists rc_studies_status_idx on rc_studies (status);

create table if not exists rc_applications (
  id text primary key,
  study_id text not null references rc_studies (id) on delete cascade,
  participant_id text not null,
  status text not null default 'consented',
  origin text not null default 'server',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rc_applications_status_check check (status in ('consented', 'declined', 'withdrawn'))
);

create index if not exists rc_applications_participant_idx on rc_applications (participant_id);
create index if not exists rc_applications_study_idx on rc_applications (study_id);

create table if not exists rc_responses (
  id text primary key,
  study_id text not null references rc_studies (id) on delete cascade,
  code text not null default '',
  participant_id text,
  application_id text,
  completed_at timestamptz,
  quality text not null default 'pending',
  withdrawn boolean not null default false,
  note text not null default '',
  origin text not null default 'server',
  created_at timestamptz not null default now(),
  constraint rc_responses_quality_check check (
    quality in ('pending', 'accepted', 'excluded', 'needs_review')
  )
);

create index if not exists rc_responses_study_idx on rc_responses (study_id);

create table if not exists rc_notices (
  id text primary key,
  user_id text not null,
  title text not null default '',
  body text not null default '',
  href text not null default '',
  read boolean not null default false,
  origin text not null default 'server',
  created_at timestamptz not null default now()
);

create index if not exists rc_notices_user_idx on rc_notices (user_id);

create table if not exists rc_audit_events (
  id text primary key,
  actor_id text not null,
  actor_name text not null default '',
  action text not null default '',
  detail text not null default '',
  origin text not null default 'server',
  created_at timestamptz not null default now()
);

create index if not exists rc_audit_events_created_idx on rc_audit_events (created_at desc);

create table if not exists rc_issues (
  id text primary key,
  source text not null default 'contact',
  name text not null default '',
  email text not null default '',
  subject text not null default '',
  body text not null default '',
  status text not null default 'open',
  study_id text,
  origin text not null default 'server',
  created_at timestamptz not null default now(),
  constraint rc_issues_status_check check (status in ('open', 'reviewing', 'closed'))
);

create index if not exists rc_issues_status_idx on rc_issues (status);
