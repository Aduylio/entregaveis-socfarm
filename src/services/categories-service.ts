import { getCategoriesByEventId as getCategoriesByEventIdRepo } from "@/repositories/categories-repository"

export async function getCategoriesByEventId(eventId: string) {
  return getCategoriesByEventIdRepo(eventId)
}
