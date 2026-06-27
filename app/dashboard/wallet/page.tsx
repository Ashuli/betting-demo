import { Header } from "@/components/layout/header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { WalletOverview } from "@/components/dashboard/wallet-overview"
import { TransactionHistory } from "@/components/dashboard/transaction-history"

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and transactions</p>
          </div>

          <WalletOverview />
          <TransactionHistory />
        </main>
      </div>
    </div>
  )
}
