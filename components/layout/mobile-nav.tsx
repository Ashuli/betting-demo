"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { sports } from "@/lib/mock-data"
import { Home, Zap, Calendar, Trophy, User, Wallet, History, Settings, ShieldCheck } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/live", label: "Live", icon: Zap },
  { href: "/upcoming", label: "Upcoming", icon: Calendar },
  { href: "/results", label: "Results", icon: Trophy },
]

const accountItems = [
  { href: "/dashboard", label: "Dashboard", icon: User },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/history", label: "Bet History", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function MobileNav() {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-sidebar-border p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-sm">
          AM
        </div>
        <span className="font-bold text-lg">Epic</span>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-2">
              Navigation
            </p>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.label === "Live" && (
                    <span className="ml-auto flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                    </span>
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Sports */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-2">Sports</p>
            {sports.map((sport) => (
              <Link key={sport.id} href={`/sports/${sport.id}`}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <span className="text-base">{sport.icon}</span>
                  {sport.name}
                  <span className="ml-auto text-xs text-sidebar-foreground/50">{sport.count}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Account */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-2 mb-2">Account</p>
            {accountItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <Link href="/admin">
          <Button
            variant="outline"
            className="w-full gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent bg-transparent"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin Panel
          </Button>
        </Link>
      </div>
    </div>
  )
}
