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
    <div className="flex items-center gap-2 py-1.5 px-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0">
      {/* Time */}
      <span className="text-xs font-medium w-10 shrink-0 text-muted-foreground text-center">
        {isLive ? (
          <span className="text-destructive font-bold">{match.minute}'</span>
        ) : (
          formatTime()
        )}
      </span>

      {/* Inline teams: Logo Home — vs — Logo Away */}
      <Link href={`/match/${match.id}`} className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Home */}
          <img
            src={getTeamLogo(match.homeTeam)}
            alt={match.homeTeam}
            className="h-5 w-5 rounded-full object-contain shrink-0 bg-muted p-px"
            onError={(e) => { e.currentTarget.src = logoFallback(match.homeTeam) }}
          />
          <span className="text-xs font-semibold truncate max-w-[80px] hover:text-primary transition-colors">
            {match.homeTeam}
          </span>

          {isLive ? (
            <span className="text-xs font-bold text-primary shrink-0 px-1">
              {match.homeScore} - {match.awayScore}
            </span>
          ) : (
            <span className="text-[10px] text-muted-foreground shrink-0 px-0.5">vs</span>
          )}

          {/* Away */}
          <span className="text-xs font-semibold truncate max-w-[80px] hover:text-primary transition-colors">
            {match.awayTeam}
          </span>
          <img
            src={getTeamLogo(match.awayTeam)}
            alt={match.awayTeam}
            className="h-5 w-5 rounded-full object-contain shrink-0 bg-muted p-px"
            onError={(e) => { e.currentTarget.src = logoFallback(match.awayTeam) }}
          />
        </div>
      </Link>

      {/* Live indicator */}
      <div className="w-5 shrink-0 flex justify-center">
        {isLive && <Zap className="h-3 w-3 text-cyan-500" />}
      </div>

      {/* Odds buttons */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant={isSelected("home") ? "default" : "ghost"}
          size="sm"
          className={cn(
            "w-14 h-7 font-bold text-xs",
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
              "w-14 h-7 font-bold text-xs",
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
            "w-14 h-7 font-bold text-xs",
            isSelected("away")
              ? "bg-primary text-primary-foreground"
              : "bg-muted/50 hover:bg-primary/10 hover:text-primary",
          )}
          onClick={() => handleOddClick("away", match.odds.away, match.awayTeam)}
        >
          {match.odds.away.toFixed(2)}
        </Button>
      </div>

      {/* More markets */}
      <Link href={`/match/${match.id}`}>
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  )
}
