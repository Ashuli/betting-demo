"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Match } from "@/lib/mock-data"

interface MatchStatsProps {
  match: Match
}

// Mock statistics data
const mockStats = [
  { name: "Ball Possession", home: 55, away: 45 },
  { name: "Shots", home: 12, away: 8 },
  { name: "Shots on Target", home: 5, away: 3 },
  { name: "Corners", home: 6, away: 4 },
  { name: "Fouls", home: 10, away: 14 },
  { name: "Yellow Cards", home: 2, away: 3 },
  { name: "Offsides", home: 3, away: 2 },
  { name: "Passes", home: 420, away: 380 },
  { name: "Pass Accuracy", home: 85, away: 82 },
]

export function MatchStats({ match }: MatchStatsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Match Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockStats.map((stat) => {
            const total = stat.home + stat.away
            const homePercent = (stat.home / total) * 100
            const isPercentage = stat.name.includes("Possession") || stat.name.includes("Accuracy")

            return (
              <div key={stat.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{isPercentage ? `${stat.home}%` : stat.home}</span>
                  <span className="text-muted-foreground">{stat.name}</span>
                  <span className="font-medium">{isPercentage ? `${stat.away}%` : stat.away}</span>
                </div>
                <div className="flex gap-1 h-2">
                  <div className="bg-primary rounded-l-full transition-all" style={{ width: `${homePercent}%` }} />
                  <div
                    className="bg-muted-foreground/30 rounded-r-full transition-all"
                    style={{ width: `${100 - homePercent}%` }}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Head to Head */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Head to Head</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">{match.homeTeam} Wins</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Draws</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-accent">4</p>
              <p className="text-sm text-muted-foreground">{match.awayTeam} Wins</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">Last 12 meetings across all competitions</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{match.homeTeam}</span>
            <div className="flex gap-1">
              {["W", "W", "D", "L", "W"].map((result, i) => (
                <span
                  key={i}
                  className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-white ${
                    result === "W" ? "bg-green-500" : result === "D" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                >
                  {result}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{match.awayTeam}</span>
            <div className="flex gap-1">
              {["L", "W", "W", "W", "D"].map((result, i) => (
                <span
                  key={i}
                  className={`flex h-6 w-6 items-center justify-center rounded text-xs font-bold text-white ${
                    result === "W" ? "bg-green-500" : result === "D" ? "bg-yellow-500" : "bg-red-500"
                  }`}
                >
                  {result}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
