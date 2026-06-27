import { Header } from "@/components/layout/header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { BetHistoryTable } from "@/components/dashboard/bet-history-table"
import { BetHistoryFilters } from "@/components/dashboard/bet-history-filters"

export default function BetHistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Bet History</h1>
            <p className="text-muted-foreground">View all your past and pending bets</p>
          </div>

          <BetHistoryFilters />
          <BetHistoryTable />
        </main>
      </div>
    </div>
  )
}
