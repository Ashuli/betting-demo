"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBetSlip, type BetSelection } from "@/context/bet-slip-context"
import type { Match } from "@/lib/mock-data"
import { getTeamLogo } from "@/lib/team-logos"
import { cn } from "@/lib/utils"
import { Clock, ChevronRight, Star } from "lucide-react"
import { format } from "date-fns"

interface MatchCardProps {
  match: Match
  featured?: boolean
}

export function MatchCard({ match, featured }: MatchCardProps) {
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
    if (match.status === "live") {
      return `${match.minute}'`
    }
    return format(new Date(match.startTime), "HH:mm")
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:border-primary/50",
        featured && "bg-gradient-to-br from-card to-primary/5",
      )}
    >
      <Link href={`/match/${match.id}`}>
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </Link>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {match.status === "live" ? (
              <Badge variant="destructive" className="gap-1 px-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
                LIVE
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {formatTime()}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">{match.leagueName}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
        </div>

        {/* Teams with logos */}
        <div className="space-y-2 mb-4">
          <TeamRow
            name={match.homeTeam}
            score={match.status === "live" ? match.homeScore : undefined}
          />
          <TeamRow
            name={match.awayTeam}
            score={match.status === "live" ? match.awayScore : undefined}
          />
        </div>

        {/* Odds */}
        <div className="grid grid-cols-3 gap-2">
          <OddButton
            label="1"
            odds={match.odds.home}
            isSelected={isSelected("home")}
            onClick={() => handleOddClick("home", match.odds.home, match.homeTeam)}
          />
          {match.odds.draw > 0 && (
            <OddButton
              label="X"
              odds={match.odds.draw}
              isSelected={isSelected("draw")}
              onClick={() => handleOddClick("draw", match.odds.draw, "Draw")}
            />
          )}
          <OddButton
            label="2"
            odds={match.odds.away}
            isSelected={isSelected("away")}
            onClick={() => handleOddClick("away", match.odds.away, match.awayTeam)}
            className={match.odds.draw === 0 ? "col-span-1" : ""}
          />
        </div>

        {/* More Markets Link */}
        {match.markets && match.markets.length > 0 && (
          <Link href={`/match/${match.id}`}>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-muted-foreground">
              +{match.markets.length} more markets
            </Button>
          </Link>
        )}
      </div>
    </Card>
  )
}

interface TeamRowProps {
  name: string
  score?: number
}

function TeamRow({ name, score }: TeamRowProps) {
  const logoUrl = getTeamLogo(name)

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <img
          src={logoUrl}
          alt={name}
          className="h-6 w-6 rounded-full object-contain shrink-0 bg-muted p-0.5"
          onError={(e) => {
            // Fallback to initials avatar on load error
            const target = e.currentTarget
            const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=6366f1&color=fff&size=64&bold=true&format=svg`
          }}
        />
        <span className="font-medium text-sm truncate">{name}</span>
      </div>
      {score !== undefined && (
        <span className="text-lg font-bold shrink-0">{score}</span>
      )}
    </div>
  )
}

interface OddButtonProps {
  label: string
  odds: number
  isSelected: boolean
  onClick: () => void
  className?: string
}

function OddButton({ label, odds, isSelected, onClick, className }: OddButtonProps) {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className={cn(
        "flex flex-col h-auto py-2 gap-0.5 transition-all",
        isSelected && "bg-primary text-primary-foreground",
        className,
      )}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <span className="text-xs opacity-70">{label}</span>
      <span className="font-bold">{odds.toFixed(2)}</span>
    </Button>
  )
}

