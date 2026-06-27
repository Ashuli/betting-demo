"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wallet, TrendingUp, Clock, Trophy } from "lucide-react"

const stats = [
  {
    label: "Balance",
    value: "$1,250.50",
    change: "+$320.00",
    changeType: "positive" as const,
    icon: Wallet,
  },
  {
    label: "Total Winnings",
    value: "$3,420.75",
    change: "+15.2%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    label: "Pending Bets",
    value: "12",
    change: "$485.00",
    changeType: "neutral" as const,
    icon: Clock,
  },
  {
    label: "Win Rate",
    value: "57%",
    change: "89/156 bets",
    changeType: "positive" as const,
    icon: Trophy,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  stat.changeType === "positive" && "bg-green-500/10 text-green-500",
                  stat.changeType === "negative" && "bg-red-500/10 text-red-500",
                  stat.changeType === "neutral" && "bg-muted text-muted-foreground",
                )}
              >
                {stat.change}
              </span>
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

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
