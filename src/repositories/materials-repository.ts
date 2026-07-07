import { supabase } from "@/lib/supabase"
import type { Material, MaterialType } from "@/types/material"
import type { MaterialInsert, MaterialUpdate } from "@/types/database"

export async function getMaterialsByEventId(eventId: string): Promise<Material[]> {
  const { data, error } = await supabase
    .from("materials")
    .select("*")
    .eq("event_id", eventId)
    .order("display_order", { ascending: true })

  if (error) {
    throw new Error(`Erro ao buscar materiais: ${error.message}`)
  }

  return (data ?? []).map(parseMaterialRow)
}

export async function createMaterial(input: MaterialInsert): Promise<Material> {
  const { data, error } = await supabase
    .from("materials")
    .insert(input)
    .select()
    .single()

  if (error) {
    throw new Error(`Erro ao criar material: ${error.message}`)
  }

  return parseMaterialRow(data)
}

export async function updateMaterial(id: string, input: MaterialUpdate): Promise<Material> {
  const { data, error } = await supabase
    .from("materials")
    .update(input)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw new Error(`Erro ao atualizar material: ${error.message}`)
  }

  return parseMaterialRow(data)
}

export async function deleteMaterial(id: string): Promise<void> {
  const { error } = await supabase
    .from("materials")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(`Erro ao deletar material: ${error.message}`)
  }
}

function parseMaterialRow(row: Record<string, unknown>): Material {
  return {
    id: row.id as string,
    event_id: row.event_id as string,
    category_id: row.category_id as string,
    title: row.title as string,
    description: row.description as string | null,
    type: row.type as MaterialType,
    file_url: row.file_url as string | null,
    published: row.published as boolean,
    display_order: row.display_order as number,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}
