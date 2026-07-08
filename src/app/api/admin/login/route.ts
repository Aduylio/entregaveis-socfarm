import { NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/admin-session"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: "Senha não informada." },
        { status: 400 }
      )
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Senha incorreta." },
        { status: 401 }
      )
    }

    await createSession()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}
