"use client"

import Link from "next/link"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { sports } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Home, Zap, Calendar, Trophy, ChevronDown, Gamepad2, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "All Sports", icon: Home },
  { href: "/live", label: "Live Now", icon: Zap, badge: "12", isLive: true },
  { href: "/upcoming", label: "Upcoming", icon: Calendar },
  { href: "/games", label: "Virtual Games", icon: Gamepad2, badge: "50+", isNew: true },
  { href: "/results", label: "Results", icon: Trophy },
]

const popularSports = sports.filter((s) => ["football", "basketball", "tennis"].includes(s.id))
const esports = [
  { id: "csgo", name: "CS:GO", icon: "🎮", count: 24 },
  { id: "dota2", name: "Dota 2", icon: "🎮", count: 18 },
  { id: "lol", name: "League of Legends", icon: "🎮", count: 15 },
]
const otherSports = sports.filter((s) => !["football", "basketball", "tennis"].includes(s.id))

const sportLeagues: Record<string, { id: string; name: string }[]> = {
  football: [
    { id: "epl", name: "Premier League" },
    { id: "laliga", name: "La Liga" },
    { id: "bundesliga", name: "Bundesliga" },
    { id: "seriea", name: "Serie A" },
    { id: "ligue1", name: "Ligue 1" },
    { id: "ucl", name: "Champions League" },
    { id: "uel", name: "Europa League" },
  ],
  basketball: [
    { id: "nba", name: "NBA" },
    { id: "euroleague", name: "EuroLeague" },
    { id: "ncaa", name: "NCAA" },
    { id: "acb", name: "Liga ACB" },
    { id: "bbl", name: "BBL" },
  ],
  tennis: [
    { id: "atp", name: "ATP Tour" },
    { id: "wta", name: "WTA Tour" },
    { id: "grandslam", name: "Grand Slam" },
    { id: "daviscup", name: "Davis Cup" },
  ],
  cricket: [
    { id: "ipl", name: "IPL" },
    { id: "bbl", name: "Big Bash" },
    { id: "psl", name: "PSL" },
    { id: "test", name: "Test Matches" },
    { id: "odi", name: "ODI" },
    { id: "t20i", name: "T20 International" },
  ],
  mma: [
    { id: "ufc", name: "UFC" },
    { id: "bellator", name: "Bellator" },
    { id: "pfl", name: "PFL" },
    { id: "one", name: "ONE Championship" },
  ],
  hockey: [
    { id: "nhl", name: "NHL" },
    { id: "khl", name: "KHL" },
    { id: "shl", name: "SHL" },
    { id: "del", name: "DEL" },
  ],
  baseball: [
    { id: "mlb", name: "MLB" },
    { id: "npb", name: "NPB" },
    { id: "kbo", name: "KBO" },
  ],
  volleyball: [
    { id: "vnl", name: "VNL" },
    { id: "cev", name: "CEV" },
    { id: "superliga", name: "Superliga" },
  ],
  handball: [
    { id: "ehf", name: "EHF Champions League" },
    { id: "bundesliga", name: "Handball Bundesliga" },
    { id: "liga-asobal", name: "Liga ASOBAL" },
  ],
  rugby: [
    { id: "sixnations", name: "Six Nations" },
    { id: "rugbychamp", name: "Rugby Championship" },
    { id: "premiershiprugby", name: "Premiership Rugby" },
    { id: "top14", name: "Top 14" },
  ],
  csgo: [
    { id: "major", name: "Major Championships" },
    { id: "esl", name: "ESL Pro League" },
    { id: "blast", name: "BLAST Premier" },
  ],
  dota2: [
    { id: "ti", name: "The International" },
    { id: "dpc", name: "DPC" },
    { id: "esl", name: "ESL One" },
  ],
  lol: [
    { id: "worlds", name: "World Championship" },
    { id: "lcs", name: "LCS" },
    { id: "lec", name: "LEC" },
    { id: "lck", name: "LCK" },
    { id: "lpl", name: "LPL" },
  ],
}

function SidebarInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [expandedSport, setExpandedSport] = useState<string | null>("football")
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSportClick = (sportId: string) => {
    router.push(`/?sport=${sportId}`)
  }

  const handleLeagueClick = (sportId: string, leagueId: string) => {
    router.push(`/?sport=${sportId}&league=${leagueId}`)
  }

  const renderSportItem = (sport: { id: string; name: string; icon: string; count: number }, showLeagues = true) => {
    const isExpanded = expandedSport === sport.id && !isCollapsed
    const isActive = searchParams.get("sport") === sport.id
    const leagues = sportLeagues[sport.id] || []

    const sportButton = (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full gap-3",
          isCollapsed ? "justify-center px-2" : "justify-start",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50",
        )}
        onClick={() => {
          if (!isCollapsed) {
            if (showLeagues && leagues.length > 0) {
              setExpandedSport(isExpanded ? null : sport.id)
            } else {
              handleSportClick(sport.id)
            }
          } else {
            handleSportClick(sport.id)
          }
        }}
      >
        <span className="text-base shrink-0">{sport.icon}</span>
        {!isCollapsed && (
          <>
            {sport.name}
            <span className="ml-auto flex items-center gap-1">
              <span className="text-xs text-sidebar-foreground/50">{sport.count}</span>
              {showLeagues && leagues.length > 0 && (
                <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
              )}
            </span>
          </>
        )}
      </Button>
    )

    return (
      <div key={sport.id}>
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>{sportButton}</TooltipTrigger>
            <TooltipContent side="right">
              {sport.name} ({sport.count})
            </TooltipContent>
          </Tooltip>
        ) : (
          sportButton
        )}

        {isExpanded && !isCollapsed && leagues.length > 0 && (
          <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground"
              onClick={() => handleSportClick(sport.id)}
            >
              All {sport.name}
            </Button>
            {leagues.map((league) => (
              <Button
                key={league.id}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground"
                onClick={() => handleLeagueClick(sport.id, league.id)}
              >
                {league.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderEsportItem = (sport: { id: string; name: string; icon: string; count: number }) => {
    const isExpanded = expandedSport === sport.id && !isCollapsed
    const isActive = searchParams.get("sport") === sport.id
    const leagues = sportLeagues[sport.id] || []

    const sportButton = (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full gap-3",
          isCollapsed ? "justify-center px-2" : "justify-start",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50",
        )}
        onClick={() => !isCollapsed && leagues.length > 0 && setExpandedSport(isExpanded ? null : sport.id)}
      >
        <span className="text-base shrink-0">{sport.icon}</span>
        {!isCollapsed && (
          <>
            {sport.name}
            <span className="ml-auto flex items-center gap-1">
              <span className="text-xs text-sidebar-foreground/50">{sport.count}</span>
              {leagues.length > 0 && (
                <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
              )}
            </span>
          </>
        )}
      </Button>
    )

    return (
      <div key={sport.id}>
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>{sportButton}</TooltipTrigger>
            <TooltipContent side="right">
              {sport.name} ({sport.count})
            </TooltipContent>
          </Tooltip>
        ) : (
          sportButton
        )}

        {isExpanded && !isCollapsed && leagues.length > 0 && (
          <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground"
              onClick={() => handleSportClick(sport.id)}
            >
              All {sport.name}
            </Button>
            {leagues.map((league) => (
              <Button
                key={league.id}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground"
                onClick={() => handleLeagueClick(sport.id, league.id)}
              >
                {league.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* Collapse Toggle Button */}
        <div className="flex items-center justify-end p-2 border-b border-border">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className={cn("p-2 space-y-4", !isCollapsed && "p-4 space-y-6")}>
            {/* Quick Links */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const button = (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full gap-3",
                      isCollapsed ? "justify-center px-2" : "justify-start",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!isCollapsed && (
                      <>
                        {item.label}
                        {item.badge && (
                          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-warning text-[10px] font-medium text-warning-foreground px-1.5">
                            {item.badge}
                          </span>
                        )}
                        {item.isLive && (
                          <span className="flex h-2 w-2 ml-1">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-warning opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
                          </span>
                        )}
                      </>
                    )}
                  </Button>
                )

                return (
                  <Link key={item.href} href={item.href}>
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>{button}</TooltipTrigger>
                        <TooltipContent side="right" className="flex items-center gap-2">
                          {item.label}
                          {item.badge && (
                            <span className="rounded-full bg-warning text-[10px] font-medium text-warning-foreground px-1.5">
                              {item.badge}
                            </span>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      button
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Popular Sports */}
            <div className="space-y-1">
              {!isCollapsed && (
                <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-2 flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  Popular
                </p>
              )}
              {isCollapsed && <div className="h-px bg-border mx-2 my-2" />}
              {popularSports.map((sport) => renderSportItem(sport))}
            </div>

            {/* Esports */}
            <div className="space-y-1">
              {!isCollapsed && (
                <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-2 flex items-center gap-2">
                  <Gamepad2 className="h-3 w-3" />
                  Esports
                </p>
              )}
              {isCollapsed && <div className="h-px bg-border mx-2 my-2" />}
              {esports.map((sport) => renderEsportItem(sport))}
            </div>

            {/* Other Sports */}
            <div className="space-y-1">
              {!isCollapsed && (
                <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-2">
                  Other Sports
                </p>
              )}
              {isCollapsed && <div className="h-px bg-border mx-2 my-2" />}
              {otherSports.map((sport) => renderSportItem(sport))}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  )
}

export function Sidebar() {
  return (
    <Suspense fallback={<aside className="hidden lg:flex w-64 border-r border-border bg-sidebar" />}>
      <SidebarInner />
    </Suspense>
  )
}
