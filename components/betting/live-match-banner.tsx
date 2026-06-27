"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBetSlip, type BetSelection } from "@/context/bet-slip-context"
import type { Match } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { ChevronRight, Zap } from "lucide-react"

interface LiveMatchBannerProps {
  match: Match
}

export function LiveMatchBanner({ match }: LiveMatchBannerProps) {
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

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-card to-accent/20 border border-border p-4 md:p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--primary)_1px,_transparent_1px)] bg-[length:20px_20px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="gap-1 px-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
              </span>
              LIVE
            </Badge>
            <span className="text-sm font-medium">{match.minute}'</span>
            <span className="text-sm text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">{match.leagueName}</span>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            Featured
          </Badge>
        </div>

        {/* Match Info */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
          <div className="flex items-center justify-between md:justify-start gap-4 flex-1">
            <div className="text-center md:text-right flex-1">
              <p className="text-lg md:text-xl font-bold">{match.homeTeam}</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/50">
              <span className="text-2xl md:text-3xl font-bold">{match.homeScore}</span>
              <span className="text-xl text-muted-foreground">-</span>
              <span className="text-2xl md:text-3xl font-bold">{match.awayScore}</span>
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-lg md:text-xl font-bold">{match.awayTeam}</p>
            </div>
          </div>
        </div>

        {/* Odds */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 flex-1">
            <Button
              variant={isSelected("home") ? "default" : "outline"}
              className={cn(
                "flex-1 flex flex-col h-auto py-3 gap-0.5",
                isSelected("home") && "bg-primary text-primary-foreground",
              )}
              onClick={() => handleOddClick("home", match.odds.home, match.homeTeam)}
            >
              <span className="text-xs opacity-70">Home Win</span>
              <span className="text-lg font-bold">{match.odds.home.toFixed(2)}</span>
            </Button>
            {match.odds.draw > 0 && (
              <Button
                variant={isSelected("draw") ? "default" : "outline"}
                className={cn(
                  "flex-1 flex flex-col h-auto py-3 gap-0.5",
                  isSelected("draw") && "bg-primary text-primary-foreground",
                )}
                onClick={() => handleOddClick("draw", match.odds.draw, "Draw")}
              >
                <span className="text-xs opacity-70">Draw</span>
                <span className="text-lg font-bold">{match.odds.draw.toFixed(2)}</span>
              </Button>
            )}
            <Button
              variant={isSelected("away") ? "default" : "outline"}
              className={cn(
                "flex-1 flex flex-col h-auto py-3 gap-0.5",
                isSelected("away") && "bg-primary text-primary-foreground",
              )}
              onClick={() => handleOddClick("away", match.odds.away, match.awayTeam)}
            >
              <span className="text-xs opacity-70">Away Win</span>
              <span className="text-lg font-bold">{match.odds.away.toFixed(2)}</span>
            </Button>
          </div>
          <Link href={`/match/${match.id}`}>
            <Button variant="secondary" className="gap-2 h-full px-6">
              All Markets
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
