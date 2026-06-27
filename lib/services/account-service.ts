import { apiClient } from "@/lib/api-client"

export class AccountService {
  static async getBalance() {
    const response = await apiClient.getBalance()
    if (!response.success) {
      throw new Error(response.error || "Failed to fetch balance")
    }
    return response.data
  }

  static async deposit(amount: number, method: "card" | "bank" | "wallet") {
    const response = await apiClient.deposit(amount, method)
    if (!response.success) {
      throw new Error(response.error || "Failed to process deposit")
    }
    return response.data
  }

  static async withdraw(amount: number, method: "card" | "bank" | "wallet") {
    const response = await apiClient.withdraw(amount, method)
    if (!response.success) {
      throw new Error(response.error || "Failed to process withdrawal")
    }
    return response.data
  }

  static async getTransactionHistory(limit?: number) {
    const response = await apiClient.getTransactionHistory(limit)
    if (!response.success) {
      throw new Error(response.error || "Failed to fetch transactions")
    }
    return response.data
  }
}
