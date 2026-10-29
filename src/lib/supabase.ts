import { createClient } from "@supabase/supabase-js";
import type { Project } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  url && key
    ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
    : null;

export interface ProjectsResult {
  projects: Project[];
  failed: boolean;
}

export async function getProjects(): Promise<ProjectsResult> {
  if (!supabase) return { projects: [], failed: true };
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,description,tags,status,url,repo_url,show_second_url,sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase error:", error.message);
    return { projects: [], failed: true };
  }
  return { projects: (data ?? []) as Project[], failed: false };
}