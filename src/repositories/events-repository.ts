import { supabase } from "@/lib/supabase"
import type { Event } from "@/types/event"

export async function getCurrentEvent(): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error(`Erro ao buscar evento: ${error.message}`)
  }

  return data
}
