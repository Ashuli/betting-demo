import { apiClient } from "@/lib/api-client"

// Generate mock bet ID for demo
function generateBetId() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BET-${timestamp}-${random}`
}

export class BetService {
  static async placeBet(betData: {
    selections: Array<{
      matchId: string
      marketId: string
      selectionId: string
      odds: number
    }>
    stake: number
    betType: "single" | "accumulator"
  }) {
    const response = await apiClient.placeBet(betData)
    if (!response.success) {
      // Generate mock response for demo mode
      return {
        betId: generateBetId(),
        betSlip: {
          selections: betData.selections,
          stake: betData.stake,
          betType: betData.betType,
          totalOdds: betData.selections.reduce((acc, sel) => acc * sel.odds, 1),
          potentialWin: betData.stake * betData.selections.reduce((acc, sel) => acc * sel.odds, 1),
          status: "pending",
          createdAt: new Date().toISOString(),
        }
      }
    }
    return response.data
  }

  static async getBetHistory(filters?: { status?: string; limit?: number }) {
    const response = await apiClient.getBetHistory(filters)
    if (!response.success) {
      throw new Error(response.error || "Failed to fetch bet history")
    }
    return response.data
  }

  static async getBetDetails(betId: string) {
    const response = await apiClient.getBetDetails(betId)
    if (!response.success) {
      throw new Error(response.error || "Failed to fetch bet details")
    }
    return response.data
  }

  static async cancelBet(betId: string) {
    const response = await apiClient.cancelBet(betId)
    if (!response.success) {
      throw new Error(response.error || "Failed to cancel bet")
    }
    return response.data
  }

  static async getOdds(matchId: string) {
    const response = await apiClient.getOdds(matchId)
    if (!response.success) {
      throw new Error(response.error || "Failed to fetch odds")
    }
    return response.data
  }

  static async getMarkets(matchId: string) {
    const response = await apiClient.getMarkets(matchId)
    if (!response.success) {
      throw new Error(response.error || "Failed to fetch markets")
    }
    return response.data
  }
}
