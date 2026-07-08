import {
  getMaterialsByEventId as getMaterialsByEventIdRepo,
  createMaterial as createMaterialRepo,
  updateMaterial as updateMaterialRepo,
  deleteMaterial as deleteMaterialRepo,
} from "@/repositories/materials-repository"
import type { MaterialInsert, MaterialUpdate } from "@/types/database"
import type { Material } from "@/types"

export async function getMaterialsByEventId(eventId: string): Promise<Material[]> {
  return getMaterialsByEventIdRepo(eventId)
}

export async function getPublishedMaterialsByEventId(eventId: string): Promise<Material[]> {
  const materials = await getMaterialsByEventIdRepo(eventId)
  return materials.filter((m) => m.published)
}

export async function createMaterial(input: MaterialInsert): Promise<Material> {
  return createMaterialRepo(input)
}

export async function updateMaterial(id: string, input: MaterialUpdate): Promise<Material> {
  return updateMaterialRepo(id, input)
}

export async function deleteMaterial(id: string): Promise<void> {
  return deleteMaterialRepo(id)
}
