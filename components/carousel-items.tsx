"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1556740767-414a9c4860c1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Café ambiance"
  },
  {
    image: "https://images.unsplash.com/photo-1556740767-414a9c4860c1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Coffee preparation"
  },
  {
    image: "https://images.unsplash.com/photo-1556740767-414a9c4860c1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Featured desserts"
  },
  {
    image: "https://images.unsplash.com/photo-1556740767-414a9c4860c1?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Seasonal specials"
  }
]

export function FeaturedItems() {
  return (
    <div className="w-full">
      <Carousel
        plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
      >
        <CarouselContent className="-ml-1">
          {carouselItems.map((item, idx) => (
            <CarouselItem key={idx} className="pl-1">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
