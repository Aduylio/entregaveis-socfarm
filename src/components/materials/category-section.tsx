import type { Category, Material } from "@/types"
import { MaterialRow } from "@/components/materials/material-row"

interface CategorySectionProps {
  category: Category
  materials: Material[]
}

function CategorySection({ category, materials }: CategorySectionProps) {
  return (
    <section data-slot="category-section">
      <div className="flex items-baseline gap-2 px-5 pt-5 pb-3">
        <h2 className="text-base font-semibold text-foreground">
          {category.name}
        </h2>
        <span className="text-xs text-muted-foreground/60">
          {materials.length}{" "}
          {materials.length === 1 ? "material" : "materiais"}
        </span>
      </div>

      <div className="px-5 pb-5">
        {materials.length > 0 && (
          <div className="divide-y divide-border/50">
            {materials.map((material, index) => (
              <MaterialRow
                key={material.id}
                material={material}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export { CategorySection }
