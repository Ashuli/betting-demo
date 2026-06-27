import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreHorizontal, Download, CheckCircle2, XCircle } from "lucide-react"

const bets = [
  {
    id: "BT-001247",
    user: "John Doe",
    type: "accumulator",
    selections: 5,
    stake: 50,
    potentialWin: 1250,
    odds: 25.0,
    status: "pending",
    date: "Dec 7, 2025 14:30",
  },
  {
    id: "BT-001246",
    user: "Sarah Miller",
    type: "single",
    selections: 1,
    stake: 100,
    potentialWin: 175,
    odds: 1.75,
    status: "won",
    date: "Dec 7, 2025 13:15",
  },
  {
    id: "BT-001245",
    user: "Mike Roberts",
    type: "accumulator",
    selections: 3,
    stake: 25,
    potentialWin: 187.5,
    odds: 7.5,
    status: "lost",
    date: "Dec 7, 2025 12:00",
  },
  {
    id: "BT-001244",
    user: "Emma Wilson",
    type: "single",
    selections: 1,
    stake: 200,
    potentialWin: 460,
    odds: 2.3,
    status: "pending",
    date: "Dec 7, 2025 11:45",
  },
  {
    id: "BT-001243",
    user: "James Lee",
    type: "accumulator",
    selections: 4,
    stake: 30,
    potentialWin: 420,
    odds: 14.0,
    status: "cashout",
    date: "Dec 7, 2025 10:20",
  },
]

export default function BetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bets Management</h1>
          <p className="text-muted-foreground">Monitor and manage all betting activities</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Total Bets Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">$45,230</div>
            <p className="text-xs text-muted-foreground">Total Stakes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">$38,450</div>
            <p className="text-xs text-muted-foreground">Potential Payout</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">Pending Bets</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bets by ID or user..." className="pl-9" />
            </div>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="won">Won</TabsTrigger>
                <TabsTrigger value="lost">Lost</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bet ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Stake</TableHead>
                <TableHead>Odds</TableHead>
                <TableHead>Potential Win</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bets.map((bet) => (
                <TableRow key={bet.id}>
                  <TableCell className="font-mono text-sm">{bet.id}</TableCell>
                  <TableCell className="font-medium">{bet.user}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="capitalize">{bet.type}</span>
                      <span className="text-xs text-muted-foreground">{bet.selections} selection(s)</span>
                    </div>
                  </TableCell>
                  <TableCell>${bet.stake.toFixed(2)}</TableCell>
                  <TableCell>{bet.odds.toFixed(2)}</TableCell>
                  <TableCell className="font-semibold text-primary">${bet.potentialWin.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        bet.status === "won"
                          ? "default"
                          : bet.status === "lost"
                            ? "destructive"
                            : bet.status === "cashout"
                              ? "secondary"
                              : "outline"
                      }
                      className={bet.status === "won" ? "bg-green-600" : ""}
                    >
                      {bet.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{bet.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>View User</DropdownMenuItem>
                        {bet.status === "pending" && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Settle as Won
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="h-4 w-4 mr-2" />
                              Settle as Lost
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="text-destructive">Cancel Bet</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
