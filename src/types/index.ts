export type MaterialType =
  | "PDF"
  | "Excel"
  | "PowerPoint"
  | "ZIP"
  | "Vídeo"
  | "Link"
  | "Documento"
  | "Prompt IA"

export interface Event {
  id: string
  name: string
  description: string
  image_url: string | null
  logo_url: string | null
  primary_color: string
  welcome_message: string
  created_at: string
}

export interface Category {
  id: string
  event_id: string
  name: string
  slug: string
  display_order: number
}

export interface Material {
  id: string
  event_id: string
  category_id: string
  title: string
  description: string
  type: MaterialType
  file_url: string
  published: boolean
  display_order: number
  created_at: string
}
