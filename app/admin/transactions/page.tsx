import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreHorizontal, Download, ArrowUpCircle, ArrowDownCircle } from "lucide-react"

const transactions = [
  {
    id: "TXN-98234",
    user: "John Doe",
    type: "deposit",
    method: "Bank Transfer",
    amount: 500,
    status: "completed",
    date: "Dec 7, 2025 15:30",
  },
  {
    id: "TXN-98233",
    user: "Sarah Miller",
    type: "withdrawal",
    method: "Mobile Money",
    amount: 250,
    status: "pending",
    date: "Dec 7, 2025 14:15",
  },
  {
    id: "TXN-98232",
    user: "Mike Roberts",
    type: "deposit",
    method: "Card Payment",
    amount: 100,
    status: "completed",
    date: "Dec 7, 2025 13:45",
  },
  {
    id: "TXN-98231",
    user: "Emma Wilson",
    type: "withdrawal",
    method: "Bank Transfer",
    amount: 1000,
    status: "completed",
    date: "Dec 7, 2025 12:20",
  },
  {
    id: "TXN-98230",
    user: "James Lee",
    type: "deposit",
    method: "Telebirr",
    amount: 50,
    status: "failed",
    date: "Dec 7, 2025 11:00",
  },
]

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Monitor all financial transactions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">$25,480</div>
                <p className="text-xs text-muted-foreground">Total Deposits</p>
              </div>
              <ArrowDownCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">$12,340</div>
                <p className="text-xs text-muted-foreground">Total Withdrawals</p>
              </div>
              <ArrowUpCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Pending Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary">$13,140</div>
            <p className="text-xs text-muted-foreground">Net Balance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by transaction ID or user..." className="pl-9" />
            </div>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposit">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
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
                <TableHead>Transaction ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                  <TableCell className="font-medium">{txn.user}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {txn.type === "deposit" ? (
                        <ArrowDownCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpCircle className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="capitalize">{txn.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{txn.method}</TableCell>
                  <TableCell
                    className={`font-semibold ${txn.type === "deposit" ? "text-green-600" : "text-orange-600"}`}
                  >
                    {txn.type === "deposit" ? "+" : "-"}${txn.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        txn.status === "completed" ? "default" : txn.status === "pending" ? "secondary" : "destructive"
                      }
                      className={txn.status === "completed" ? "bg-green-600" : ""}
                    >
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{txn.date}</TableCell>
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
                        {txn.status === "pending" && (
                          <>
                            <DropdownMenuItem>Approve Transaction</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Reject Transaction</DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
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
