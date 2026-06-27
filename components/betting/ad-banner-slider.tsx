"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BannerSlide {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  bgGradient: string
  accentColor: string
}

const bannerSlides: BannerSlide[] = [
  {
    id: "1",
    title: "100% Welcome Bonus",
    subtitle: "Limited Time Offer",
    description: "Get up to $500 bonus on your first deposit. Start winning today!",
    buttonText: "Claim Now",
    buttonLink: "/promotions/welcome",
    bgGradient: "from-primary to-primary/80",
    accentColor: "bg-accent text-accent-foreground",
  },
  {
    id: "2",
    title: "Free Bet Friday",
    subtitle: "Every Week",
    description: "Place 5 bets and get a free $10 bet every Friday!",
    buttonText: "Learn More",
    buttonLink: "/promotions/free-bet",
    bgGradient: "from-[#1e3a5f] to-[#2d5a87]",
    accentColor: "bg-amber-500 text-black",
  },
  {
    id: "3",
    title: "Accumulator Boost",
    subtitle: "Up to 50% Extra",
    description: "Add 4+ selections to your bet slip and get up to 50% bonus on your winnings!",
    buttonText: "Bet Now",
    buttonLink: "/promotions/acca-boost",
    bgGradient: "from-[#4a1c6b] to-[#6b2d8a]",
    accentColor: "bg-green-500 text-white",
  },
  {
    id: "4",
    title: "Cashout Available",
    subtitle: "Take Control",
    description: "Cash out your bets early and secure your profits before the game ends.",
    buttonText: "View Bets",
    buttonLink: "/my-bets",
    bgGradient: "from-[#1a4731] to-[#2d6b4a]",
    accentColor: "bg-yellow-400 text-black",
  },
]

export function AdBannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const slide = bannerSlides[currentSlide]

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slide Content */}
      <div
        className={cn("relative bg-gradient-to-r text-white p-6 lg:p-8 transition-all duration-500", slide.bgGradient)}
      >
        <div className="relative z-10">
          <Badge className={cn("mb-3", slide.accentColor)}>{slide.subtitle}</Badge>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">{slide.title}</h2>
          <p className="text-white/80 mb-4 max-w-md">{slide.description}</p>
          <Button className={cn(slide.accentColor, "hover:opacity-90")}>{slide.buttonText}</Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/70",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
