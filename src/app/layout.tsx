import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '600', '800'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Creative Developer & Designer Portfolio',
  description: 'Portfolio of a Creative Developer and Digital Designer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  )
}
