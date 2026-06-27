import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { BetSlip } from "@/components/betting/bet-slip"
import { MatchHeader } from "@/components/match/match-header"
import { MatchMarkets } from "@/components/match/match-markets"
import { MatchStats } from "@/components/match/match-stats"
import { MatchTimeline } from "@/components/match/match-timeline"
import { liveMatches, upcomingMatches } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notFound } from "next/navigation"

interface MatchPageProps {
  params: Promise<{ id: string }>
}

export default async function MatchPage({ params }: MatchPageProps) {
  const { id } = await params
  const allMatches = [...liveMatches, ...upcomingMatches]
  const match = allMatches.find((m) => m.id === id)

  if (!match) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Match Header with Score */}
            <MatchHeader match={match} />

            {/* Tabs for Different Sections */}
            <Tabs defaultValue="markets" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                <TabsTrigger value="markets">Markets</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="markets" className="mt-6">
                <MatchMarkets match={match} />
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <MatchStats match={match} />
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <MatchTimeline match={match} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <BetSlip />
      </div>
    </div>
  )
}
