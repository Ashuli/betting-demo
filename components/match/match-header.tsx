"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Match } from "@/lib/mock-data"
import { getTeamLogo } from "@/lib/team-logos"
import { ArrowLeft, Bell, Share2, Star } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface MatchHeaderProps {
  match: Match
}

export function MatchHeader({ match }: MatchHeaderProps) {
  const isLive = match.status === "live"

  const logoFallback = (name: string) => {
    const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=6366f1&color=fff&size=128&bold=true&format=svg`
  }

  return (
    <Card className="overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{match.leagueName}</span>
            {isLive && (
              <Badge variant="destructive" className="gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                </span>
                LIVE
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Match Hero */}
      <div className="relative p-6 pb-8">
        {/* Faint background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          {/* Home Team */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-muted ring-2 ring-border overflow-hidden flex items-center justify-center shadow-lg">
                  <img
                    src={getTeamLogo(match.homeTeam)}
                    alt={match.homeTeam}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => { e.currentTarget.src = logoFallback(match.homeTeam) }}
                  />
                </div>
                {isLive && (
                  <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shadow">
                    {match.homeScore}
                  </div>
                )}
              </div>
              <h2 className="text-lg font-bold leading-tight">{match.homeTeam}</h2>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Home</span>
            </div>
          </div>

          {/* Centre: Score / Time */}
          <div className="text-center shrink-0">
            {isLive ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-5xl md:text-6xl font-black tabular-nums">{match.homeScore}</span>
                  <span className="text-3xl text-muted-foreground font-light">-</span>
                  <span className="text-5xl md:text-6xl font-black tabular-nums">{match.awayScore}</span>
                </div>
                <Badge variant="destructive" className="gap-1 px-3 text-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                  </span>
                  {match.minute}'
                </Badge>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-border mx-auto mb-1 hidden md:block" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Kick-off</p>
                <p className="text-3xl font-black">{format(new Date(match.startTime), "HH:mm")}</p>
                <p className="text-sm text-muted-foreground">{format(new Date(match.startTime), "EEE, MMM d")}</p>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="relative">
                <div className="h-20 w-20 rounded-full bg-muted ring-2 ring-border overflow-hidden flex items-center justify-center shadow-lg">
                  <img
                    src={getTeamLogo(match.awayTeam)}
                    alt={match.awayTeam}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => { e.currentTarget.src = logoFallback(match.awayTeam) }}
                  />
                </div>
                {isLive && (
                  <div className="absolute -bottom-1 -left-1 bg-primary text-primary-foreground text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shadow">
                    {match.awayScore}
                  </div>
                )}
              </div>
              <h2 className="text-lg font-bold leading-tight">{match.awayTeam}</h2>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Away</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
