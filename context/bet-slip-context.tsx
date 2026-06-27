"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface BetSelection {
  id: string
  matchId: string
  matchName: string
  selection: string
  odds: number
  market: string
  homeTeam: string
  awayTeam: string
  sport: string
  startTime: string
}

export interface BetSlipState {
  selections: BetSelection[]
  stake: number
  betType: "single" | "accumulator"
  isOpen: boolean
}

interface BetSlipContextType {
  state: BetSlipState
  addSelection: (selection: BetSelection) => void
  removeSelection: (id: string) => void
  clearSlip: () => void
  setStake: (stake: number) => void
  setBetType: (type: "single" | "accumulator") => void
  toggleSlip: () => void
  setIsOpen: (open: boolean) => void
  totalOdds: number
  potentialWin: number
}

const BetSlipContext = createContext<BetSlipContextType | undefined>(undefined)

export function BetSlipProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BetSlipState>({
    selections: [],
    stake: 0,
    betType: "single",
    isOpen: false,
  })

  const addSelection = useCallback((selection: BetSelection) => {
    setState((prev) => {
      const exists = prev.selections.find((s) => s.id === selection.id)
      if (exists) {
        // If clicking the same selection, remove it
        return {
          ...prev,
          selections: prev.selections.filter((s) => s.id !== selection.id),
        }
      }
      // Remove any existing selections from the same match
      const filteredSelections = prev.selections.filter((s) => s.matchId !== selection.matchId)
      // Add the new selection
      return {
        ...prev,
        selections: [...filteredSelections, selection],
        isOpen: true,
      }
    })
  }, [])

  const removeSelection = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      selections: prev.selections.filter((s) => s.id !== id),
    }))
  }, [])

  const clearSlip = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selections: [],
      stake: 0,
    }))
  }, [])

  const setStake = useCallback((stake: number) => {
    setState((prev) => ({ ...prev, stake }))
  }, [])

  const setBetType = useCallback((betType: "single" | "accumulator") => {
    setState((prev) => ({ ...prev, betType }))
  }, [])

  const toggleSlip = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
  }, [])

  const setIsOpen = useCallback((isOpen: boolean) => {
    setState((prev) => ({ ...prev, isOpen }))
  }, [])

  const totalOdds = state.selections.reduce((acc, sel) => acc * sel.odds, 1)
  const potentialWin = state.stake * (state.betType === "accumulator" ? totalOdds : 1)

  return (
    <BetSlipContext.Provider
      value={{
        state,
        addSelection,
        removeSelection,
        clearSlip,
        setStake,
        setBetType,
        toggleSlip,
        setIsOpen,
        totalOdds,
        potentialWin,
      }}
    >
      {children}
    </BetSlipContext.Provider>
  )
}

export function useBetSlip() {
  const context = useContext(BetSlipContext)
  if (!context) {
    throw new Error("useBetSlip must be used within a BetSlipProvider")
  }
  return context
}
