import type { Category, Material } from "@/types"
import { MaterialCard } from "@/components/materials/material-card"

interface CategorySectionProps {
  category: Category
  materials: Material[]
}

function CategorySection({ category, materials }: CategorySectionProps) {
  return (
    <section className="mb-14 last:mb-0" data-slot="category-section">
      <div className="mb-6 border-l-4 border-primary pl-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {category.name}
          </h2>
          <span className="text-sm text-muted-foreground">
            {materials.length}{" "}
            {materials.length === 1 ? "material" : "materiais"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </section>
  )
}

export { CategorySection }
