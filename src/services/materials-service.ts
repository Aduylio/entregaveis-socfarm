import {
  getMaterialsByEventId as getMaterialsByEventIdRepo,
  createMaterial as createMaterialRepo,
  updateMaterial as updateMaterialRepo,
  deleteMaterial as deleteMaterialRepo,
} from "@/repositories/materials-repository"
import type { MaterialInsert, MaterialUpdate } from "@/types/database"

export async function getMaterialsByEventId(eventId: string) {
  return getMaterialsByEventIdRepo(eventId)
}

export async function createMaterial(input: MaterialInsert) {
  return createMaterialRepo(input)
}

export async function updateMaterial(id: string, input: MaterialUpdate) {
  return updateMaterialRepo(id, input)
}

export async function deleteMaterial(id: string) {
  return deleteMaterialRepo(id)
}
