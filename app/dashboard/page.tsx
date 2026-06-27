import { Header } from "@/components/layout/header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentBets } from "@/components/dashboard/recent-bets"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's an overview of your betting activity</p>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Activity */}
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentBets />

            {/* Active Bets Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Active Bets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      match: "Arsenal vs Chelsea",
                      selection: "Arsenal Win",
                      stake: 50,
                      potentialWin: 110,
                      odds: 2.2,
                    },
                    {
                      match: "Real Madrid vs Barcelona",
                      selection: "Over 2.5 Goals",
                      stake: 25,
                      potentialWin: 46.25,
                      odds: 1.85,
                    },
                    {
                      match: "Lakers vs Warriors",
                      selection: "Lakers -4.5",
                      stake: 100,
                      potentialWin: 190,
                      odds: 1.9,
                    },
                  ].map((bet, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                    >
                      <div>
                        <p className="font-medium text-sm">{bet.match}</p>
                        <p className="text-xs text-muted-foreground">
                          {bet.selection} @ {bet.odds}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">${bet.potentialWin.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Stake: ${bet.stake}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
