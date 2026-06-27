"use client"

import { useState } from "react"
import { virtualGames, VirtualGame } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Zap } from "lucide-react"

export function VirtualGames() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "All Games", count: virtualGames.length },
    { id: "virtual_racing", label: "Virtual Racing", count: virtualGames.filter(g => g.category === "virtual_racing").length },
    { id: "virtual_sports", label: "Virtual Sports", count: virtualGames.filter(g => g.category === "virtual_sports").length },
    { id: "slots", label: "Slots", count: virtualGames.filter(g => g.category === "slots").length },
    { id: "casino", label: "Casino", count: virtualGames.filter(g => g.category === "casino").length },
    { id: "cards", label: "Card Games", count: virtualGames.filter(g => g.category === "cards").length },
  ]

  const filteredGames = selectedCategory === "all" 
    ? virtualGames 
    : virtualGames.filter(g => g.category === selectedCategory)

  return (
    <div className="space-y-4">
      {/* Categories */}
      <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs sm:text-sm">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat.id} value={cat.id} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGames.map(game => (
                <VirtualGameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">No games found in this category</p>
        </div>
      )}
    </div>
  )
}

function VirtualGameCard({ game }: { game: VirtualGame }) {
  const gradients: Record<string, string> = {
    slots: "from-purple-800 via-purple-700 to-indigo-900",
    casino: "from-rose-800 via-red-700 to-rose-900",
    virtual_racing: "from-blue-800 via-blue-600 to-cyan-900",
    virtual_sports: "from-emerald-800 via-green-700 to-teal-900",
    cards: "from-amber-700 via-orange-600 to-amber-900",
  }

  const icons: Record<string, JSX.Element> = {
    slots: <Zap className="w-14 h-14 text-white/40" />,
    casino: <Trophy className="w-14 h-14 text-white/40" />,
    virtual_racing: <Zap className="w-14 h-14 text-white/40" />,
    virtual_sports: <Users className="w-14 h-14 text-white/40" />,
    cards: <Trophy className="w-14 h-14 text-white/40" />,
  }

  const bgGradient = gradients[game.category] || "from-slate-600 to-slate-900"

  return (
    <div className="group relative rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 border border-white/5 bg-card">
      {/* Image / Gradient area */}
      <div className={`relative h-36 sm:h-40 bg-gradient-to-br ${bgGradient} flex items-center justify-center overflow-hidden`}>
        {game.image ? (
          <img
            src={game.image}
            alt={game.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {icons[game.category] || <span className="text-5xl">🎮</span>}
          </div>
        )}

        {/* Gradient overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Featured badge */}
        {game.featured && (
          <div className="absolute top-2 left-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
            ⭐ Hot
          </div>
        )}

        {/* Live players */}
        {game.players && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
            </span>
            {game.players.toLocaleString()}
          </div>
        )}

        {/* Game name overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-white font-bold text-sm leading-tight truncate drop-shadow">{game.name}</p>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-white/70 text-[10px]">RTP {game.rtp}%</span>
            <span className={`text-[10px] font-semibold capitalize ${
              game.volatility === "low" ? "text-emerald-400" :
              game.volatility === "medium" ? "text-amber-400" : "text-rose-400"
            }`}>
              {game.volatility} vol.
            </span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="px-3 py-2 flex items-center justify-between bg-card">
        <div className="text-[11px] text-muted-foreground">
          <span className="text-foreground font-semibold">${game.minBet}</span>
          <span className="mx-1 opacity-50">–</span>
          <span>${game.maxBet}</span>
        </div>
        <button className="text-[11px] font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full hover:bg-primary/90 active:scale-95 transition-all">
          Play Now
        </button>
      </div>
    </div>
  )
}
