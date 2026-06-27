"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBetSlip, type BetSelection } from "@/context/bet-slip-context"
import type { Match } from "@/lib/mock-data"
import { getTeamLogo } from "@/lib/team-logos"
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
      scrollRef.current.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <div className="relative group">
      {canScrollLeft && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
        onScroll={checkScroll}
      >
        {matches.map((match) => (
          <MatchCarouselCard key={match.id} match={match} />
        ))}
      </div>

      {canScrollRight && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
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

  const formatDateTime = () => format(new Date(match.startTime), "d MMM · HH:mm")

  const logoFallback = (name: string) => {
    const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=6366f1&color=fff&size=64&bold=true&format=svg`
  }

  const isLive = match.status === "live"

  return (
    <Card className="min-w-[220px] max-w-[220px] shrink-0 overflow-hidden hover:border-primary/50 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between px-2.5 py-1.5 bg-muted/40 border-b border-border">
        <span className="text-[10px] font-medium text-muted-foreground truncate">{match.leagueName}</span>
        {isLive ? (
          <Badge variant="destructive" className="text-[9px] px-1.5 py-0 h-4 gap-1">
            <span className="relative flex h-1 w-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1 w-1 bg-white"></span>
            </span>
            LIVE {match.minute}'
          </Badge>
        ) : (
          <span className="text-[10px] text-muted-foreground shrink-0">{formatDateTime()}</span>
        )}
      </div>

      {/* Teams — horizontal layout with logos */}
      <Link href={`/match/${match.id}`}>
        <div className="flex items-center justify-between px-2.5 py-3 hover:bg-muted/20 transition-colors gap-2">
          {/* Home */}
          <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <img
              src={getTeamLogo(match.homeTeam)}
              alt={match.homeTeam}
              className="w-9 h-9 rounded-full object-contain bg-muted p-0.5"
              onError={(e) => { e.currentTarget.src = logoFallback(match.homeTeam) }}
            />
            <span className="text-[10px] font-semibold text-center line-clamp-2 leading-tight">
              {match.homeTeam}
            </span>
            {isLive && (
              <span className="text-base font-bold">{match.homeScore}</span>
            )}
          </div>

          {/* VS / Score divider */}
          <div className="flex flex-col items-center shrink-0">
            <span className="text-xs font-bold text-muted-foreground">vs</span>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <img
              src={getTeamLogo(match.awayTeam)}
              alt={match.awayTeam}
              className="w-9 h-9 rounded-full object-contain bg-muted p-0.5"
              onError={(e) => { e.currentTarget.src = logoFallback(match.awayTeam) }}
            />
            <span className="text-[10px] font-semibold text-center line-clamp-2 leading-tight">
              {match.awayTeam}
            </span>
            {isLive && (
              <span className="text-base font-bold">{match.awayScore}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Odds */}
      <div className="grid grid-cols-3 gap-1 px-2 pb-2">
        <Button
          variant={isSelected("home") ? "default" : "outline"}
          size="sm"
          className={cn("h-8 flex flex-col gap-0 py-1 text-xs", isSelected("home") && "bg-primary text-primary-foreground")}
          onClick={() => handleOddClick("home", match.odds.home, match.homeTeam)}
        >
          <span className="text-[9px] opacity-60">1</span>
          <span className="font-bold text-xs">{match.odds.home.toFixed(2)}</span>
        </Button>

        {match.odds.draw > 0 ? (
          <Button
            variant={isSelected("draw") ? "default" : "outline"}
            size="sm"
            className={cn("h-8 flex flex-col gap-0 py-1", isSelected("draw") && "bg-primary text-primary-foreground")}
            onClick={() => handleOddClick("draw", match.odds.draw, "Draw")}
          >
            <span className="text-[9px] opacity-60">X</span>
            <span className="font-bold text-xs">{match.odds.draw.toFixed(2)}</span>
          </Button>
        ) : (
          <div />
        )}

        <Button
          variant={isSelected("away") ? "default" : "outline"}
          size="sm"
          className={cn("h-8 flex flex-col gap-0 py-1", isSelected("away") && "bg-primary text-primary-foreground")}
          onClick={() => handleOddClick("away", match.odds.away, match.awayTeam)}
        >
          <span className="text-[9px] opacity-60">2</span>
          <span className="font-bold text-xs">{match.odds.away.toFixed(2)}</span>
        </Button>
      </div>
    </Card>
  )
}
