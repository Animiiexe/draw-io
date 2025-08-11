import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: "Draw.io - Real-Time Collaborative Whiteboard",
  description: "Sketch and collaborate online in real-time with Draw.io.",
  keywords: ["collaborative drawing", "online whiteboard", "real-time sketch"],
  authors: [{ name: "Animiiexe" }],
    icons: {
    icon: "/icon.ico", // 16x16 or 32x32 favicon
    shortcut: "/icon.ico", // optional
    apple: "/icon.ico", // optional for iOS homescreen
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
