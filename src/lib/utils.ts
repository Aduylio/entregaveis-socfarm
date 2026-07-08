import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFriendlyFileName(url: string): string {
  try {
    const segment = decodeURIComponent(url.split("/").at(-1) ?? "")
    return segment.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i, "").replace(/_/g, " ")
  } catch {
    return url.split("/").at(-1) ?? url
  }
}
