"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Match } from "@/lib/mock-data"
import { ArrowLeft, Bell, Share2, Star } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface MatchHeaderProps {
  match: Match
}

export function MatchHeader({ match }: MatchHeaderProps) {
  const isLive = match.status === "live"

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

      {/* Match Info */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {/* Home Team */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                {match.homeTeam.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{match.homeTeam}</h2>
            </div>
          </div>

          {/* Score / Time */}
          <div className="text-center">
            {isLive ? (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-4xl md:text-5xl font-bold">{match.homeScore}</span>
                  <span className="text-2xl text-muted-foreground">-</span>
                  <span className="text-4xl md:text-5xl font-bold">{match.awayScore}</span>
                </div>
                <Badge variant="destructive" className="mt-2">
                  {match.minute}'
                </Badge>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">Kick-off</p>
                <p className="text-2xl font-bold">{format(new Date(match.startTime), "HH:mm")}</p>
                <p className="text-sm text-muted-foreground">{format(new Date(match.startTime), "EEE, MMM d")}</p>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                {match.awayTeam.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{match.awayTeam}</h2>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
