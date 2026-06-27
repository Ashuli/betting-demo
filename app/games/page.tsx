"use client"

import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { BetSlip } from "@/components/betting/bet-slip"
import { VirtualGames } from "@/components/betting/virtual-games"
import { Gamepad2 } from "lucide-react"

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Page Header */}
            <section>
              <div className="flex items-center gap-3 mb-2">
                <Gamepad2 className="h-8 w-8 text-accent" />
                <h1 className="text-3xl lg:text-4xl font-bold">Virtual Games & Casino</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Play instant games with realistic betting experiences. From classic casino games to virtual sports, find your favorite.
              </p>
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Games</p>
                <p className="text-2xl font-bold">50+</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Active Players</p>
                <p className="text-2xl font-bold">45K+</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Avg RTP</p>
                <p className="text-2xl font-bold">97%</p>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Min Bet</p>
                <p className="text-2xl font-bold">$0.05</p>
              </div>
            </section>

            {/* Games Grid */}
            <section>
              <VirtualGames />
            </section>
          </div>
        </main>
        <BetSlip />
      </div>
    </div>
  )
}
