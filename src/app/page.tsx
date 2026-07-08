import { Header } from "@/components/layout/header"
import { Container } from "@/components/layout/container"
import { Footer } from "@/components/layout/footer"
import { HomeClient } from "@/components/home-client"
import { getCurrentEvent } from "@/services/events-service"
import { getCategoriesByEventId } from "@/services/categories-service"
import { getPublishedMaterialsByEventId } from "@/services/materials-service"

export const dynamic = "force-dynamic"

export default async function Home() {
  const event = await getCurrentEvent()

  if (!event) {
    return (
      <Container>
        <p className="py-16 text-center text-sm text-muted-foreground">
          Evento não encontrado.
        </p>
      </Container>
    )
  }

  const [categories, materials] = await Promise.all([
    getCategoriesByEventId(event.id),
    getPublishedMaterialsByEventId(event.id),
  ])

  return (
    <>
      <Header eventName={event.name} logoUrl={event.logo_url} />
      <HomeClient event={event} categories={categories} materials={materials} />
      <Footer eventName={event.name} />
    </>
  )
}
