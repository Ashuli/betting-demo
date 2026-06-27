"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useBetSlip, type BetSelection } from "@/context/bet-slip-context"
import type { Match } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { format } from "date-fns"
import Link from "next/link"

interface MatchCarouselProps {
  matches: Match[]
}

export function MatchCarousel({ matches }: MatchCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      {canScrollLeft && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        onScroll={checkScroll}
      >
        {matches.map((match) => (
          <MatchCarouselCard key={match.id} match={match} />
        ))}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

interface MatchCarouselCardProps {
  match: Match
}

function MatchCarouselCard({ match }: MatchCarouselCardProps) {
  const { state, addSelection } = useBetSlip()

  const handleOddClick = (type: "home" | "draw" | "away", odds: number, selectionName: string) => {
    const selection: BetSelection = {
      id: `${match.id}-${type}`,
      matchId: match.id,
      matchName: `${match.homeTeam} vs ${match.awayTeam}`,
      selection: selectionName,
      odds,
      market: "Match Result",
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      sport: match.sport,
      startTime: match.startTime,
    }
    addSelection(selection)
  }

  const isSelected = (type: string) => state.selections.some((s) => s.id === `${match.id}-${type}`)

  const getLeagueCountry = () => {
    const leagueMap: Record<string, string> = {
      epl: "England - Premier League",
      laliga: "Spain - La Liga",
      bundesliga: "Germany - Bundesliga",
      seriea: "Italy - Serie A",
      ligue1: "France - Ligue 1",
      ucl: "Europe - Champions League",
      nba: "USA - NBA",
      euroleague: "Europe - EuroLeague",
      atp: "Tennis - ATP Tour",
    }
    return leagueMap[match.league] || match.leagueName
  }

  const formatDateTime = () => {
    const date = new Date(match.startTime)
    return format(date, "d MMM HH:mm")
  }

  const getTeamLogo = (teamName: string) => {
    // Generate placeholder logo URL
    return `/placeholder.svg?height=48&width=48&query=${encodeURIComponent(teamName + " football club logo")}`
  }

  return (
    <Card className="min-w-[260px] max-w-[260px] shrink-0 overflow-hidden">
      {/* Header - League & Time */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border">
        <span className="text-xs font-medium text-muted-foreground truncate">{getLeagueCountry()}</span>
        <span className="text-xs text-muted-foreground shrink-0">{formatDateTime()}</span>
      </div>

      {/* Teams */}
      <Link href={`/match/${match.id}`}>
        <div className="flex items-center justify-center gap-4 py-4 px-3 hover:bg-muted/30 transition-colors">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img
                src={getTeamLogo(match.homeTeam) || "/placeholder.svg"}
                alt={match.homeTeam}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xs font-medium text-center line-clamp-2">{match.homeTeam}</span>
          </div>

          {/* VS */}
          <span className="text-sm font-medium text-muted-foreground">vs</span>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img
                src={getTeamLogo(match.awayTeam) || "/placeholder.svg"}
                alt={match.awayTeam}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xs font-medium text-center line-clamp-2">{match.awayTeam}</span>
          </div>
        </div>
      </Link>

      {/* Match Result Label */}
      <div className="px-3 pb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Match Result</span>
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>

      {/* Odds */}
      <div className="grid grid-cols-3 gap-1 p-2 pt-1">
        <Button
          variant={isSelected("home") ? "default" : "outline"}
          size="sm"
          className={cn("h-9 flex flex-col gap-0 py-1", isSelected("home") && "bg-primary text-primary-foreground")}
          onClick={() => handleOddClick("home", match.odds.home, match.homeTeam)}
        >
          <span className="text-[10px] opacity-70">1</span>
          <span className="text-sm font-bold">{match.odds.home.toFixed(2)}</span>
        </Button>

        {match.odds.draw > 0 ? (
          <Button
            variant={isSelected("draw") ? "default" : "outline"}
            size="sm"
            className={cn("h-9 flex flex-col gap-0 py-1", isSelected("draw") && "bg-primary text-primary-foreground")}
            onClick={() => handleOddClick("draw", match.odds.draw, "Draw")}
          >
            <span className="text-[10px] opacity-70">X</span>
            <span className="text-sm font-bold">{match.odds.draw.toFixed(2)}</span>
          </Button>
        ) : (
          <div />
        )}

        <Button
          variant={isSelected("away") ? "default" : "outline"}
          size="sm"
          className={cn("h-9 flex flex-col gap-0 py-1", isSelected("away") && "bg-primary text-primary-foreground")}
          onClick={() => handleOddClick("away", match.odds.away, match.awayTeam)}
        >
          <span className="text-[10px] opacity-70">2</span>
          <span className="text-sm font-bold">{match.odds.away.toFixed(2)}</span>
        </Button>
      </div>
    </Card>
  )
}
