import Link from "next/link";
import type { Project, ProjectStatus } from "@/lib/types";
import { resolveLink } from "@/lib/links";

const META: Record<ProjectStatus, { label: string; cta: string }> = {
  online: { label: "Online", cta: "Siteyi aç" },
  game: { label: "Oyun", cta: "Oyun sayfası" },
  wip: { label: "Devam ediyor", cta: "GitHub reposu" },
};

export default function ProjectCard({ project }: { project: Project }) {
  const meta = META[project.status];
  const link = resolveLink(project.status === "wip" ? project.repo_url : project.url);
  const cta = `${meta.cta} →`;

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
      {!link ? (
        <span className="card-link disabled">Yakında</span>
      ) : link.external ? (
        <a
          className="card-link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: ${meta.cta} (yeni sekmede açılır)`}
        >
          {cta}
        </a>
      ) : (
        <Link className="card-link" href={link.href} aria-label={`${project.title}: ${meta.cta}`}>
          {cta}
        </Link>
      )}
    </article>
  );
}
