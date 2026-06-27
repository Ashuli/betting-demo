import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { BetSlip } from "@/components/betting/bet-slip"
import { MatchCard } from "@/components/betting/match-card"
import { SportsFilter } from "@/components/betting/sports-filter"
import { liveMatches } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"

export default function LivePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Zap className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Live Betting</h1>
                  <Badge variant="destructive">{liveMatches.length} Events</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Bet on matches happening right now</p>
              </div>
            </div>

            {/* Sports Filter */}
            <SportsFilter />

            {/* Live Matches Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>

            {/* Empty State */}
            {liveMatches.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Zap className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">No live matches right now</h3>
                <p className="text-sm text-muted-foreground">Check back later or browse upcoming matches</p>
              </div>
            )}
          </div>
        </main>
        <BetSlip />
      </div>
    </div>
  )
}
