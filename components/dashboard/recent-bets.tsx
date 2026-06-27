"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const recentBets = [
  {
    id: "1",
    match: "Man United vs Liverpool",
    selection: "Liverpool Win",
    odds: 1.95,
    stake: 100,
    potentialWin: 195,
    status: "won" as const,
    result: "+$95.00",
  },
  {
    id: "2",
    match: "Bayern vs Dortmund",
    selection: "Over 2.5 Goals",
    odds: 1.6,
    stake: 50,
    potentialWin: 80,
    status: "won" as const,
    result: "+$30.00",
  },
  {
    id: "3",
    match: "PSG vs Marseille",
    selection: "PSG Win & BTTS",
    odds: 2.8,
    stake: 25,
    potentialWin: 70,
    status: "lost" as const,
    result: "-$25.00",
  },
  {
    id: "4",
    match: "Celtics vs Heat",
    selection: "Celtics -5.5",
    odds: 1.9,
    stake: 75,
    potentialWin: 142.5,
    status: "pending" as const,
    result: "In Play",
  },
  {
    id: "5",
    match: "Djokovic vs Alcaraz",
    selection: "Over 3.5 Sets",
    odds: 1.95,
    stake: 40,
    potentialWin: 78,
    status: "pending" as const,
    result: "Upcoming",
  },
]

const statusColors = {
  won: "bg-green-500/10 text-green-500",
  lost: "bg-red-500/10 text-red-500",
  pending: "bg-yellow-500/10 text-yellow-500",
}

export function RecentBets() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bets</CardTitle>
        <Link href="/dashboard/history">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentBets.map((bet) => (
            <div
              key={bet.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{bet.match}</p>
                <p className="text-xs text-muted-foreground">
                  {bet.selection} @ {bet.odds}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      bet.status === "won"
                        ? "text-green-500"
                        : bet.status === "lost"
                          ? "text-red-500"
                          : "text-muted-foreground"
                    }`}
                  >
                    {bet.result}
                  </p>
                  <p className="text-xs text-muted-foreground">Stake: ${bet.stake}</p>
                </div>
                <Badge className={statusColors[bet.status]} variant="secondary">
                  {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
