"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Search, CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface BetHistoryFiltersProps {
  onFilterChange?: (filters: {
    search: string
    status: string
    sport: string
    betType: string
    dateRange: { from: Date | undefined; to: Date | undefined }
  }) => void
}

export function BetHistoryFilters({ onFilterChange }: BetHistoryFiltersProps) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [sport, setSport] = useState("all")
  const [betType, setBetType] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  const handleFilterChange = () => {
    onFilterChange?.({ search, status, sport, betType, dateRange })
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by bet ID or match..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              handleFilterChange()
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value)
            handleFilterChange()
          }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="void">Void</SelectItem>
            <SelectItem value="cashout">Cashed Out</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sport}
          onValueChange={(value) => {
            setSport(value)
            handleFilterChange()
          }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
            <SelectItem value="cricket">Cricket</SelectItem>
            <SelectItem value="mma">MMA</SelectItem>
            <SelectItem value="hockey">Ice Hockey</SelectItem>
            <SelectItem value="esports">E-Sports</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={betType}
          onValueChange={(value) => {
            setBetType(value)
            handleFilterChange()
          }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Bet Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="accumulator">Accumulator</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 justify-start text-left font-normal w-full sm:w-auto bg-transparent"
            >
              <CalendarIcon className="h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                "Select date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange({ from: range?.from, to: range?.to })
                handleFilterChange()
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="ghost"
          onClick={() => {
            setSearch("")
            setStatus("all")
            setSport("all")
            setBetType("all")
            setDateRange({ from: undefined, to: undefined })
            handleFilterChange()
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
