import type { Project } from '../types/project'
import { supabase } from './supabase'

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })

  if (error) {
    throw error
  }

  return (data ?? []) as Project[]
}
