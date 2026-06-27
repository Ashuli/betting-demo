"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useState } from "react"

export function WalletOverview() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Balance Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Your Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">$1,250.50</p>
          <p className="text-sm text-muted-foreground mt-1">Available for betting</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pending Bets</span>
              <span className="font-medium">$485.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bonus Balance</span>
              <span className="font-medium text-accent">$50.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Free Bets</span>
              <span className="font-medium text-primary">2 Available</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deposit/Withdraw */}
      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <Tabs defaultValue="deposit">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit" className="gap-2">
                <ArrowDownLeft className="h-4 w-4" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Withdraw
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  {[25, 50, 100, 250, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDepositAmount(amount.toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Credit Card", icon: CreditCard },
                    { name: "Bank Transfer", icon: Wallet },
                  ].map((method) => (
                    <Button key={method.name} variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                      <method.icon className="h-5 w-5" />
                      {method.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg" disabled={!depositAmount}>
                Deposit ${depositAmount || "0.00"}
              </Button>
            </TabsContent>

            <TabsContent value="withdraw" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Maximum withdrawal: $1,250.50</p>
              </div>

              <div className="space-y-2">
                <Label>Withdraw To</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Bank Account", icon: Wallet },
                    { name: "E-Wallet", icon: CreditCard },
                  ].map((method) => (
                    <Button key={method.name} variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                      <method.icon className="h-5 w-5" />
                      {method.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg" disabled={!withdrawAmount}>
                Withdraw ${withdrawAmount || "0.00"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
