"use client"

import { Button } from "@/components/ui/button"
import { useBetSlip, type BetSelection } from "@/context/bet-slip-context"
import type { Match } from "@/lib/mock-data"
import { getTeamLogo } from "@/lib/team-logos"
import { cn } from "@/lib/utils"
import { Zap, Plus } from "lucide-react"
import Link from "next/link"

interface MatchRowProps {
  match: Match
}

export function MatchRow({ match }: MatchRowProps) {
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

  const formatTime = () => {
    const date = new Date(match.startTime)
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  }

  const isLive = match.status === "live"

  const logoFallback = (name: string) => {
    const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=6366f1&color=fff&size=64&bold=true&format=svg`
  }

  return (
    <div className="flex items-center gap-2 py-2 px-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0">
      {/* Time */}
      <span className="text-xs font-medium w-10 shrink-0 text-muted-foreground">
        {isLive ? (
          <span className="text-destructive font-bold">{match.minute}'</span>
        ) : (
          formatTime()
        )}
      </span>

      {/* Teams with logos */}
      <Link href={`/match/${match.id}`} className="flex-1 min-w-0">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <img
              src={getTeamLogo(match.homeTeam)}
              alt={match.homeTeam}
              className="h-4 w-4 rounded-full object-contain shrink-0 bg-muted p-px"
              onError={(e) => { e.currentTarget.src = logoFallback(match.homeTeam) }}
            />
            <span className="text-xs font-medium truncate hover:text-primary transition-colors">
              {match.homeTeam}
            </span>
            {isLive && (
              <span className="ml-auto text-xs font-bold shrink-0">{match.homeScore}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <img
              src={getTeamLogo(match.awayTeam)}
              alt={match.awayTeam}
              className="h-4 w-4 rounded-full object-contain shrink-0 bg-muted p-px"
              onError={(e) => { e.currentTarget.src = logoFallback(match.awayTeam) }}
            />
            <span className="text-xs font-medium truncate hover:text-primary transition-colors">
              {match.awayTeam}
            </span>
            {isLive && (
              <span className="ml-auto text-xs font-bold shrink-0">{match.awayScore}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="w-6 shrink-0 flex justify-center">
        {isLive && <Zap className="h-3.5 w-3.5 text-cyan-500" />}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant={isSelected("home") ? "default" : "ghost"}
          size="sm"
          className={cn(
            "w-14 h-8 font-bold text-sm",
            isSelected("home")
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 hover:bg-primary/10 hover:text-primary",
          )}
          onClick={() => handleOddClick("home", match.odds.home, match.homeTeam)}
        >
          {match.odds.home.toFixed(2)}
        </Button>

        {match.odds.draw > 0 && (
          <Button
            variant={isSelected("draw") ? "default" : "ghost"}
            size="sm"
            className={cn(
              "w-14 h-8 font-bold text-sm",
              isSelected("draw")
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 hover:bg-primary/10 hover:text-primary",
            )}
            onClick={() => handleOddClick("draw", match.odds.draw, "Draw")}
          >
            {match.odds.draw.toFixed(2)}
          </Button>
        )}

        <Button
          variant={isSelected("away") ? "default" : "ghost"}
          size="sm"
          className={cn(
            "w-14 h-8 font-bold text-sm",
            isSelected("away")
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 hover:bg-primary/10 hover:text-primary",
          )}
          onClick={() => handleOddClick("away", match.odds.away, match.awayTeam)}
        >
          {match.odds.away.toFixed(2)}
        </Button>
      </div>

      {/* More Markets */}
      <Link href={`/match/${match.id}`}>
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}


interface MatchRowProps {
  match: Match
}

export function MatchRow({ match }: MatchRowProps) {
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

  const formatTime = () => {
    const date = new Date(match.startTime)
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  }

  const isLive = match.status === "live"

  return (
    <div className="flex items-center gap-2 py-2 px-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0">
      {/* Match ID */}
      <span className="text-xs text-muted-foreground w-14 shrink-0">{match.id.replace("match-", "")}</span>

      {/* Time */}
      <span className="text-sm font-medium w-12 shrink-0">{formatTime()}</span>

      {/* Teams */}
      <Link href={`/match/${match.id}`} className="flex-1 min-w-0">
        <span className="text-sm font-medium hover:text-primary transition-colors truncate block">
          {match.homeTeam} - {match.awayTeam}
        </span>
      </Link>

      <div className="w-8 shrink-0 flex justify-center">{isLive && <Zap className="h-4 w-4 text-cyan-500" />}</div>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant={isSelected("home") ? "default" : "ghost"}
          size="sm"
          className={cn(
            "w-16 h-8 font-bold text-sm",
            isSelected("home")
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 hover:bg-primary/10 hover:text-primary",
          )}
          onClick={() => handleOddClick("home", match.odds.home, match.homeTeam)}
        >
          {match.odds.home.toFixed(2)}
        </Button>

        {match.odds.draw > 0 && (
          <Button
            variant={isSelected("draw") ? "default" : "ghost"}
            size="sm"
            className={cn(
              "w-16 h-8 font-bold text-sm",
              isSelected("draw")
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 hover:bg-primary/10 hover:text-primary",
            )}
            onClick={() => handleOddClick("draw", match.odds.draw, "Draw")}
          >
            {match.odds.draw.toFixed(2)}
          </Button>
        )}

        <Button
          variant={isSelected("away") ? "default" : "ghost"}
          size="sm"
          className={cn(
            "w-16 h-8 font-bold text-sm",
            isSelected("away")
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 hover:bg-primary/10 hover:text-primary",
          )}
          onClick={() => handleOddClick("away", match.odds.away, match.awayTeam)}
        >
          {match.odds.away.toFixed(2)}
        </Button>
      </div>

      {/* More Markets */}
      <Link href={`/match/${match.id}`}>
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
