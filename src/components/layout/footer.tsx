import { cn } from "@/lib/utils"

interface FooterProps extends React.ComponentProps<"footer"> {
  eventName?: string
}

function Footer({ className, eventName, ...props }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      data-slot="footer"
      className={cn(
        "mt-auto border-t border-border/50 py-6",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
        <span>&copy; {year} {eventName ?? "FarmStok"}</span>
        <span>Todos os direitos reservados</span>
      </div>
    </footer>
  )
}

export { Footer }
