import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'X Viral Generator | Grow Your Following & Monetize',
  description: 'AI-powered viral post generator optimized for X algorithm. Grow followers, increase engagement, and monetize your content.',
  keywords: 'X, Twitter, viral posts, content creator, monetization, followers, engagement',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-x-black min-h-screen">
        {children}
      </body>
    </html>
  )
}
