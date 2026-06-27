"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"

const bets = [
  {
    id: "BET-001",
    date: "2024-01-15 15:10",
    type: "Single",
    match: "Man United vs Liverpool",
    selection: "Liverpool Win",
    odds: 1.95,
    stake: 100,
    potentialWin: 195,
    status: "won" as const,
    profit: 95,
  },
  {
    id: "BET-002",
    date: "2024-01-15 14:05",
    type: "Accumulator",
    match: "3 Selections",
    selection: "Multiple",
    odds: 5.2,
    stake: 25,
    potentialWin: 130,
    status: "lost" as const,
    profit: -25,
  },
  {
    id: "BET-003",
    date: "2024-01-14 20:30",
    type: "Single",
    match: "Bayern vs Dortmund",
    selection: "Over 2.5 Goals",
    odds: 1.6,
    stake: 50,
    potentialWin: 80,
    status: "won" as const,
    profit: 30,
  },
  {
    id: "BET-004",
    date: "2024-01-14 18:00",
    type: "Single",
    match: "Celtics vs Heat",
    selection: "Celtics -5.5",
    odds: 1.9,
    stake: 75,
    potentialWin: 142.5,
    status: "pending" as const,
    profit: 0,
  },
  {
    id: "BET-005",
    date: "2024-01-13 21:00",
    type: "Single",
    match: "PSG vs Marseille",
    selection: "PSG Win & BTTS",
    odds: 2.8,
    stake: 25,
    potentialWin: 70,
    status: "lost" as const,
    profit: -25,
  },
]

const statusBadgeStyles = {
  won: "bg-green-500/10 text-green-500",
  lost: "bg-red-500/10 text-red-500",
  pending: "bg-yellow-500/10 text-yellow-500",
  void: "bg-muted text-muted-foreground",
}

export function BetHistoryTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bet ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Match</TableHead>
                <TableHead>Selection</TableHead>
                <TableHead className="text-right">Odds</TableHead>
                <TableHead className="text-right">Stake</TableHead>
                <TableHead className="text-right">Profit/Loss</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bets.map((bet) => (
                <TableRow key={bet.id}>
                  <TableCell className="font-mono text-sm">{bet.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{bet.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{bet.type}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{bet.match}</TableCell>
                  <TableCell>{bet.selection}</TableCell>
                  <TableCell className="text-right font-medium">{bet.odds.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${bet.stake}</TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      bet.profit > 0 ? "text-green-500" : bet.profit < 0 ? "text-red-500" : "text-muted-foreground"
                    }`}
                  >
                    {bet.profit > 0 ? "+" : ""}
                    {bet.status === "pending" ? "-" : `$${bet.profit}`}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusBadgeStyles[bet.status]} variant="secondary">
                      {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
