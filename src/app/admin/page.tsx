"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Pencil, Trash2, LogOut, X, RefreshCw } from "lucide-react"
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
import type { Event, Category, Material } from "@/types"
import { getCurrentEvent } from "@/services/events-service"
import { getCategoriesByEventId } from "@/services/categories-service"

type PageState = "loading" | "ready" | "error"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  const [pageState, setPageState] = useState<PageState>("loading")
  const [event, setEvent] = useState<Event | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [apiError, setApiError] = useState("")

  const [createOpen, setCreateOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deletingMaterial, setDeletingMaterial] = useState<Material | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/session")
        const data = await res.json()
        setAuthenticated(data.authenticated === true)
      } catch {
        setAuthenticated(false)
      }
    }
    checkSession()
  }, [])

  const loadData = useCallback(async () => {
    setPageState("loading")
    setApiError("")
    try {
      const evt = await getCurrentEvent()
      if (!evt) {
        setErrorMessage("Nenhum evento encontrado.")
        setPageState("error")
        return
      }
      setEvent(evt)

      const [cats, mats] = await Promise.all([
        getCategoriesByEventId(evt.id),
        fetch(`/api/admin/materials?eventId=${evt.id}`).then((r) => r.json()),
      ])
      setCategories(cats)
      setMaterials(mats.materials ?? [])
      setPageState("ready")
    } catch {
      setErrorMessage("Erro ao carregar dados. Verifique a conexão.")
      setPageState("error")
    }
  }, [])

  useEffect(() => {
    if (authenticated === true) {
      loadData()
    }
  }, [authenticated, loadData])

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    setAuthenticated(false)
    setMaterials([])
    setPageState("loading")
  }

  function getCategoryName(categoryId: string) {
    return categories.find((c) => c.id === categoryId)?.name ?? "—"
  }

  async function handleCreate(data: MaterialFormData) {
    if (!event) return
    setApiError("")

    const response = await fetch("/api/admin/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: event.id,
        category_id: data.category_id,
        title: data.title,
        description: data.description,
        type: data.type,
        file_url: data.file_url,
        published: true,
        display_order: materials.length + 1,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      setApiError(result.error ?? "Erro ao criar material.")
      throw new Error(result.error ?? "Erro ao criar material.")
    }

    setCreateOpen(false)
    setMaterials([result.material, ...materials])
  }

  async function handleEdit(data: MaterialFormData) {
    if (!editingMaterial) return
    setApiError("")

    const response = await fetch(
      `/api/admin/materials/${editingMaterial.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          category_id: data.category_id,
          type: data.type,
          file_url: data.file_url,
          published: true,
        }),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      setApiError(result.error ?? "Erro ao editar material.")
      throw new Error(result.error ?? "Erro ao editar material.")
    }

    setEditOpen(false)
    setEditingMaterial(null)
    setMaterials(
      materials.map((m) => (m.id === result.material.id ? result.material : m))
    )
  }

  async function handleDelete() {
    if (!deletingMaterial) return
    setDeleteLoading(true)
    setApiError("")

    try {
      const response = await fetch(
        `/api/admin/materials/${deletingMaterial.id}`,
        { method: "DELETE" }
      )

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error ?? "Erro ao excluir material.")
      }

      setDeleteOpen(false)
      setDeletingMaterial(null)
      setMaterials(materials.filter((m) => m.id !== deletingMaterial.id))
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Erro ao excluir material."
      )
    } finally {
      setDeleteLoading(false)
    }
  }

  function openEdit(material: Material) {
    setEditingMaterial(material)
    setEditOpen(true)
  }

  function openDelete(material: Material) {
    setDeletingMaterial(material)
    setDeleteOpen(true)
  }

  const eventName = event?.name ?? "Experiência Socfarm"
  const logoUrl = event?.logo_url ?? "/branding/logo.png"

  if (authenticated === null) {
    return (
      <>
        <Header logoUrl={logoUrl} eventName={eventName} />
        <Container>
          <p className="py-16 text-center text-sm text-muted-foreground">
            Carregando...
          </p>
        </Container>
        <Footer eventName={eventName} />
      </>
    )
  }

  if (!authenticated) {
    return (
      <>
        <Header logoUrl={logoUrl} eventName={eventName} />
        <Container>
          <PasswordGate onSuccess={() => setAuthenticated(true)} />
        </Container>
        <Footer eventName={eventName} />
      </>
    )
  }

  if (pageState === "loading") {
    return (
      <>
        <Header logoUrl={logoUrl} eventName={eventName} />
        <Container>
          <p className="py-16 text-center text-sm text-muted-foreground">
            Carregando...
          </p>
        </Container>
        <Footer eventName={eventName} />
      </>
    )
  }

  if (pageState === "error") {
    return (
      <>
        <Header logoUrl={logoUrl} eventName={eventName} />
        <Container>
          <p className="py-16 text-center text-sm text-destructive">
            {errorMessage}
          </p>
        </Container>
        <Footer eventName={eventName} />
      </>
    )
  }

  return (
    <>
      <Header logoUrl={logoUrl} eventName={eventName} />
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadData}>
              <RefreshCw className="size-3.5" />
              Atualizar
            </Button>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" />
              Novo Material
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="size-3.5" />
              Sair
            </Button>
          </div>
        </div>

        {apiError && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <span className="flex-1">{apiError}</span>
            <button onClick={() => setApiError("")}>
              <X className="size-4" />
            </button>
          </div>
        )}

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
      <Footer eventName={eventName} />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <MaterialForm
            categories={categories}
            onSubmit={handleCreate}
            onCancel={() => setCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

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
              categories={categories}
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
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Excluindo..." : "Confirmar Exclusão"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
