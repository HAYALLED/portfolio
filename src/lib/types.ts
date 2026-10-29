export type ProjectStatus = "online" | "game" | "wip" | "abandoned";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  url: string | null;
  repo_url: string | null;
  show_second_url: boolean;
  sort_order: number;
}
