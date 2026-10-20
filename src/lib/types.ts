export type ProjectStatus = "online" | "game" | "wip";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  url: string | null;
  repo_url: string | null;
  sort_order: number;
}
