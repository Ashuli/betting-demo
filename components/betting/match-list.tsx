"use client"

import { MatchRow } from "./match-row"
import type { Match } from "@/lib/mock-data"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MatchListProps {
  matches: Match[]
  showMore?: boolean
}

export function MatchList({ matches, showMore = true }: MatchListProps) {
  const [expanded, setExpanded] = useState(false)

  // Group matches by date
  const groupedMatches = matches.reduce(
    (groups, match) => {
      const date = new Date(match.startTime)
      const dateKey = format(date, "yyyy-MM-dd")
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(match)
      return groups
    },
    {} as Record<string, Match[]>,
  )

  const sortedDates = Object.keys(groupedMatches).sort()
  const displayDates = expanded ? sortedDates : sortedDates.slice(0, 2)

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-2 py-2 px-3 bg-muted/30 border-b border-border text-xs text-muted-foreground">
        <span className="w-14 shrink-0">ID</span>
        <span className="w-12 shrink-0">Time</span>
        <span className="flex-1">Match</span>
        <span className="w-8 shrink-0"></span>
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-16 text-center font-semibold">1</span>
          <span className="w-16 text-center font-semibold">X</span>
          <span className="w-16 text-center font-semibold">2</span>
        </div>
        <span className="w-8 shrink-0"></span>
      </div>

      {displayDates.map((dateKey) => {
        const date = new Date(dateKey)
        const displayDate = format(date, "dd MMM yyyy")

        return (
          <div key={dateKey}>
            {/* Date Header */}
            <div className="bg-primary/10 px-3 py-1.5">
              <span className="text-sm font-semibold text-primary">{displayDate}</span>
            </div>

            {/* Match Rows */}
            <div>
              {groupedMatches[dateKey].map((match) => (
                <MatchRow key={match.id} match={match} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Show More */}
      {showMore && sortedDates.length > 2 && (
        <div className="flex justify-center py-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
          </Button>
        </div>
      )}
    </div>
  )
}
