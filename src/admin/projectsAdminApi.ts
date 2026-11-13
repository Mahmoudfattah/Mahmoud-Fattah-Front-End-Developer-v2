import type { Project } from "../../types/project";
import { getSupabaseClient } from "../../lib/supabase";

export type ProjectInput = Omit<Project, "id" | "created_at" | "updated_at">;
export type ProjectChanges = Partial<ProjectInput>;
export type NewProjectInput = Pick<ProjectInput, "title" | "role">
  & Partial<Omit<ProjectInput, "title" | "role" | "slug" | "sort_order">>;

const STORAGE_IMAGE_MARKER = "/storage/v1/object/public/project-images/";

function throwIfNoRow<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw error;
  if (!data) throw new Error("Not allowed or not found");
  return data;
}

export async function deleteStoredProjectImage(imageUrl: string | null | undefined): Promise<void> {
  if (!imageUrl?.includes(STORAGE_IMAGE_MARKER)) return;

  const pathStart = imageUrl.indexOf(STORAGE_IMAGE_MARKER) + STORAGE_IMAGE_MARKER.length;
  const encodedPath = imageUrl.slice(pathStart).split(/[?#]/, 1)[0];
  if (!encodedPath) return;

  const path = decodeURIComponent(encodedPath);
  const { error } = await getSupabaseClient()
    .storage
    .from("project-images")
    .remove([path]);

  if (error) throw error;
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

export async function swapProjectOrder(firstId: string, secondId: string): Promise<Record<string, number>> {
  const projects = await listAllProjects();
  const firstIndex = projects.findIndex((project) => project.id === firstId);
  const secondIndex = projects.findIndex((project) => project.id === secondId);

  if (firstIndex < 0 || secondIndex < 0 || Math.abs(firstIndex - secondIndex) !== 1) {
    throw new Error("Projects changed. Reload the list and try again.");
  }

  const first = projects[Math.min(firstIndex, secondIndex)];
  const second = projects[Math.max(firstIndex, secondIndex)];
  const temporaryOrder = Math.max(-1, ...projects.map((project) => project.sort_order)) + 1;

  await updateProject(first.id, { sort_order: temporaryOrder });
  try {
    await updateProject(second.id, { sort_order: first.sort_order });
    await updateProject(first.id, { sort_order: second.sort_order });
  } catch (error) {
    try {
      await updateProject(second.id, { sort_order: second.sort_order });
      await updateProject(first.id, { sort_order: first.sort_order });
    } catch (rollbackError) {
      console.error("Failed to restore project order after an unsuccessful reorder.", rollbackError);
      throw new Error("Project order could not be saved or restored. Reload the projects before trying again.");
    }
    throw error;
  }

  return {
    [first.id]: second.sort_order,
    [second.id]: first.sort_order,
  };
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
