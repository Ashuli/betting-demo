"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Mon", revenue: 12400, bets: 2400 },
  { date: "Tue", revenue: 18200, bets: 3200 },
  { date: "Wed", revenue: 15800, bets: 2800 },
  { date: "Thu", revenue: 23400, bets: 4100 },
  { date: "Fri", revenue: 31200, bets: 5200 },
  { date: "Sat", revenue: 42800, bets: 6800 },
  { date: "Sun", revenue: 48392, bets: 7200 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
        <Tabs defaultValue="week">
          <TabsList className="h-8">
            <TabsTrigger value="day" className="text-xs px-2">
              Day
            </TabsTrigger>
            <TabsTrigger value="week" className="text-xs px-2">
              Week
            </TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-2">
              Month
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{payload[0].payload.date}</p>
                        <p className="text-sm text-primary">Revenue: ${payload[0].value?.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          Bets: {payload[0].payload.bets.toLocaleString()}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
