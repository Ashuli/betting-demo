"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"

export interface AccountData {
  userId: string
  email: string
  balance: number
  totalBets: number
  wonBets: number
  pendingBets: number
  totalWinnings: number
}

// Mock account data for demo
const mockAccount: AccountData = {
  userId: "user-123",
  email: "demo@sportsbetting.com",
  balance: 5250.75,
  totalBets: 156,
  wonBets: 89,
  pendingBets: 12,
  totalWinnings: 8420.50,
}

export function useAccount() {
  const [account, setAccount] = useState<AccountData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true)
      const response = await apiClient.getAccount()
      if (response.success && response.data) {
        setAccount(response.data)
        setError(null)
      } else {
        // Use mock data as fallback
        setAccount(mockAccount)
        setError(null)
      }
      setLoading(false)
    }

    fetchAccount()
  }, [])

  return { account, loading, error }
}
