import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeaderProps extends React.ComponentProps<"header"> {
  eventName?: string
  logoUrl?: string | null
}

function Header({ className, eventName, logoUrl, ...props }: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-white",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={eventName ?? "Socfarm Entregáveis"}
              width={24}
              height={24}
              className="h-6 w-auto"
            />
          )}
        </div>
        <a
          href="/admin"
          className="text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
        >
          Área do organizador
        </a>
      </div>
    </header>
  )
}

export { Header }
