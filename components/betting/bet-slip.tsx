"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBetSlip } from "@/context/bet-slip-context"
import { cn } from "@/lib/utils"
import { X, Trash2, MessageCircle, Copy, Clock, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { BetService } from "@/lib/services/bet-service"

const lastWinnings = [
  { winner: "User***123", stake: 50, date: "2025-12-07", winAmount: 245.5 },
  { winner: "Bet***456", stake: 100, date: "2025-12-07", winAmount: 520.0 },
  { winner: "Pro***789", stake: 25, date: "2025-12-06", winAmount: 187.25 },
  { winner: "Ace***012", stake: 75, date: "2025-12-06", winAmount: 312.0 },
]

function generateSlipId() {
  const part1 = Math.floor(10000 + Math.random() * 90000)
  const part2 = Math.floor(10000 + Math.random() * 90000)
  return `${part1}-${part2}`
}

export function BetSlip() {
  const { state, removeSelection, clearSlip, setStake, setBetType, totalOdds, potentialWin, setIsOpen } = useBetSlip()
  const [bookingCode, setBookingCode] = useState("")
  const [ticketId, setTicketId] = useState("")
  const [betId, setBetId] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [slipId, setSlipId] = useState("")
  const [confirmedSelections, setConfirmedSelections] = useState<typeof state.selections>([])
  const [confirmedStake, setConfirmedStake] = useState(0)
  const [confirmedTotalOdds, setConfirmedTotalOdds] = useState(0)
  const [confirmedPotentialWin, setConfirmedPotentialWin] = useState(0)
  const [isPlacingBet, setIsPlacingBet] = useState(false)

  const handlePlaceBet = async () => {
    if (state.stake <= 0) {
      toast.error("Please enter a valid stake amount")
      return
    }

    setIsPlacingBet(true)

    try {
      const formattedSelections = state.selections.map((sel) => ({
        matchId: sel.matchId,
        marketId: "match-result",
        selectionId: sel.id,
        odds: sel.odds,
      }))

      const response = await BetService.placeBet({
        selections: formattedSelections,
        stake: state.stake,
        betType: state.betType,
      })

      const newSlipId = response?.betId || generateSlipId()
      setSlipId(newSlipId)
      setConfirmedSelections([...state.selections])
      setConfirmedStake(state.stake)
      setConfirmedTotalOdds(totalOdds)
      setConfirmedPotentialWin(potentialWin)
      setShowConfirmModal(true)
      clearSlip()
      toast.success("Bet placed successfully!")
    } catch (error: any) {
      console.error("[v0] Bet placement error:", error)
      toast.error(error.message || "Failed to place bet. Please try again.")
    } finally {
      setIsPlacingBet(false)
    }
  }

  const handleCopySlipId = () => {
    navigator.clipboard.writeText(slipId)
    toast.success("Slip ID copied to clipboard!")
  }

  return (
    <>
      <aside
        className={cn(
          "fixed right-0 top-14 z-40 flex h-[calc(100vh-3.5rem)] w-80 flex-col border-l border-border bg-card transition-transform duration-300 lg:relative lg:top-0 lg:h-auto lg:translate-x-0",
          state.isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between bg-primary text-primary-foreground p-4">
          <h2 className="font-semibold text-lg">Betslip</h2>
          <div className="flex items-center gap-2">
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold px-2">
              {state.selections.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 lg:hidden text-primary-foreground hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          {state.selections.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No bet has been selected. To select a bet, please click on the respective odds
              </p>
            </div>
          ) : (
            <>
              {/* Bet Type Tabs */}
              <Tabs
                value={state.betType}
                onValueChange={(v) => setBetType(v as "single" | "accumulator")}
                className="w-full"
              >
                <div className="border-b border-border px-4 pt-3">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="single">Single</TabsTrigger>
                    <TabsTrigger value="accumulator">Accumulator</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="single" className="m-0">
                  <div className="p-4 space-y-3">
                    {state.selections.map((selection) => (
                      <SelectionCard
                        key={selection.id}
                        selection={selection}
                        onRemove={() => removeSelection(selection.id)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="accumulator" className="m-0">
                  <div className="p-4 space-y-3">
                    {state.selections.map((selection) => (
                      <SelectionCard
                        key={selection.id}
                        selection={selection}
                        onRemove={() => removeSelection(selection.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Stake & Place Bet */}
              <div className="border-t border-border p-4 space-y-4">
                {state.betType === "accumulator" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Odds</span>
                    <span className="font-semibold text-primary">{totalOdds.toFixed(2)}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Stake</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={state.stake || ""}
                      onChange={(e) => setStake(Number.parseFloat(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <div className="flex gap-1">
                      {[10, 25, 50, 100].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          className="px-2 text-xs bg-transparent"
                          onClick={() => setStake(amount)}
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-primary/10">
                  <span className="text-sm font-medium">Potential Win</span>
                  <span className="text-lg font-bold text-primary">{potentialWin.toFixed(2)} ETB</span>
                </div>

                <div className="flex gap-2">
                  {state.selections.length > 0 && (
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={clearSlip}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  )}
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={handlePlaceBet}
                    disabled={state.stake <= 0 || isPlacingBet}
                  >
                    {isPlacingBet && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {isPlacingBet ? "Placing..." : "Place Bet"}
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Load booked bet */}
          <div className="border-t border-border">
            <div className="bg-primary text-primary-foreground px-4 py-2">
              <h3 className="font-medium text-sm">Load booked bet</h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-2">
                Insert the code to load or <button className="text-primary hover:underline">check it</button> here
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Insert the code here..."
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (!bookingCode.trim()) {
                      toast.error("Please enter a booking code")
                      return
                    }
                    toast.info(`Loading booked bet: ${bookingCode}`)
                  }}
                  className="px-6"
                >
                  Load
                </Button>
              </div>
            </div>
          </div>

          {/* Load Ticket */}
          <div className="border-t border-border">
            <div className="bg-primary text-primary-foreground px-4 py-2">
              <h3 className="font-medium text-sm">Load Ticket</h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-2">Insert the id to load ticket</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Insert the id here..."
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (!ticketId.trim()) {
                      toast.error("Please enter a ticket ID")
                      return
                    }
                    toast.info(`Loading ticket: ${ticketId}`)
                  }}
                  className="px-6"
                >
                  Load
                </Button>
              </div>
            </div>
          </div>

          {/* Check Your Bet */}
          <div className="border-t border-border">
            <div className="bg-primary text-primary-foreground px-4 py-2">
              <h3 className="font-medium text-sm">Check Your Bet</h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-2 text-center">Your Bet ID</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Insert the code here..."
                  value={betId}
                  onChange={(e) => setBetId(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={() => {
                    if (!betId.trim()) {
                      toast.error("Please enter a bet ID")
                      return
                    }
                    toast.info(`Checking bet: ${betId}`)
                  }}
                  className="px-6"
                >
                  Load
                </Button>
              </div>
            </div>
          </div>

          {/* Last winnings */}
          <div className="border-t border-border">
            <div className="bg-primary text-primary-foreground px-4 py-2">
              <h3 className="font-medium text-sm">Last winnings</h3>
            </div>
            <div className="p-2">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-muted-foreground font-medium">Winner</th>
                    <th className="text-center py-2 px-2 text-muted-foreground font-medium">Stake</th>
                    <th className="text-right py-2 px-2 text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {lastWinnings.map((win, index) => (
                    <tr key={index} className="border-b border-border/50 last:border-0">
                      <td className="py-2 px-2 text-primary font-medium">{win.winner}</td>
                      <td className="py-2 px-2 text-center">{win.stake} ETB</td>
                      <td className="py-2 px-2 text-right text-muted-foreground">{win.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollArea>

        <div className="absolute bottom-20 right-4">
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </aside>

      {/* Bet Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md bg-[#1a1a2e] text-white border-0">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-green-400">
              Congrats! Your bet is booked.
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Slip ID Box */}
            <div className="border border-gray-600 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-green-400">{slipId}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-transparent"
                  onClick={handleCopySlipId}
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Please find a nearby AddisMark Betting shop and deposit using the above ticket number. Thank you.
              </p>
              <p className="text-xs text-red-400 mt-2">***All bets after kickoff are INVALID.***</p>
              <p className="text-xs text-amber-400">***All Terms and Conditions fully apply.***</p>
            </div>

            {/* Bet Summary */}
            <div className="bg-[#252542] rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Odd</span>
                <span className="font-semibold">{confirmedTotalOdds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Stake</span>
                <span className="font-semibold">{confirmedStake.toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">NetStake</span>
                <span className="font-semibold">{(confirmedStake * 0.87).toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Max Win</span>
                <span className="font-semibold">{confirmedPotentialWin.toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Bonus</span>
                <span className="font-semibold">{(confirmedPotentialWin * 0.05).toFixed(2)} ETB</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-600">
                <span>Net Pay</span>
                <span className="text-green-400">{(confirmedPotentialWin * 1.05).toFixed(2)} ETB</span>
              </div>
            </div>

            {/* Selected Matches */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {confirmedSelections.map((selection, index) => (
                <div key={index} className="bg-[#252542] rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{selection.homeTeam}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{selection.awayTeam}</span>
                      </div>
                      <span className="text-xs text-gray-400">{selection.market}</span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>07/12/25, 17:00</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{selection.odds.toFixed(2)}</span>
                      <p className="text-xs text-gray-400">{selection.selection}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface SelectionCardProps {
  selection: {
    id: string
    matchName: string
    selection: string
    odds: number
    market: string
    homeTeam: string
    awayTeam: string
  }
  onRemove: () => void
}

function SelectionCard({ selection, onRemove }: SelectionCardProps) {
  return (
    <div className="rounded-lg border border-border bg-background p-3 space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">
            {selection.homeTeam} vs {selection.awayTeam}
          </p>
          <p className="font-medium text-sm">{selection.selection}</p>
          <p className="text-xs text-muted-foreground">{selection.market}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary">{selection.odds.toFixed(2)}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
