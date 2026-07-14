import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nirav Borde — Creative Developer & Designer',
  description: 'Portfolio of Nirav Borde — a creative developer building AI-powered apps, web experiences, and full-stack systems.',
  openGraph: {
    title: 'Nirav Borde — Creative Developer & Designer',
    description: 'Portfolio of Nirav Borde — a creative developer building AI-powered apps, web experiences, and full-stack systems.',
    url: 'https://portfolio-sigma-navy-57.vercel.app',
    siteName: 'Nirav Borde Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nirav Borde — Creative Developer & Designer',
    description: 'Portfolio of Nirav Borde — a creative developer building AI-powered apps, web experiences, and full-stack systems.',
  },
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
