"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Container } from "@/components/layout/container"
import { Footer } from "@/components/layout/footer"
import { PasswordGate } from "@/components/admin/password-gate"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { MaterialForm } from "@/components/admin/material-form"
import type { MaterialFormData } from "@/components/admin/material-form"
import type { Material } from "@/types"
import { mockMaterials } from "@/data/mock/materials"
import { mockCategories } from "@/data/mock/categories"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)

  const [createOpen, setCreateOpen] = useState(false)

  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const [deletingMaterial, setDeletingMaterial] = useState<Material | null>(
    null
  )
  const [deleteOpen, setDeleteOpen] = useState(false)

  function getCategoryName(categoryId: string) {
    return mockCategories.find((c) => c.id === categoryId)?.name ?? "—"
  }

  function handleCreate(data: MaterialFormData) {
    const newMaterial: Material = {
      id: `mat-${Date.now()}`,
      event_id: "event-001",
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      type: data.type,
      file_url: "/mock/placeholder.pdf",
      published: true,
      display_order: materials.length + 1,
      created_at: new Date().toISOString(),
    }
    setMaterials([newMaterial, ...materials])
    setCreateOpen(false)
  }

  function handleEdit(data: MaterialFormData) {
    if (!editingMaterial) return
    setMaterials(
      materials.map((m) =>
        m.id === editingMaterial.id
          ? { ...m, title: data.title, description: data.description, category_id: data.category_id, type: data.type }
          : m
      )
    )
    setEditOpen(false)
    setEditingMaterial(null)
  }

  function handleDelete() {
    if (!deletingMaterial) return
    setMaterials(materials.filter((m) => m.id !== deletingMaterial.id))
    setDeleteOpen(false)
    setDeletingMaterial(null)
  }

  function openEdit(material: Material) {
    setEditingMaterial(material)
    setEditOpen(true)
  }

  function openDelete(material: Material) {
    setDeletingMaterial(material)
    setDeleteOpen(true)
  }

  if (!authenticated) {
    return (
      <>
        <Header logoUrl="/branding/logo.png" eventName="Experiência Socfarm" />
        <Container>
          <PasswordGate onSuccess={() => setAuthenticated(true)} />
        </Container>
        <Footer eventName="Experiência Socfarm" />
      </>
    )
  }

  return (
    <>
      <Header logoUrl="/branding/logo.png" eventName="Experiência Socfarm" />
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Administração
            </h1>
            <p className="text-sm text-muted-foreground">
              Gerencie os materiais do evento
            </p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="size-4" />
            Novo Material
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Material</th>
                <th className="px-4 py-3 text-left font-medium">Tipo</th>
                <th className="hidden px-4 py-3 text-left font-medium sm:table-cell">
                  Categoria
                </th>
                <th className="hidden px-4 py-3 text-left font-medium md:table-cell">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr
                  key={material.id}
                  className="border-b last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">
                      {material.title}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                      {material.description}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{material.type}</Badge>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {getCategoryName(material.category_id)}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    {material.published ? (
                      <Badge variant="outline">Publicado</Badge>
                    ) : (
                      <Badge variant="secondary">Rascunho</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(material)}
                      >
                        <Pencil className="size-3.5" />
                        <span className="sr-only sm:not-sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => openDelete(material)}
                      >
                        <Trash2 className="size-3.5" />
                        <span className="sr-only sm:not-sr-only">Excluir</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {materials.length === 0 && (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              Nenhum material encontrado.
            </div>
          )}
        </div>
      </Container>
      <Footer eventName="Experiência Socfarm" />

      {/* Create Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <MaterialForm
            categories={mockCategories}
            onSubmit={handleCreate}
            onCancel={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditingMaterial(null)
          }
          setEditOpen(open)
        }}
      >
        <DialogContent>
          {editingMaterial && (
            <MaterialForm
              categories={mockCategories}
              initialData={editingMaterial}
              onSubmit={handleEdit}
              onCancel={() => {
                setEditOpen(false)
                setEditingMaterial(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingMaterial(null)
          }
          setDeleteOpen(open)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Material</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir &ldquo;
              {deletingMaterial?.title}&rdquo;? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteOpen(false)
                setDeletingMaterial(null)
              }}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
