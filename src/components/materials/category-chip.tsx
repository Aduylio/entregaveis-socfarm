"use client"

import { cn } from "@/lib/utils"

interface CategoryChipProps extends React.ComponentProps<"button"> {
  label: string
  active?: boolean
}

function CategoryChip({
  className,
  label,
  active = false,
  ...props
}: CategoryChipProps) {
  return (
    <button
      data-slot="category-chip"
      data-active={active}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-full border px-4 text-xs font-medium transition-all duration-200",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-accent/50",
        className
      )}
      {...props}
    >
      {label}
    </button>
  )
}

export { CategoryChip }
