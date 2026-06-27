"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownLeft, Receipt, Search, Calendar } from "lucide-react"

const transactions = [
  {
    id: "1",
    type: "deposit" as const,
    amount: 200,
    method: "Credit Card",
    status: "completed" as const,
    date: "2024-01-15 14:32",
  },
  {
    id: "2",
    type: "bet" as const,
    amount: -50,
    method: "Man United vs Liverpool",
    status: "completed" as const,
    date: "2024-01-15 15:10",
  },
  {
    id: "3",
    type: "win" as const,
    amount: 95,
    method: "Man United vs Liverpool",
    status: "completed" as const,
    date: "2024-01-15 17:45",
  },
  {
    id: "4",
    type: "withdraw" as const,
    amount: -100,
    method: "Bank Transfer",
    status: "pending" as const,
    date: "2024-01-16 09:15",
  },
  {
    id: "5",
    type: "deposit" as const,
    amount: 500,
    method: "Bank Transfer",
    status: "completed" as const,
    date: "2024-01-14 11:20",
  },
  {
    id: "6",
    type: "bet" as const,
    amount: -75,
    method: "Bayern vs Dortmund",
    status: "completed" as const,
    date: "2024-01-14 20:00",
  },
  {
    id: "7",
    type: "win" as const,
    amount: 142.5,
    method: "Bayern vs Dortmund",
    status: "completed" as const,
    date: "2024-01-14 22:00",
  },
  {
    id: "8",
    type: "deposit" as const,
    amount: 1000,
    method: "Mobile Money",
    status: "completed" as const,
    date: "2024-01-13 10:00",
  },
]

const typeIcons = {
  deposit: ArrowDownLeft,
  withdraw: ArrowUpRight,
  bet: Receipt,
  win: ArrowDownLeft,
}

const typeColors = {
  deposit: "text-green-500",
  withdraw: "text-red-500",
  bet: "text-muted-foreground",
  win: "text-primary",
}

export function TransactionHistory() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.method.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || tx.type === typeFilter
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transaction History</CardTitle>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="withdraw">Withdraw</SelectItem>
              <SelectItem value="bet">Bet</SelectItem>
              <SelectItem value="win">Win</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="h-4 w-4" />
            Date
          </Button>
        </div>

        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No transactions found</p>
          ) : (
            filteredTransactions.map((tx) => {
              const Icon = typeIcons[tx.type]
              return (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-muted ${typeColors[tx.type]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm capitalize">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">{tx.method}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`font-medium ${tx.amount > 0 ? "text-green-500" : "text-foreground"}`}>
                        {tx.amount > 0 ? "+" : ""}
                        {Math.abs(tx.amount).toFixed(2)} ETB
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        tx.status === "completed"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
