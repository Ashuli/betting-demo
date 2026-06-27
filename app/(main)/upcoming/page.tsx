import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { BetSlip } from "@/components/betting/bet-slip"
import { MatchCard } from "@/components/betting/match-card"
import { SportsFilter } from "@/components/betting/sports-filter"
import { upcomingMatches } from "@/lib/mock-data"
import { Calendar } from "lucide-react"

export default function UpcomingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Upcoming Matches</h1>
                <p className="text-sm text-muted-foreground">Browse and bet on upcoming events</p>
              </div>
            </div>

            {/* Sports Filter */}
            <SportsFilter />

            {/* Upcoming Matches Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </main>
        <BetSlip />
      </div>
    </div>
  )
}
