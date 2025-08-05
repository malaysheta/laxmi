import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/session-provider"
import ClientOnly from "@/components/ClientOnly" // 👈 Import this

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shree Laxmi Financial Services",
  description: "Leading financial services firm delivering comprehensive financial solutions",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ClientOnly>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ClientOnly>
        </SessionProvider>
      </body>
    </html>
  )
}
