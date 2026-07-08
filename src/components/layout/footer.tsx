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
        "mt-auto border-t-4 border-primary/10 bg-white py-10",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-foreground">
          Materiais oficiais da {eventName ?? "Experiência Socfarm"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Conteúdos exclusivos para participantes do evento.
        </p>
        <div className="mt-6 border-t border-border/50 pt-6">
          <p className="text-xs text-muted-foreground/60">
            &copy; {year} Socfarm. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
