import { Download, FileX2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Material, MaterialType } from "@/types"

const typeColors: Record<MaterialType, string> = {
  PDF: "bg-red-50 text-red-700 border-red-200",
  Excel: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PowerPoint: "bg-orange-50 text-orange-700 border-orange-200",
  ZIP: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Vídeo: "bg-purple-50 text-purple-700 border-purple-200",
  Link: "bg-sky-50 text-sky-700 border-sky-200",
  Documento: "bg-blue-50 text-blue-700 border-blue-200",
  "Prompt IA": "bg-violet-50 text-violet-700 border-violet-200",
}

interface MaterialRowProps {
  material: Material
  index: number
}

function MaterialRow({ material, index }: MaterialRowProps) {
  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <span className="hidden w-6 shrink-0 text-center text-xs text-muted-foreground/40 sm:block">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium text-foreground">
            {material.title}
          </h3>
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 text-[10px] font-normal border",
              typeColors[material.type]
            )}
          >
            {material.type}
          </Badge>
        </div>
        <p className="line-clamp-1 text-xs text-muted-foreground/70">
          {material.description}
        </p>
      </div>

      {material.file_url ? (
        <a
          href={material.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20"
          aria-label="Download"
        >
          <Download className="size-4" />
        </a>
      ) : (
        <span
          className="group relative flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground/30"
          aria-label="Arquivo indisponível"
        >
          <FileX2 className="size-4" />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-2 py-1 text-[10px] text-popover-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            Arquivo indisponível
          </span>
        </span>
      )}
    </div>
  )
}

export { MaterialRow }
