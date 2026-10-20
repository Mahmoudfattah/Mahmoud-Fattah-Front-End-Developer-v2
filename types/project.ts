export interface Project {
  id: string
  slug: string | null
  title: string
  role: string
  status: 'published' | 'draft'
  description: string | null
  image_url: string | null
  tech_stack: string[]
  live_url: string | null
  repo_url: string | null
  image_position: string
  image_scale: number
  sort_order: number
  is_visible: boolean
  created_at: string
  updated_at: string
}
