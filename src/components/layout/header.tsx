import Image from "next/image"
import Link from "next/link"
import { UserRound } from "lucide-react"
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
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={eventName ?? "Socfarm Entregáveis"}
              width={34}
              height={34}
              className="h-[34px] w-auto"
            />
          )}
          <span className="text-lg font-bold tracking-tight text-foreground">
            Socfarm
          </span>
        </Link>

        <a
          href="/admin"
          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/60 transition-colors hover:text-primary"
        >
          <UserRound className="size-3.5" />
          Área do organizador
        </a>
      </div>
    </header>
  )
}

export { Header }
