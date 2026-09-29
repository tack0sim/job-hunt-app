import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pipeline — Job Hunt Manager",
  description: "A focused workspace for tracking companies, roles, and applications.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
