"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"

export interface Bet {
  id: string
  selections: any[]
  stake: number
  totalOdds: number
  potentialWin: number
  status: "pending" | "won" | "lost" | "cancelled"
  createdAt: string
  settledAt?: string
}

// Mock bet data for demo
const mockBets: Bet[] = [
  {
    id: "bet-001",
    selections: [
      { matchId: "match-1", matchName: "Manchester United vs Liverpool", selection: "Liverpool Win", odds: 1.95 }
    ],
    stake: 100,
    totalOdds: 1.95,
    potentialWin: 195,
    status: "won",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    settledAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "bet-002",
    selections: [
      { matchId: "match-4", matchName: "Arsenal vs Chelsea", selection: "Arsenal Win", odds: 2.2 },
      { matchId: "match-5", matchName: "Bayern Munich vs Dortmund", selection: "Bayern Win", odds: 1.55 }
    ],
    stake: 50,
    totalOdds: 3.41,
    potentialWin: 170.5,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: "bet-003",
    selections: [
      { matchId: "match-2", matchName: "Real Madrid vs Barcelona", selection: "Draw", odds: 3.4 }
    ],
    stake: 75,
    totalOdds: 3.4,
    potentialWin: 255,
    status: "lost",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    settledAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "bet-004",
    selections: [
      { matchId: "match-bball-1", matchName: "Boston Celtics vs Miami Heat", selection: "Celtics Win", odds: 1.45 }
    ],
    stake: 200,
    totalOdds: 1.45,
    potentialWin: 290,
    status: "won",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    settledAt: new Date(Date.now() - 86400000 * 9).toISOString(),
  },
  {
    id: "bet-005",
    selections: [
      { matchId: "match-tennis-1", matchName: "Djokovic vs Alcaraz", selection: "Alcaraz Win", odds: 2.1 }
    ],
    stake: 150,
    totalOdds: 2.1,
    potentialWin: 315,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
]

export function useBets(filters?: { status?: string; limit?: number }) {
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBets = async () => {
      setLoading(true)
      const response = await apiClient.getBetHistory(filters)
      
      let allBets = [...mockBets]
      if (filters?.status) {
        allBets = allBets.filter(b => b.status === filters.status)
      }
      if (filters?.limit) {
        allBets = allBets.slice(0, filters.limit)
      }
      
      if (response.success && response.data) {
        setBets(response.data)
        setError(null)
      } else {
        // Use mock data as fallback
        setBets(allBets)
        setError(null)
      }
      setLoading(false)
    }

    fetchBets()
  }, [filters?.status, filters?.limit])

  return { bets, loading, error }
}
