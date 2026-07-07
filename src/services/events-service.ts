import { getCurrentEvent as getCurrentEventRepo } from "@/repositories/events-repository"

export async function getCurrentEvent() {
  return getCurrentEventRepo()
}
