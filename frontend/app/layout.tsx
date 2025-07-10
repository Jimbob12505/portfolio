import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

const junicode = localFont({
  src: [
    {
      path: '../public/fonts/Junicode.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Junicode-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-junicode',
})

export const metadata: Metadata = {
  title: 'Portfolio - Personal Website',
  description: 'Personal portfolio website showcasing projects and blog posts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${junicode.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 