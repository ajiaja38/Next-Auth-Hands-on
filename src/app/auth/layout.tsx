"use client"

import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {children}
    </div>
  )
}
