import { NextResponse } from "next/server"
import { validateSession } from "@/lib/admin-session"

export async function GET() {
  const authenticated = await validateSession()
  return NextResponse.json({ authenticated })
}
