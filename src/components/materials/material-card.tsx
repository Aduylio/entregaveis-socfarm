import {
  FileTextIcon,
  FileSpreadsheetIcon,
  PresentationIcon,
  ArchiveIcon,
  VideoIcon,
  LinkIcon,
  FileIcon,
  BotIcon,
  Download,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Material, MaterialType } from "@/types"

const typeIcons: Record<MaterialType, React.ReactNode> = {
  PDF: <FileTextIcon className="size-4" />,
  Excel: <FileSpreadsheetIcon className="size-4" />,
  PowerPoint: <PresentationIcon className="size-4" />,
  ZIP: <ArchiveIcon className="size-4" />,
  Vídeo: <VideoIcon className="size-4" />,
  Link: <LinkIcon className="size-4" />,
  Documento: <FileIcon className="size-4" />,
  "Prompt IA": <BotIcon className="size-4" />,
}

const typeColors: Record<MaterialType, string> = {
  PDF: "text-red-600",
  Excel: "text-emerald-600",
  PowerPoint: "text-orange-600",
  ZIP: "text-yellow-600",
  Vídeo: "text-purple-600",
  Link: "text-sky-600",
  Documento: "text-blue-600",
  "Prompt IA": "text-violet-600",
}

interface MaterialCardProps extends React.ComponentProps<"div"> {
  material: Material
}

function MaterialCard({ className, material, ...props }: MaterialCardProps) {
  return (
    <div
      data-slot="material-card"
      className={cn(
        "group/card flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all duration-200 hover:border-border hover:shadow-md hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background",
          typeColors[material.type]
        )}
      >
        {typeIcons[material.type]}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-medium text-foreground">
            {material.title}
          </h3>
          <Badge variant="secondary" className="shrink-0 text-[10px]">
            {material.type}
          </Badge>
        </div>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {material.description}
        </p>
      </div>

      <button
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-primary"
        aria-label="Download"
      >
        <Download className="size-4" />
      </button>
    </div>
  )
}

export { MaterialCard }
