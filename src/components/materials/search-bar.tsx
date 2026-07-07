"use client"

import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps extends React.ComponentProps<"div"> {
  placeholder?: string
}

function SearchBar({
  className,
  placeholder = "Pesquisar materiais...",
  ...props
}: SearchBarProps) {
  return (
    <div
      data-slot="search-bar"
      className={cn("relative", className)}
      {...props}
    >
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
      />
    </div>
  )
}

export { SearchBar }
