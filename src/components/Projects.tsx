"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";

const FILTERS = [
  { key: "all", label: "Tümü" },
  { key: "online", label: "Online" },
  { key: "game", label: "Oyun" },
  { key: "wip", label: "Devam eden" },
  { key: "abandoned", label: "Terk edilen" },
] as const;

type Filter = (typeof FILTERS)[number]["key"];

export default function Projects({ projects, failed }: { projects: Project[]; failed: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: projects.length, online: 0, game: 0, wip: 0, abandoned: 0 };
    for (const p of projects) c[p.status] += 1;
    return c;
  }, [projects]);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.status === filter)),
    [projects, filter]
  );

  if (projects.length === 0) {
    return (
      <p className="muted">
        {failed ? "Projeler şu an yüklenemedi. Biraz sonra tekrar dene." : "Henüz proje eklenmedi."}
      </p>
    );
  }

  return (
    <>
      <div className="filters" role="group" aria-label="Proje filtresi">
        {FILTERS.filter((f) => f.key === "all" || counts[f.key] > 0).map((f) => (
          <button
            key={f.key}
            type="button"
            className={filter === f.key ? "chip is-active mono" : "chip mono"}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label} <span className="chip-count">{counts[f.key]}</span>
          </button>
        ))}
      </div>
      <div className="grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </>
  );
}
