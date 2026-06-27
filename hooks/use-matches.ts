"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api-client"
import { liveMatches, upcomingMatches, additionalMatches } from "@/lib/mock-data"

export function useMatches(filters?: { sport?: string; league?: string; status?: string }) {
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      const response = await apiClient.getMatches(filters)
      
      let allMatches = [...liveMatches, ...upcomingMatches, ...additionalMatches]
      
      // Apply filters
      if (filters?.status) {
        allMatches = allMatches.filter(m => m.status === filters.status)
      }
      if (filters?.sport) {
        allMatches = allMatches.filter(m => m.sport === filters.sport)
      }
      if (filters?.league) {
        allMatches = allMatches.filter(m => m.league === filters.league)
      }
      
      if (response.success && response.data) {
        setMatches(response.data)
        setError(null)
      } else {
        // Use mock data as fallback
        setMatches(allMatches)
        setError(null)
      }
      setLoading(false)
    }

    fetchMatches()
  }, [filters?.status, filters?.sport, filters?.league])

  return { matches, loading, error }
}
