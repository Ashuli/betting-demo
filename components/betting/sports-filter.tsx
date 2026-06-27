"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { sports } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SportsFilterProps {
  onFilterChange?: (sportId: string | null) => void
}

export function SportsFilter({ onFilterChange }: SportsFilterProps) {
  const [activeSport, setActiveSport] = useState<string | null>(null)

  const handleClick = (sportId: string | null) => {
    setActiveSport(sportId)
    onFilterChange?.(sportId)
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-3">
        <Button
          variant={activeSport === null ? "default" : "outline"}
          size="sm"
          className={cn("rounded-full", activeSport === null && "bg-primary text-primary-foreground")}
          onClick={() => handleClick(null)}
        >
          All Sports
        </Button>
        {sports.map((sport) => (
          <Button
            key={sport.id}
            variant={activeSport === sport.id ? "default" : "outline"}
            size="sm"
            className={cn("rounded-full gap-2", activeSport === sport.id && "bg-primary text-primary-foreground")}
            onClick={() => handleClick(sport.id)}
          >
            <span>{sport.icon}</span>
            {sport.name}
            <span className="text-xs opacity-70">({sport.count})</span>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  )
}
