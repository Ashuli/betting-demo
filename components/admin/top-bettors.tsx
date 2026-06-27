import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const topBettors = [
  { id: 1, name: "John D.", avatar: "JD", totalBets: 12450, winRate: 68 },
  { id: 2, name: "Sarah M.", avatar: "SM", totalBets: 9820, winRate: 54 },
  { id: 3, name: "Mike R.", avatar: "MR", totalBets: 8340, winRate: 71 },
  { id: 4, name: "Emma W.", avatar: "EW", totalBets: 7210, winRate: 45 },
  { id: 5, name: "James L.", avatar: "JL", totalBets: 6890, winRate: 62 },
]

export function TopBettors() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Bettors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topBettors.map((bettor, index) => (
          <div key={bettor.id} className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground w-4">{index + 1}</span>
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/.jpg?height=36&width=36&query=${bettor.name} avatar`} />
              <AvatarFallback className="text-xs">{bettor.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{bettor.name}</p>
              <p className="text-xs text-muted-foreground">${bettor.totalBets.toLocaleString()} wagered</p>
            </div>
            <Badge variant={bettor.winRate >= 60 ? "default" : "secondary"} className="text-xs">
              {bettor.winRate}% win
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
