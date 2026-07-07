import { Header } from "@/components/layout/header"
import { Hero } from "@/components/hero"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Footer } from "@/components/layout/footer"
import { CategoryChip } from "@/components/materials/category-chip"
import { MaterialCard } from "@/components/materials/material-card"
import { mockEvent } from "@/data/mock/event"
import { mockCategories } from "@/data/mock/categories"
import { mockMaterials } from "@/data/mock/materials"

export default function Home() {
  return (
    <>
      <Header eventName={mockEvent.name} logoUrl={mockEvent.logo_url} />

      <Hero event={mockEvent} />

      <Container>
        <Section title="Categorias" description="Navegue pelos temas do evento.">
          <div className="flex flex-wrap gap-3">
            {mockCategories.map((category) => (
              <CategoryChip key={category.id} label={category.name} />
            ))}
          </div>
        </Section>

        <Section
          title="Materiais"
          description="Todos os materiais disponíveis para download."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </Section>
      </Container>

      <Footer eventName={mockEvent.name} />
    </>
  )
}
