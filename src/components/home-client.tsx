"use client"

import { useState, useMemo } from "react"
import { Hero } from "@/components/hero"
import { Container } from "@/components/layout/container"
import { CategorySection } from "@/components/materials/category-section"
import type { Event, Category, Material } from "@/types"

interface HomeClientProps {
  event: Event
  categories: Category[]
  materials: Material[]
}

function HomeClient({ event, categories, materials }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMaterials = useMemo(() => {
    if (!searchQuery.trim()) {
      return materials
    }

    const query = searchQuery.toLowerCase()

    return materials.filter(
      (m) =>
        m.title.toLowerCase().includes(query) ||
        (m.description && m.description.toLowerCase().includes(query))
    )
  }, [materials, searchQuery])

  const visibleCategories = useMemo(
    () =>
      categories
        .filter((cat) =>
          filteredMaterials.some((m) => m.category_id === cat.id)
        )
        .sort((a, b) => a.display_order - b.display_order),
    [categories, filteredMaterials]
  )

  const groupedMaterials = useMemo(() => {
    const grouped = new Map<string, Material[]>()

    for (const material of filteredMaterials) {
      const existing = grouped.get(material.category_id)
      if (existing) {
        existing.push(material)
      } else {
        grouped.set(material.category_id, [material])
      }
    }

    for (const materials of grouped.values()) {
      materials.sort((a, b) => a.display_order - b.display_order)
    }

    return grouped
  }, [filteredMaterials])

  return (
    <>
      <Hero
        event={event}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Container>
        {visibleCategories.length > 0 ? (
          visibleCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              materials={groupedMaterials.get(category.id) ?? []}
            />
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-sm text-muted-foreground">
              {searchQuery.trim()
                ? `Nenhum material encontrado para "${searchQuery}".`
                : "Nenhum material disponível."}
            </p>
          </div>
        )}
      </Container>
    </>
  )
}

export { HomeClient }
