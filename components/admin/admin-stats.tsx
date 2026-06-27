import { Card, CardContent } from "@/components/ui/card"
import { Users, Ticket, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Total Users",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Active Bets",
    value: "3,429",
    change: "+8.2%",
    trend: "up",
    icon: Ticket,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Today's Revenue",
    value: "$48,392",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    label: "Payout Rate",
    value: "94.2%",
    change: "-2.3%",
    trend: "down",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

export function AdminStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.trend === "up" ? "text-primary" : "text-destructive",
                )}
              >
                {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
