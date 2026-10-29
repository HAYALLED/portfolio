import Link from "next/link";
import type { Project, ProjectStatus } from "@/lib/types";
import { resolveLink, type ResolvedLink } from "@/lib/links";

const META: Record<ProjectStatus, { label: string; cta: string }> = {
  online: { label: "Online", cta: "Siteyi aç" },
  game: { label: "Oyun", cta: "Oyun sayfası" },
  wip: { label: "Devam ediyor", cta: "GitHub reposu" },
  abandoned: { label: "Şimdilik bırakıldı/Terk edildi", cta: "GitHub reposu" },
};

const REPO_STATUSES: ProjectStatus[] = ["wip", "abandoned"];

function CardLink({ link, text, title }: { link: ResolvedLink; text: string; title: string }) {
  const name = `${title}: ${text}`;
  return link.external ? (
    <a
      className="card-link"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} (yeni sekmede açılır)`}
    >
      {text} →
    </a>
  ) : (
    <Link className="card-link" href={link.href} aria-label={name}>
      {text} →
    </Link>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const meta = META[project.status];
  const repoFirst = REPO_STATUSES.includes(project.status);
  const primary = resolveLink(repoFirst ? project.repo_url : project.url);
  const secondary = project.show_second_url
    ? resolveLink(repoFirst ? project.url : project.repo_url)
    : null;
  const secondaryText = repoFirst ? "Canlı sayfa" : "GitHub reposu";

  return (
    <article className="card reveal">
      <div>
        <span className={`badge badge-${project.status} mono`}>{meta.label}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="muted">{project.description}</p>
      <ul className="tags mono" aria-label="Teknolojiler">
        {project.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="card-links">
        {primary ? (
          <CardLink link={primary} text={meta.cta} title={project.title} />
        ) : (
          <span className="card-link disabled">Yakında</span>
        )}
        {secondary && <CardLink link={secondary} text={secondaryText} title={project.title} />}
      </div>
    </article>
  );
}
