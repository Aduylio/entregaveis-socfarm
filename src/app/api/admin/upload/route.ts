import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { validateSession } from "@/lib/admin-session"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { detectMaterialType } from "@/lib/detect-type"

export async function POST(request: NextRequest) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 }
      )
    }

    if (file.size <= 0) {
      return NextResponse.json(
        { error: "Arquivo vazio." },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const safeName = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`
    const filePath = safeName

    const { error: uploadError } = await supabaseAdmin.storage
      .from("materials")
      .upload(filePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json(
        { error: `Erro ao enviar arquivo: ${uploadError.message}` },
        { status: 500 }
      )
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("materials")
      .getPublicUrl(filePath)

    const publicUrl = publicUrlData?.publicUrl ?? ""

    const detectedType = detectMaterialType(file.name, file.type)

    return NextResponse.json({
      file_url: publicUrl,
      detected_type: detectedType,
    })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}
