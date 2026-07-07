export type MaterialType =
  | "PDF"
  | "Excel"
  | "PowerPoint"
  | "ZIP"
  | "Vídeo"
  | "Link"
  | "Documento"
  | "Prompt IA"

export interface Material {
  id: string
  event_id: string
  category_id: string
  title: string
  description: string | null
  type: MaterialType
  file_url: string | null
  published: boolean
  display_order: number
  created_at: string
  updated_at: string
}
