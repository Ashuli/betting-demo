import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { BetSlipProvider } from "@/context/bet-slip-context"
import { Toaster } from "@/components/ui/sonner"
import { Chatbot } from "@/components/chat/chatbot"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "AddisMark - Sports Betting Platform",
  description: "Your premier destination for sports betting. Live odds, fast payouts, and the best betting experience.",
  keywords: ["sports betting", "live odds", "football", "basketball", "tennis", "betting platform"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <BetSlipProvider>
            {children}
            <Toaster />
            <Chatbot />
          </BetSlipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
