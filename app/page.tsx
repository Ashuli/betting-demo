"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { BetSlip } from "@/components/betting/bet-slip"
import { MatchCarousel } from "@/components/betting/match-carousel"
import { MatchList } from "@/components/betting/match-list"
import { LiveMatchBanner } from "@/components/betting/live-match-banner"
import { AdBannerSlider } from "@/components/betting/ad-banner-slider"
import { liveMatches, upcomingMatches } from "@/lib/mock-data"
import { useMatches } from "@/hooks/use-matches"
import { VirtualGames } from "@/components/betting/virtual-games"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, Zap, Calendar, TrendingUp, Gamepad2 } from "lucide-react"

function AdvertisementBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 lg:p-8">
      <div className="relative z-10">
        <Badge className="bg-accent text-accent-foreground mb-3">Limited Time Offer</Badge>
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">100% Welcome Bonus</h2>
        <p className="text-primary-foreground/80 mb-4 max-w-md">
          Get up to $500 bonus on your first deposit. Start winning today!
        </p>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Claim Now</Button>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 right-20 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
    </div>
  )
}

export default function HomePage({ searchParams }: { searchParams: { sport?: string; league?: string } }) {
  const selectedSport = searchParams.sport || "football"
  const selectedLeague = searchParams.league

  const {
    matches: apiMatches,
    loading,
    error,
  } = useMatches({
    sport: selectedSport,
    league: selectedLeague,
  })

  // Use API matches if available, fallback to mock data
  const allMatches = apiMatches && apiMatches.length > 0 ? apiMatches : [...liveMatches, ...upcomingMatches]

  const filteredLiveMatches = allMatches.filter((m: any) => {
    if (selectedLeague) return m.sport === selectedSport && m.league === selectedLeague
    return m.sport === selectedSport && m.status === "live"
  })

  const filteredUpcomingMatches = allMatches.filter((m: any) => {
    if (selectedLeague) return m.sport === selectedSport && m.league === selectedLeague
    return m.sport === selectedSport && m.status === "upcoming"
  })

  const featuredMatches = [...filteredLiveMatches, ...filteredUpcomingMatches].slice(0, 6)
  const featuredMatch = filteredLiveMatches[0] || filteredUpcomingMatches[0]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6">
            <section>
              <AdBannerSlider />
            </section>

            {/* Loading State */}
            {loading && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Loading matches...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Top Matches */}
            {!loading && featuredMatch && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-bold">Top Matches</h2>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {selectedSport}
                    </Badge>
                  </div>
                </div>
                <LiveMatchBanner match={featuredMatch} />
              </section>
            )}

            {/* Featured Matches */}
            {!loading && featuredMatches.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Featured Matches</h2>
                  </div>
                  <Link href="/upcoming">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <MatchCarousel matches={featuredMatches} />
              </section>
            )}

            {/* Live Matches Section */}
            {!loading && filteredLiveMatches.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-warning" />
                    <h2 className="text-xl font-bold">Live Now</h2>
                    <Badge variant="outline" className="ml-2 border-warning text-warning">
                      {filteredLiveMatches.length}
                    </Badge>
                  </div>
                  <Link href="/live">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <MatchList matches={filteredLiveMatches} showMore={false} />
              </section>
            )}

            {/* Upcoming Matches Section */}
            {!loading && filteredUpcomingMatches.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Upcoming Matches</h2>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {selectedSport}
                    </Badge>
                  </div>
                  <Link href="/upcoming">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <MatchList matches={filteredUpcomingMatches} />
              </section>
            )}

            {/* No matches found */}
            {!loading && filteredLiveMatches.length === 0 && filteredUpcomingMatches.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No matches available for {selectedSport}</p>
              </div>
            )}

            {/* Virtual Games & Casino */}
            <section className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold">Virtual Games & Casino</h2>
                </div>
              </div>
              <VirtualGames />
            </section>

            {/* Popular Markets */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Popular Markets</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["Both Teams to Score", "Over/Under 2.5", "First Goalscorer", "Correct Score"].map((market) => (
                  <Button
                    key={market}
                    variant="outline"
                    className="h-auto py-4 justify-start bg-transparent hover:bg-primary/5 hover:border-primary"
                  >
                    {market}
                  </Button>
                ))}
              </div>
            </section>
          </div>
        </main>
        <BetSlip />
      </div>
    </div>
  )
}
