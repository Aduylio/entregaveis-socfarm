import { NextRequest, NextResponse } from "next/server"
import { validateSession } from "@/lib/admin-session"
import { supabaseAdmin } from "@/lib/supabase-admin"
import type { Material, MaterialType } from "@/types"

export async function GET(request: NextRequest) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get("eventId")

    if (!eventId) {
      return NextResponse.json(
        { error: "eventId é obrigatório." },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from("materials")
      .select("*")
      .eq("event_id", eventId)
      .order("display_order", { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: `Erro ao buscar materiais: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ materials: data ?? [] })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }

  try {
    const body = await request.json()

    const { data, error } = await supabaseAdmin
      .from("materials")
      .insert({
        event_id: body.event_id,
        category_id: body.category_id,
        title: body.title,
        description: body.description ?? null,
        type: body.type as MaterialType,
        file_url: body.file_url ?? null,
        published: body.published ?? true,
        display_order: body.display_order ?? 0,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: `Erro ao criar material: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ material: data }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}
