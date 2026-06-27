"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Wallet, History, Trophy, Settings, Bell, HelpCircle, ArrowLeft } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/history", label: "Bet History", icon: History },
  { href: "/dashboard/results", label: "My Results", icon: Trophy },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help & Support", icon: HelpCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Betting
          </Button>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </aside>
  )
}
