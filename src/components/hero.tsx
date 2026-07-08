"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Event } from "@/types"
import { SearchBar } from "@/components/materials/search-bar"

interface HeroProps extends React.ComponentProps<"section"> {
  event: Event
  searchValue?: string
  onSearchChange?: (value: string) => void
}

function Hero({ className, event, searchValue, onSearchChange, ...props }: HeroProps) {
  return (
    <section
      data-slot="hero"
      className={cn(
        "relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden py-16",
        className
      )}
      {...props}
    >
      {event.cover_url && (
        <Image
          src={event.cover_url}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        <div className="flex items-center justify-center gap-4">
          {event.logo_url && (
            <Image
              src={event.logo_url}
              alt={event.name}
              width={70}
              height={70}
              className="h-[55px] w-auto sm:h-[70px]"
              priority
            />
          )}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {event.name}
          </h1>
        </div>

        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          {event.initial_message}
        </p>

        <div className="mt-8 w-full max-w-md">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>
      </div>
    </section>
  )
}

export { Hero }
