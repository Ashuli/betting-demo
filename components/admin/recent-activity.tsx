import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { UserPlus, Ticket, DollarSign, AlertTriangle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "user",
    message: "New user registered",
    detail: "emma.wilson@email.com",
    time: "2 min ago",
    icon: UserPlus,
  },
  {
    id: 2,
    type: "bet",
    message: "High stake bet placed",
    detail: "$2,500 on Man City vs Liverpool",
    time: "5 min ago",
    icon: Ticket,
  },
  {
    id: 3,
    type: "withdrawal",
    message: "Withdrawal requested",
    detail: "$1,200 by john.doe",
    time: "12 min ago",
    icon: DollarSign,
  },
  {
    id: 4,
    type: "alert",
    message: "Suspicious activity detected",
    detail: "Multiple failed login attempts",
    time: "18 min ago",
    icon: AlertTriangle,
  },
  {
    id: 5,
    type: "bet",
    message: "Accumulator bet won",
    detail: "$450 payout to sarah.m",
    time: "25 min ago",
    icon: Ticket,
  },
]

const typeColors = {
  user: "text-blue-500 bg-blue-500/10",
  bet: "text-primary bg-primary/10",
  withdrawal: "text-amber-500 bg-amber-500/10",
  alert: "text-destructive bg-destructive/10",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={cn("p-2 rounded-lg shrink-0", typeColors[activity.type as keyof typeof typeColors])}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
