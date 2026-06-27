"use client"

import { useState } from "react"
import { useBetSlip, type BetSelection } from "@/context/bet-slip-context"
import type { Match } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, Star } from "lucide-react"

interface MatchMarketsProps {
  match: Match
}

interface MarketConfig {
  id: string
  name: string
  defaultExpanded: boolean
  selections: {
    id: string
    name: string
    label: string
    odds?: number
    oddsKey?: string
  }[]
}

const extendedMarkets: MarketConfig[] = [
  {
    id: "match-result",
    name: "Match Result",
    defaultExpanded: true,
    selections: [
      { id: "home", name: "1", label: "1", oddsKey: "home" },
      { id: "draw", name: "X", label: "X", oddsKey: "draw" },
      { id: "away", name: "2", label: "2", oddsKey: "away" },
    ],
  },
  {
    id: "double-chance",
    name: "Double Chance",
    defaultExpanded: true,
    selections: [
      { id: "1x", name: "1X", label: "1X", odds: 1.16 },
      { id: "12", name: "12", label: "12", odds: 1.21 },
      { id: "x2", name: "X2", label: "X2", odds: 2.32 },
    ],
  },
  {
    id: "btts",
    name: "Both Teams To Score",
    defaultExpanded: true,
    selections: [
      { id: "yes", name: "Yes", label: "Yes", odds: 1.65 },
      { id: "no", name: "No", label: "No", odds: 2.21 },
    ],
  },
  {
    id: "draw-no-bet",
    name: "Draw No Bet",
    defaultExpanded: true,
    selections: [
      { id: "team1", name: "Team 1", label: "Team 1", odds: 1.24 },
      { id: "team2", name: "Team 2", label: "Team 2", odds: 3.96 },
    ],
  },
  {
    id: "total-goals",
    name: "Total Goals",
    defaultExpanded: false,
    selections: [
      { id: "over-15", name: "Over 1.5", label: "Over 1.5", odds: 1.35 },
      { id: "under-15", name: "Under 1.5", label: "Under 1.5", odds: 3.1 },
    ],
  },
  {
    id: "total-goals-3way",
    name: "Total Goals 3-way",
    defaultExpanded: false,
    selections: [
      { id: "over-25", name: "Over 2.5", label: "Over 2.5", odds: 1.85 },
      { id: "exactly-25", name: "Exactly 2", label: "Exactly 2", odds: 3.5 },
      { id: "under-25", name: "Under 2.5", label: "Under 2.5", odds: 1.95 },
    ],
  },
  {
    id: "total-goals-multi",
    name: "Total Goals Multi",
    defaultExpanded: false,
    selections: [
      { id: "0-1", name: "0-1 Goals", label: "0-1", odds: 2.75 },
      { id: "2-3", name: "2-3 Goals", label: "2-3", odds: 1.9 },
      { id: "4+", name: "4+ Goals", label: "4+", odds: 3.25 },
    ],
  },
  {
    id: "total-goals-bands",
    name: "Total Goals (Bands)",
    defaultExpanded: false,
    selections: [
      { id: "0-2", name: "0-2 Goals", label: "0-2", odds: 1.55 },
      { id: "3-4", name: "3-4 Goals", label: "3-4", odds: 2.8 },
      { id: "5+", name: "5+ Goals", label: "5+", odds: 6.5 },
    ],
  },
  {
    id: "total-goals-each-half",
    name: "Total Goals in Each Half (Extended Bands)",
    defaultExpanded: false,
    selections: [
      { id: "1h-over", name: "1H Over 0.5", label: "1H Over 0.5", odds: 1.45 },
      { id: "2h-over", name: "2H Over 0.5", label: "2H Over 0.5", odds: 1.35 },
    ],
  },
  {
    id: "total-goals-exact",
    name: "Total Goals (Exact)",
    defaultExpanded: false,
    selections: [
      { id: "exact-0", name: "0 Goals", label: "0", odds: 9.0 },
      { id: "exact-1", name: "1 Goal", label: "1", odds: 5.5 },
      { id: "exact-2", name: "2 Goals", label: "2", odds: 3.75 },
      { id: "exact-3", name: "3 Goals", label: "3", odds: 4.0 },
      { id: "exact-4+", name: "4+ Goals", label: "4+", odds: 3.5 },
    ],
  },
  {
    id: "exact-number-goals",
    name: "Exact Number Of Goals",
    defaultExpanded: false,
    selections: [
      { id: "en-1", name: "1", label: "1", odds: 5.5 },
      { id: "en-2", name: "2", label: "2", odds: 3.75 },
      { id: "en-3", name: "3", label: "3", odds: 4.0 },
    ],
  },
  {
    id: "exactly-1-goal",
    name: "Exactly 1 Goal in The Match",
    defaultExpanded: false,
    selections: [
      { id: "yes-1", name: "Yes", label: "Yes", odds: 5.5 },
      { id: "no-1", name: "No", label: "No", odds: 1.12 },
    ],
  },
  {
    id: "half-time",
    name: "Half Time Result",
    defaultExpanded: false,
    selections: [
      { id: "ht-1", name: "1", label: "1", odds: 2.8 },
      { id: "ht-x", name: "X", label: "X", odds: 2.1 },
      { id: "ht-2", name: "2", label: "2", odds: 3.5 },
    ],
  },
  {
    id: "handicap",
    name: "Asian Handicap -1",
    defaultExpanded: false,
    selections: [
      { id: "hc-home", name: "Home -1", label: "Home -1", odds: 2.15 },
      { id: "hc-away", name: "Away +1", label: "Away +1", odds: 1.75 },
    ],
  },
  {
    id: "first-goal",
    name: "First Goal",
    defaultExpanded: false,
    selections: [
      { id: "fg-home", name: "Home", label: "Home", odds: 1.75 },
      { id: "fg-away", name: "Away", label: "Away", odds: 2.1 },
      { id: "fg-no-goal", name: "No Goal", label: "No Goal", odds: 12.0 },
    ],
  },
  {
    id: "correct-score",
    name: "Correct Score",
    defaultExpanded: false,
    selections: [
      { id: "cs-10", name: "1-0", label: "1-0", odds: 6.5 },
      { id: "cs-20", name: "2-0", label: "2-0", odds: 9.0 },
      { id: "cs-21", name: "2-1", label: "2-1", odds: 8.5 },
      { id: "cs-00", name: "0-0", label: "0-0", odds: 11.0 },
      { id: "cs-11", name: "1-1", label: "1-1", odds: 6.0 },
      { id: "cs-22", name: "2-2", label: "2-2", odds: 14.0 },
    ],
  },
]

interface MarketRowProps {
  market: MarketConfig
  match: Match
  expanded: boolean
  onToggle: () => void
  onFavorite: () => void
  isFavorite: boolean
}

function MarketRow({ market, match, expanded, onToggle, onFavorite, isFavorite }: MarketRowProps) {
  const { state, addSelection } = useBetSlip()

  const handleSelectionClick = (selectionId: string, selectionName: string, odds: number) => {
    const selection: BetSelection = {
      id: `${match.id}-${market.id}-${selectionId}`,
      matchId: match.id,
      matchName: `${match.homeTeam} vs ${match.awayTeam}`,
      selection: selectionName,
      odds,
      market: market.name,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      sport: match.sport,
      startTime: match.startTime,
    }
    addSelection(selection)
  }

  const isSelected = (selectionId: string) =>
    state.selections.some((s) => s.id === `${match.id}-${market.id}-${selectionId}`)

  const getOdds = (selection: MarketConfig["selections"][0]): number => {
    if (selection.odds) return selection.odds
    if (selection.oddsKey) {
      return match.odds[selection.oddsKey as keyof typeof match.odds] || 0
    }
    return 0
  }

  // Filter out draw for non-football sports
  const filteredSelections = market.selections.filter((s) => {
    if (s.id === "draw" && match.odds.draw === 0) return false
    return true
  })

  return (
    <div className="border-b border-border last:border-b-0">
      {/* Market Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 py-2.5 px-3 hover:bg-muted/50 transition-colors"
      >
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onFavorite()
          }}
          className="p-0.5"
        >
          <Star className={cn("h-4 w-4", isFavorite ? "fill-accent text-accent" : "text-muted-foreground")} />
        </button>
        <span className="text-sm font-medium text-primary">{market.name}</span>
      </button>

      {/* Market Selections */}
      {expanded && (
        <div className="flex items-center justify-between px-3 py-2 bg-muted/30">
          <div className="flex-1" />
          <div className="flex gap-2">
            {filteredSelections.map((selection) => {
              const odds = getOdds(selection)
              if (odds === 0) return null
              const selected = isSelected(selection.id)

              return (
                <button
                  key={selection.id}
                  onClick={() => handleSelectionClick(selection.id, selection.name, odds)}
                  className={cn(
                    "flex items-center gap-4 min-w-[100px] px-4 py-2 rounded transition-colors",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/70 text-foreground border border-border",
                  )}
                >
                  <span className="text-sm font-medium">{selection.label}</span>
                  <span className="text-sm font-bold">{odds.toFixed(2)}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function MatchMarkets({ match }: MatchMarketsProps) {
  const [expandedMarkets, setExpandedMarkets] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    extendedMarkets.forEach((market) => {
      initial[market.id] = market.defaultExpanded
    })
    return initial
  })

  const [favoriteMarkets, setFavoriteMarkets] = useState<Set<string>>(new Set())

  const toggleMarket = (marketId: string) => {
    setExpandedMarkets((prev) => ({
      ...prev,
      [marketId]: !prev[marketId],
    }))
  }

  const toggleFavorite = (marketId: string) => {
    setFavoriteMarkets((prev) => {
      const next = new Set(prev)
      if (next.has(marketId)) {
        next.delete(marketId)
      } else {
        next.add(marketId)
      }
      return next
    })
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {extendedMarkets.map((market) => (
        <MarketRow
          key={market.id}
          market={market}
          match={match}
          expanded={expandedMarkets[market.id] || false}
          onToggle={() => toggleMarket(market.id)}
          onFavorite={() => toggleFavorite(market.id)}
          isFavorite={favoriteMarkets.has(market.id)}
        />
      ))}
    </div>
  )
}
