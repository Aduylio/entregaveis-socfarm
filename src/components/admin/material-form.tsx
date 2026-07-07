"use client"

import { useState } from "react"
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
import type { Material, MaterialType, Category } from "@/types"

const MATERIAL_TYPES: MaterialType[] = [
  "PDF",
  "Excel",
  "PowerPoint",
  "ZIP",
  "Vídeo",
  "Link",
  "Documento",
  "Prompt IA",
]

export interface MaterialFormData {
  title: string
  description: string
  category_id: string
  type: MaterialType
}

interface MaterialFormProps {
  categories: Category[]
  initialData?: Material
  onSubmit: (data: MaterialFormData) => void
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
    initialData?.type ?? "PDF"
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ title, description, category_id: categoryId, type })
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

      <div className="space-y-4 py-4">
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

        <div className="grid grid-cols-2 gap-4">
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
            <Label htmlFor="type">Tipo</Label>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as MaterialType)}
            >
              {MATERIAL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Arquivo</Label>
          <div className="flex h-8 items-center rounded-lg border border-input bg-transparent px-2.5 text-sm text-muted-foreground">
            {initialData?.file_url ?? "Nenhum arquivo selecionado"}
          </div>
          <p className="text-xs text-muted-foreground">
            Upload será implementado em breve.
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? "Salvar" : "Criar"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export { MaterialForm }
