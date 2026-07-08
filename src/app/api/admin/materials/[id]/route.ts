import { NextRequest, NextResponse } from "next/server"
import { validateSession } from "@/lib/admin-session"
import { supabaseAdmin } from "@/lib/supabase-admin"
import {
  extractStoragePath,
  isSupabaseStorageUrl,
} from "@/lib/storage-path"
import type { MaterialType } from "@/types"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from("materials")
      .update({
        title: body.title,
        description: body.description ?? null,
        category_id: body.category_id,
        type: body.type as MaterialType,
        file_url: body.file_url ?? null,
        published: body.published ?? true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: `Erro ao atualizar material: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ material: data })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }

  try {
    const { id } = await params

    const { data: material, error: fetchError } = await supabaseAdmin
      .from("materials")
      .select("file_url")
      .eq("id", id)
      .single()

    if (fetchError) {
      return NextResponse.json(
        { error: `Material não encontrado: ${fetchError.message}` },
        { status: 404 }
      )
    }

    if (material.file_url && isSupabaseStorageUrl(material.file_url)) {
      const storagePath = extractStoragePath(material.file_url)

      if (storagePath) {
        const { error: storageError } = await supabaseAdmin.storage
          .from("materials")
          .remove([storagePath])

        if (storageError) {
          return NextResponse.json(
            {
              error: `Erro ao remover arquivo do Storage: ${storageError.message}`,
            },
            { status: 500 }
          )
        }
      }
    }

    const { error: deleteError } = await supabaseAdmin
      .from("materials")
      .delete()
      .eq("id", id)

    if (deleteError) {
      return NextResponse.json(
        { error: `Erro ao excluir material: ${deleteError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}
