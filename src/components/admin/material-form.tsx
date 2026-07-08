"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, FileText, Link, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn, getFriendlyFileName } from "@/lib/utils"
import { detectMaterialType } from "@/lib/detect-type"
import type { Material, MaterialType, Category } from "@/types"

export interface MaterialFormData {
  title: string
  description: string
  category_id: string
  type: MaterialType
  file_url: string | null
}

interface MaterialFormProps {
  categories: Category[]
  initialData?: Material
  onSubmit: (data: MaterialFormData) => Promise<void>
  onCancel: () => void
}

function MaterialForm({
  categories,
  initialData,
  onSubmit,
  onCancel,
}: MaterialFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "")
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  )
  const [categoryId, setCategoryId] = useState(
    initialData?.category_id ?? categories[0]?.id ?? ""
  )
  const [type, setType] = useState<MaterialType>(
    initialData?.type ?? "Documento"
  )
  const [fileUrl, setFileUrl] = useState<string | null>(
    initialData?.file_url ?? null
  )
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [manualUrl, setManualUrl] = useState(
    initialData?.file_url && !initialData?.file_url?.startsWith(
      "https://wdukjjadjvthcapvpcqf.supabase.co/storage"
    )
      ? initialData.file_url
      : ""
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const typeDetectedRef = useRef(false)

  useEffect(() => {
    if (initialData?.type) {
      typeDetectedRef.current = true
    }
  }, [initialData])

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setUploading(true)
    setManualUrl("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error ?? "Erro no upload")
      }

      const data = await response.json()
      setFileUrl(data.file_url)

      if (data.detected_type) {
        setType(data.detected_type as MaterialType)
        typeDetectedRef.current = true
      }
    } catch {
      setFileName(null)
    } finally {
      setUploading(false)
    }
  }

  function handleUrlChange(value: string) {
    setManualUrl(value)
    if (!value.trim()) {
      if (!initialData?.file_url) {
        setFileUrl(null)
        setType("Documento")
        typeDetectedRef.current = false
      }
      return
    }
    setFileUrl(value)
    setFileName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    const detected = detectMaterialType(value)
    setType(detected)
    typeDetectedRef.current = true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError("")
    try {
      await onSubmit({
        title,
        description,
        category_id: categoryId,
        type,
        file_url: fileUrl,
      })
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao salvar material."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>
          {initialData ? "Editar Material" : "Novo Material"}
        </DialogTitle>
        <DialogDescription>
          {initialData
            ? "Altere os campos abaixo para atualizar o material."
            : "Preencha os campos abaixo para criar um novo material."}
        </DialogDescription>
      </DialogHeader>

      <div className="w-full min-w-0 space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nome do material"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descrição do material"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Arquivo</Label>
          <div className="flex items-center gap-3 min-w-0">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="shrink-0"
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {uploading ? "Enviando..." : "Selecionar arquivo"}
            </Button>
            {fileName && (
              <span
                className="flex-1 min-w-0 truncate text-sm text-muted-foreground"
                title={fileName}
              >
                {fileName}
              </span>
            )}
          </div>

          <div className="relative">
            <Link className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="url"
              value={manualUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="Ou cole uma URL externa..."
              className={cn(
                "h-8 w-full rounded-lg border bg-transparent py-1 text-sm outline-none transition-colors",
                "pl-8 pr-2.5",
                "border-input text-foreground placeholder:text-muted-foreground",
                "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              )}
            />
          </div>

          <div
            className={cn(
              "flex min-w-0 items-center rounded-lg border bg-transparent px-2.5 text-sm",
              fileUrl
                ? "border-primary/30 text-foreground"
                : "border-input text-muted-foreground"
            )}
          >
            {fileUrl ? (
              <span
                className="flex items-center gap-2 truncate min-w-0"
                title={getFriendlyFileName(fileUrl)}
              >
                <FileText className="size-3.5 shrink-0 text-primary" />
                <span className="truncate whitespace-nowrap">{getFriendlyFileName(fileUrl)}</span>
              </span>
            ) : (
              "Nenhum arquivo ou URL selecionado"
            )}
          </div>

          {typeDetectedRef.current && type && (
            <p className="text-xs text-muted-foreground">
              Tipo detectado: <span className="font-medium text-foreground">{type}</span>
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {submitError}
        </div>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting || uploading}>
          {submitting ? "Salvando..." : initialData ? "Salvar" : "Criar"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export { MaterialForm }
