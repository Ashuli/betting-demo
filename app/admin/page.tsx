import { AdminStats } from "@/components/admin/admin-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { TopBettors } from "@/components/admin/top-bettors"
import { PendingBets } from "@/components/admin/pending-bets"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
      </div>

      <AdminStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <TopBettors />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PendingBets />
        <RecentActivity />
      </div>
    </div>
  )
}
