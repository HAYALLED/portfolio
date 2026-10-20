-- Supabase > SQL Editor'da çalıştır.
create type project_status as enum ('online', 'game', 'wip');

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  status project_status not null,
  url text,
  repo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  constraint link_required check (
    (status = 'wip' and repo_url is not null)
    or (status <> 'wip' and url is not null)
  )
);

alter table public.projects enable row level security;

create policy "public read"
  on public.projects for select
  to anon, authenticated
  using (true);

insert into public.projects (title, description, tags, status, url, repo_url, sort_order) values
  ('Örnek Web Projesi', 'Canlıda yayınlanan web uygulaması.', '{Next.js,Supabase,Vercel}', 'online', 'https://example.com', null, 1),
  ('Örnek Oyun', 'Godot ile geliştirilen aktif oyun.', '{Godot,GDScript}', 'game', 'https://example.itch.io/oyun', null, 2),
  ('Örnek Yarım Proje', 'Geliştirmesi devam eden proje.', '{TypeScript,React}', 'wip', null, 'https://github.com/kullanici/repo', 3);
