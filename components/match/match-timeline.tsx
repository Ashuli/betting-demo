"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Match } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface MatchTimelineProps {
  match: Match
}

interface TimelineEvent {
  id: string
  minute: number
  type: "goal" | "yellow-card" | "red-card" | "substitution" | "var"
  team: "home" | "away"
  player: string
  detail?: string
}

// Mock timeline data
const mockEvents: TimelineEvent[] = [
  { id: "1", minute: 12, type: "goal", team: "away", player: "M. Salah", detail: "Assist: T. Alexander-Arnold" },
  { id: "2", minute: 23, type: "yellow-card", team: "home", player: "C. Eriksen" },
  { id: "3", minute: 38, type: "goal", team: "home", player: "M. Rashford", detail: "Assist: B. Fernandes" },
  { id: "4", minute: 45, type: "substitution", team: "away", player: "D. Nunez", detail: "In for D. Jota" },
  { id: "5", minute: 52, type: "goal", team: "away", player: "C. Gakpo", detail: "Header" },
  { id: "6", minute: 67, type: "yellow-card", team: "away", player: "V. van Dijk" },
]

const eventIcons: Record<TimelineEvent["type"], string> = {
  goal: "⚽",
  "yellow-card": "🟨",
  "red-card": "🟥",
  substitution: "🔄",
  var: "📺",
}

export function MatchTimeline({ match }: MatchTimelineProps) {
  if (match.status !== "live") {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Match timeline will be available once the game starts.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Match Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "relative flex items-center gap-4",
                  event.team === "home" ? "flex-row" : "flex-row-reverse",
                )}
              >
                {/* Event Card */}
                <div
                  className={cn(
                    "flex-1 p-3 rounded-lg border border-border bg-card",
                    event.team === "home" ? "text-right" : "text-left",
                  )}
                >
                  <div className="flex items-center gap-2 justify-end">
                    {event.team === "away" && <span className="text-lg">{eventIcons[event.type]}</span>}
                    <div className={event.team === "home" ? "order-first" : ""}>
                      <p className="font-medium">{event.player}</p>
                      {event.detail && <p className="text-sm text-muted-foreground">{event.detail}</p>}
                    </div>
                    {event.team === "home" && <span className="text-lg">{eventIcons[event.type]}</span>}
                  </div>
                </div>

                {/* Minute Marker */}
                <div className="flex-shrink-0 w-12 h-8 flex items-center justify-center rounded-full bg-secondary text-sm font-medium z-10">
                  {event.minute}'
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            ))}
          </div>

          {/* Current Time Marker */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive text-destructive-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-sm font-medium">{match.minute}' - LIVE</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
