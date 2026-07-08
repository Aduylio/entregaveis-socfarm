import "server-only"
import { cookies } from "next/headers"
import crypto from "crypto"

const SESSION_COOKIE = "admin_session"
const MAX_AGE_SECONDS = 60 * 60 * 24

function sign(payload: string): string {
  const hmac = crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
  hmac.update(payload)
  return `${payload}:${hmac.digest("hex")}`
}

function verify(token: string): string | null {
  const colonIndex = token.lastIndexOf(":")
  if (colonIndex === -1) return null
  const payload = token.slice(0, colonIndex)
  const signature = token.slice(colonIndex + 1)
  const expected = crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(payload)
    .digest("hex")
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null
  }
  return payload
}

export async function createSession(): Promise<void> {
  const payload = crypto.randomUUID()
  const token = sign(payload)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function validateSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(SESSION_COOKIE)
  if (!cookie?.value) return false
  return verify(cookie.value) !== null
}
