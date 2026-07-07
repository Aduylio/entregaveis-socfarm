import { cn } from "@/lib/utils"

interface SectionProps extends React.ComponentProps<"section"> {
  title?: string
  description?: string
}

function Section({
  className,
  title,
  description,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn("py-12 sm:py-16", className)}
      {...props}
    >
      {title && (
        <div className="mb-8 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}

export { Section }
