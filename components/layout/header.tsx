"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useBetSlip } from "@/context/bet-slip-context"
import {
  Search,
  Menu,
  Sun,
  Moon,
  User,
  Wallet,
  History,
  Settings,
  LogOut,
  Bell,
  Receipt,
  Download,
  Globe,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
} from "lucide-react"
import { useState } from "react"
import { MobileNav } from "./mobile-nav"

function Header() {
  const { theme, setTheme } = useTheme()
  const { state, toggleSlip } = useBetSlip()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoggedIn] = useState(true) // Set isLoggedIn to true by default to show "My Account" button

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-primary text-primary-foreground">
        <div className="flex h-12 items-center justify-between px-4 lg:px-6">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <MobileNav />
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold text-sm">
                AM
              </div>
              <span className="hidden sm:inline-block">Epic</span>
            </Link>
          </div>

          {/* Right: Download, Social, Language */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Download App Button */}
            <Button size="sm" className="hidden sm:flex gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Download className="h-4 w-4" />
              Download App
            </Button>
            <Button size="icon" className="sm:hidden bg-accent text-accent-foreground hover:bg-accent/90 h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>

            {/* Social Media Icons */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">EN</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Amharic</DropdownMenuItem>
                <DropdownMenuItem>Swahili</DropdownMenuItem>
                <DropdownMenuItem>French</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 items-center justify-between px-4 lg:px-6">
          {/* Left: Navigation Links */}
          <nav className="flex items-center gap-1">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground">
                Sports
              </Button>
            </Link>
            <Link href="/upcoming">
              <Button variant="ghost" size="sm" className="text-foreground">
                Upcoming
              </Button>
            </Link>
            <Link href="/live">
              <Button variant="ghost" size="sm" className="gap-2 text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
                </span>
                Live
              </Button>
            </Link>
            <Link href="/virtual" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="text-foreground">
                Virtual
              </Button>
            </Link>
            <Link href="/promotions" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="text-accent font-medium">
                Promotions
              </Button>
            </Link>
          </nav>

          {/* Right: Auth / User Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            {isLoggedIn && (
              <Button variant="ghost" size="icon" className="relative h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-warning text-[10px] text-warning-foreground font-medium">
                  3
                </span>
              </Button>
            )}

            {/* Bet Slip Toggle (Mobile) */}
            <Button variant="ghost" size="icon" className="relative h-8 w-8 lg:hidden" onClick={toggleSlip}>
              <Receipt className="h-4 w-4" />
              {state.selections.length > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground">
                  {state.selections.length}
                </Badge>
              )}
            </Button>

            {isLoggedIn ? (
              <>
                {/* Balance Display */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">$1,250.50</span>
                </div>

                {/* My Account Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">My Account</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/wallet" className="cursor-pointer">
                        <Wallet className="mr-2 h-4 w-4" />
                        Wallet
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/history" className="cursor-pointer">
                        <History className="mr-2 h-4 w-4" />
                        Bet History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Login / Create Account Buttons */}
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-border p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search matches, teams..." className="pl-9" autoFocus />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export { Header }
export default Header
