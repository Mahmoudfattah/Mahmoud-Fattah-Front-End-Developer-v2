import type { Project } from "../../types/project";
import { getSupabaseClient } from "../../lib/supabase";

export type ProjectInput = Omit<Project, "id" | "created_at" | "updated_at">;
export type ProjectChanges = Partial<ProjectInput>;
export type NewProjectInput = Pick<ProjectInput, "title" | "role">
  & Partial<Omit<ProjectInput, "title" | "role" | "slug" | "sort_order">>;

function throwIfNoRow<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw error;
  if (!data) throw new Error("Not allowed or not found");
  return data;
}

export async function listAllProjects(): Promise<Project[]> {
  const { data, error } = await getSupabaseClient()
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function createProject(data: NewProjectInput): Promise<Project> {
  const projects = await listAllProjects();
  const existingSlugs = new Set(projects.map((project) => project.slug).filter(Boolean));
  const baseSlug = data.title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";

  let slug = baseSlug;
  let suffix = 2;
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const sortOrder = projects.length
    ? Math.max(...projects.map((project) => project.sort_order)) + 1
    : 0;
  const { data: created, error } = await getSupabaseClient()
    .from("projects")
    .insert({ ...data, slug, sort_order: sortOrder })
    .select()
    .single();

  return throwIfNoRow(created as Project | null, error);
}

export async function updateProject(id: string, data: ProjectChanges): Promise<Project> {
  const { data: updated, error } = await getSupabaseClient()
    .from("projects")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  return throwIfNoRow(updated as Project | null, error);
}

export async function deleteProject(id: string): Promise<Project> {
  const { data: deleted, error } = await getSupabaseClient()
    .from("projects")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return throwIfNoRow(deleted as Project | null, error);
}
