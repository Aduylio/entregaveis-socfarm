import { cn } from "@/lib/utils"

function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    />
  )
}

function ContainerInner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="container-inner"
      className={cn("mx-auto w-full max-w-4xl", className)}
      {...props}
    />
  )
}

export { Container, ContainerInner }
