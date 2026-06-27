import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

const pendingBets = [
  {
    id: "BET-7821",
    user: "John D.",
    match: "Man City vs Liverpool",
    selection: "Man City Win",
    stake: 250,
    odds: 2.15,
    potential: 537.5,
  },
  {
    id: "BET-7820",
    user: "Sarah M.",
    match: "Lakers vs Celtics",
    selection: "Over 215.5",
    stake: 100,
    odds: 1.9,
    potential: 190,
  },
  {
    id: "BET-7819",
    user: "Mike R.",
    match: "Djokovic vs Alcaraz",
    selection: "Alcaraz -1.5 Sets",
    stake: 500,
    odds: 2.8,
    potential: 1400,
  },
]

export function PendingBets() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Pending Bets</CardTitle>
        <Badge variant="outline">{pendingBets.length} pending</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingBets.map((bet) => (
          <div key={bet.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-muted-foreground">{bet.id}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{bet.user}</span>
              </div>
              <p className="text-sm font-medium truncate">{bet.match}</p>
              <p className="text-xs text-muted-foreground">{bet.selection}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">${bet.stake}</p>
              <p className="text-xs text-primary">Win: ${bet.potential}</p>
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
