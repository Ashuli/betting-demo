"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, ArrowUpRight, Gift, Ticket } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    label: "Deposit",
    description: "Add funds to your wallet",
    icon: CreditCard,
    href: "/dashboard/wallet?action=deposit",
    variant: "default" as const,
  },
  {
    label: "Withdraw",
    description: "Cash out your winnings",
    icon: ArrowUpRight,
    href: "/dashboard/wallet?action=withdraw",
    variant: "outline" as const,
  },
  {
    label: "Promotions",
    description: "Check available bonuses",
    icon: Gift,
    href: "/promotions",
    variant: "outline" as const,
  },
  {
    label: "Free Bets",
    description: "Use your free bet tokens",
    icon: Ticket,
    href: "/dashboard/free-bets",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link key={action.label} href={action.href}>
              <Button variant={action.variant} className="w-full h-auto flex-col items-start gap-1 p-4">
                <div className="flex items-center gap-2">
                  <action.icon className="h-4 w-4" />
                  <span className="font-medium">{action.label}</span>
                </div>
                <span className="text-xs opacity-70 font-normal">{action.description}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
