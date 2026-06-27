// API client for communicating with backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          message: errorData.error || "An error occurred",
          code: errorData.code || "UNKNOWN_ERROR",
          statusCode: response.status,
        }
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error: any) {
      // Silently fail for demo - mock data will be used instead
      return {
        success: false,
        error: error.message || "Using mock data for demo",
      }
    }
  }

  // ============ MATCHES & ODDS ============

  async getMatches(filters?: {
    sport?: string
    league?: string
    status?: "live" | "upcoming" | "finished"
  }) {
    return this.request<any[]>("/matches", {
      method: "GET",
    })
  }

  async getMatchDetails(matchId: string) {
    return this.request<any>(`/matches/${matchId}`, {
      method: "GET",
    })
  }

  async getOdds(matchId: string) {
    return this.request<any>(`/matches/${matchId}/odds`, {
      method: "GET",
    })
  }

  async getMarkets(matchId: string) {
    return this.request<any[]>(`/matches/${matchId}/markets`, {
      method: "GET",
    })
  }

  // ============ BETTING ============

  async placeBet(betData: {
    selections: Array<{
      matchId: string
      marketId: string
      selectionId: string
      odds: number
    }>
    stake: number
    betType: "single" | "accumulator"
  }) {
    return this.request<{ betId: string; betSlip: any }>("/bets/place", {
      method: "POST",
      body: JSON.stringify(betData),
    })
  }

  async getBetHistory(filters?: { status?: string; limit?: number; offset?: number }) {
    return this.request<any[]>("/bets/history", {
      method: "GET",
    })
  }

  async getBetDetails(betId: string) {
    return this.request<any>(`/bets/${betId}`, {
      method: "GET",
    })
  }

  async cancelBet(betId: string) {
    return this.request<{ betId: string; refundAmount: number }>(`/bets/${betId}/cancel`, {
      method: "POST",
    })
  }

  // ============ ACCOUNT ============

  async getAccount() {
    return this.request<{
      userId: string
      email: string
      balance: number
      totalBets: number
      wonBets: number
      pendingBets: number
      totalWinnings: number
    }>("/account", {
      method: "GET",
    })
  }

  async getBalance() {
    return this.request<{ balance: number; currency: string }>("/account/balance", {
      method: "GET",
    })
  }

  async deposit(amount: number, method: "card" | "bank" | "wallet") {
    return this.request<{ transactionId: string; status: string }>("/account/deposit", {
      method: "POST",
      body: JSON.stringify({ amount, method }),
    })
  }

  async withdraw(amount: number, method: "card" | "bank" | "wallet") {
    return this.request<{ transactionId: string; status: string }>("/account/withdraw", {
      method: "POST",
      body: JSON.stringify({ amount, method }),
    })
  }

  async getTransactionHistory(limit?: number) {
    return this.request<any[]>("/account/transactions", {
      method: "GET",
    })
  }

  // ============ AUTHENTICATION ============

  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, password: string, fullName: string) {
    return this.request<{ token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    })
  }

  async logout() {
    return this.request<{ success: boolean }>("/auth/logout", {
      method: "POST",
    })
  }

  async refreshToken() {
    return this.request<{ token: string }>("/auth/refresh", {
      method: "POST",
    })
  }

  // ============ LIVE DATA ============

  async subscribeToLiveOdds(matchId: string, callback: (data: any) => void) {
    // Implement WebSocket connection for live odds
    const wsUrl = this.baseUrl.replace(/^http/, "ws") + `/live/odds/${matchId}`
    const ws = new WebSocket(wsUrl)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      callback(data)
    }

    return ws
  }

  async subscribeToMatchUpdates(matchId: string, callback: (data: any) => void) {
    // Implement WebSocket connection for live match updates
    const wsUrl = this.baseUrl.replace(/^http/, "ws") + `/live/matches/${matchId}`
    const ws = new WebSocket(wsUrl)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      callback(data)
    }

    return ws
  }
}

export const apiClient = new ApiClient()
