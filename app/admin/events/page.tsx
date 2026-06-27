import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Calendar, Clock, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const events = [
  {
    id: 1,
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    sport: "Football",
    league: "Premier League",
    date: "Dec 6, 2025",
    time: "15:00",
    status: "upcoming",
    bets: 1247,
  },
  {
    id: 2,
    homeTeam: "Lakers",
    awayTeam: "Celtics",
    sport: "Basketball",
    league: "NBA",
    date: "Dec 6, 2025",
    time: "19:30",
    status: "live",
    bets: 892,
  },
  {
    id: 3,
    homeTeam: "Djokovic",
    awayTeam: "Alcaraz",
    sport: "Tennis",
    league: "ATP Finals",
    date: "Dec 5, 2025",
    time: "14:00",
    status: "finished",
    bets: 2103,
  },
]

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground">Manage sports events and betting markets</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-9" />
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{event.sport}</Badge>
                    <span className="text-sm text-muted-foreground">{event.league}</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {event.homeTeam} vs {event.awayTeam}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                  </div>

                  <Badge
                    variant={
                      event.status === "live" ? "default" : event.status === "upcoming" ? "secondary" : "outline"
                    }
                    className={event.status === "live" ? "bg-destructive" : ""}
                  >
                    {event.status}
                  </Badge>

                  <div className="text-right">
                    <p className="text-sm font-medium">{event.bets.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">bets</p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Event</DropdownMenuItem>
                      <DropdownMenuItem>Manage Markets</DropdownMenuItem>
                      <DropdownMenuItem>View Bets</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
