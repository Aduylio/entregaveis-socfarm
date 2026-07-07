"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const MOCK_PASSWORD = "admin123"

interface PasswordGateProps {
  onSuccess: () => void
}

function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === MOCK_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col items-center justify-center">
      <div className="w-full rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="mb-1 text-lg font-semibold tracking-tight">
          Acesso restrito
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Informe a senha para acessar a área administrativa.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              aria-invalid={error || undefined}
            />
            {error && (
              <p className="text-xs text-destructive">
                Senha incorreta. Tente novamente.
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}

export { PasswordGate }
