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

        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[540px] px-4">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>
      </div>

      <div className="block md:hidden px-4 pt-4 pb-8 bg-white">
        <SearchBar value={searchValue} onChange={onSearchChange} />
      </div>
    </section>
  )
}

export { Hero }
