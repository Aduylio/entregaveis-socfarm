import type { MaterialType } from "@/types"

const extensionMap: Record<string, MaterialType> = {
  pdf: "PDF",
  xls: "Excel",
  xlsx: "Excel",
  csv: "Excel",
  ppt: "PowerPoint",
  pptx: "PowerPoint",
  zip: "ZIP",
  rar: "ZIP",
  "7z": "ZIP",
  gz: "ZIP",
  tar: "ZIP",
  mp4: "Vídeo",
  mov: "Vídeo",
  avi: "Vídeo",
  wmv: "Vídeo",
  mkv: "Vídeo",
  webm: "Vídeo",
  doc: "Documento",
  docx: "Documento",
  odt: "Documento",
  txt: "Documento",
  md: "Prompt IA",
  png: "Documento",
  jpg: "Documento",
  jpeg: "Documento",
  gif: "Documento",
  svg: "Documento",
}

export function detectMaterialType(
  filename: string,
  mimeType?: string
): MaterialType {
  const ext = filename.split(".").pop()?.toLowerCase()

  if (ext && extensionMap[ext]) {
    return extensionMap[ext]
  }

  if (mimeType) {
    if (mimeType.startsWith("video/")) return "Vídeo"
    if (mimeType === "application/pdf") return "PDF"
    if (
      mimeType.includes("spreadsheet") ||
      mimeType.includes("excel")
    )
      return "Excel"
    if (
      mimeType.includes("presentation") ||
      mimeType.includes("powerpoint")
    )
      return "PowerPoint"
    if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("compress"))
      return "ZIP"
    if (mimeType.includes("word") || mimeType.includes("document"))
      return "Documento"
    if (mimeType.startsWith("text/")) return "Documento"
  }

  return "Documento"
}
