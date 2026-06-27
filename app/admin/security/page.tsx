import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, AlertTriangle, CheckCircle2, XCircle, Eye, Lock, AlertCircle } from "lucide-react"

const securityAlerts = [
  {
    id: 1,
    type: "suspicious",
    severity: "high",
    message: "Multiple failed login attempts detected for user john@email.com",
    time: "2 mins ago",
  },
  {
    id: 2,
    type: "fraud",
    severity: "critical",
    message: "Unusual betting pattern detected from IP 192.168.1.45",
    time: "15 mins ago",
  },
  {
    id: 3,
    type: "info",
    severity: "low",
    message: "New device login detected for user sarah@email.com",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "withdrawal",
    severity: "medium",
    message: "Large withdrawal request ($5,000) pending approval",
    time: "2 hours ago",
  },
]

const recentActivity = [
  { action: "Admin login", user: "admin@addismark.com", ip: "197.156.65.42", status: "success", time: "5 mins ago" },
  { action: "User banned", user: "admin@addismark.com", ip: "197.156.65.42", status: "success", time: "15 mins ago" },
  { action: "Failed login", user: "unknown", ip: "103.247.89.12", status: "failed", time: "22 mins ago" },
  {
    action: "Settings changed",
    user: "admin@addismark.com",
    ip: "197.156.65.42",
    status: "success",
    time: "1 hour ago",
  },
]

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Security & Monitoring</h1>
          <p className="text-muted-foreground">Monitor platform security and suspicious activities</p>
        </div>
        <Button>
          <Shield className="h-4 w-4 mr-2" />
          Security Settings
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">3</div>
                <p className="text-xs text-muted-foreground">Critical Alerts</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">12</div>
                <p className="text-xs text-muted-foreground">Failed Logins</p>
              </div>
              <XCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">98.7%</div>
                <p className="text-xs text-muted-foreground">System Uptime</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">Blocked IPs</p>
              </div>
              <Lock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {securityAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="mt-0.5">
                {alert.severity === "critical" ? (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                ) : alert.severity === "high" ? (
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={alert.severity === "critical" || alert.severity === "high" ? "destructive" : "secondary"}
                  >
                    {alert.severity}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-sm">{alert.message}</p>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Review
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Admin Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{activity.action}</TableCell>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell className="font-mono text-sm">{activity.ip}</TableCell>
                  <TableCell>
                    <Badge variant={activity.status === "success" ? "default" : "destructive"}>{activity.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
