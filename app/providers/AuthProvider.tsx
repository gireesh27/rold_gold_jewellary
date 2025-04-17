"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import { usePathname } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't refetch session on every route change
  const refetchInterval = 0
  const refetchOnWindowFocus = false

  return (
    <SessionProvider refetchInterval={refetchInterval} refetchOnWindowFocus={refetchOnWindowFocus}>
      {children}
    </SessionProvider>
  )
}

