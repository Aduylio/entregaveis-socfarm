import "server-only"

const STORAGE_BASE_PATTERN = "/storage/v1/object/public/materials/"

export function extractStoragePath(fileUrl: string): string | null {
  const index = fileUrl.indexOf(STORAGE_BASE_PATTERN)
  if (index === -1) return null

  const path = fileUrl.slice(index + STORAGE_BASE_PATTERN.length)
  if (!path) return null

  return decodeURIComponent(path)
}

export function isSupabaseStorageUrl(fileUrl: string): boolean {
  return fileUrl.includes(STORAGE_BASE_PATTERN)
}
