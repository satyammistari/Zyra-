"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
}) => {
  return (
    <div
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-50" />
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => {
          const randomLeft = Math.random() * 100;
          const randomTop = Math.random() * 100;
          const randomWidth = Math.random() * 4 + 1;
          const randomHeight = Math.random() * 4 + 1;
          const randomOpacity = Math.random() * 0.5 + 0.1;
          const randomDelay = Math.random() * 2;
          const randomDuration = Math.random() * 3 + 2;
          
          return (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${randomLeft}%`,
                top: `${randomTop}%`,
                width: `${randomWidth}px`,
                height: `${randomHeight}px`,
                backgroundColor: 'currentColor',
                borderRadius: '50%',
                opacity: randomOpacity,
                animationDelay: `${randomDelay}s`,
                animationDuration: `${randomDuration}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  )
}

export { Particles }
