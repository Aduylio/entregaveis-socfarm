"use client"

import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

function SearchBar({
  className,
  placeholder = "Pesquisar materiais, documentos e apresentações...",
  value = "",
  onChange,
}: SearchBarProps) {
  return (
    <div
      data-slot="search-bar"
      className={cn("relative w-full", className)}
    >
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-2xl border border-[#CBD5E1] bg-white pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 transition-shadow duration-200 focus:border-primary focus:shadow-[0_12px_30px_rgba(15,23,42,0.06)] focus:outline-none focus:ring-0"
      />
    </div>
  )
}

export { SearchBar }
