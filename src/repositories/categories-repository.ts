import { supabase } from "@/lib/supabase"
import type { Category } from "@/types/category"

export async function getCategoriesByEventId(eventId: string): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("event_id", eventId)
    .order("display_order", { ascending: true })

  if (error) {
    throw new Error(`Erro ao buscar categorias: ${error.message}`)
  }

  return data ?? []
}
