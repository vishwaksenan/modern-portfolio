import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vishwak Senan",
  description: "Backend Engineer",
  keywords: ["software engineer", "backend developer", "portfolio", "developer", "programming", "low latency", "c++"],
  authors: [{ name: "Vishwak Senan Ganesan" }],
  creator: "Vishwak Senan Ganesan",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  )
}

