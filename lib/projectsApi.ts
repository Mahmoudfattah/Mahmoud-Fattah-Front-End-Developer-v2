import type { Project } from '../types/project'
import { getSupabaseClient } from './supabase'

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await getSupabaseClient()
    .from('projects')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })

  if (error) {
    throw error
  }

  return (data ?? []) as Project[]
}
