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
        "sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={eventName ?? "FarmStok"}
            width={20}
            height={20}
            className="h-5 w-auto"
          />
        )}
      </div>
    </header>
  )
}

export { Header }
