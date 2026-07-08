"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { SearchBar } from "@/components/materials/search-bar"

interface HeroProps extends React.ComponentProps<"section"> {
  searchValue?: string
  onSearchChange?: (value: string) => void
}

function Hero({ className, searchValue, onSearchChange, ...props }: HeroProps) {
  return (
    <section
      data-slot="hero"
      className={cn("relative w-full", className)}
      {...props}
    >
      <div className="relative w-full">
        <Image
          src="/branding/hero-cover.png"
          alt="Experiência Socfarm"
          width={1920}
          height={800}
          className="w-full h-auto"
          priority
        />

        {/*
          Posição da busca sobre a arte do Hero.
          Ajustar left/bottom se a imagem de capa mudar.
        */}
        <div
          className="hidden md:block absolute"
          style={{
            left: "max(24px, calc((106vw - 1120px) / 2))",
            bottom: "66px",
            width: "min(540px, calc(100vw - 48px))",
          }}
        >
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>
      </div>

      <div className="block md:hidden px-4 pb-8 bg-white">
        <div className="-mt-3">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>
      </div>
    </section>
  )
}

export { Hero }
