import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Logo Architect',
  description: 'Design intelligence for your brand.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F3F2ED] text-black antialiased selection:bg-black selection:text-[#F3F2ED]`}>
        {children}
      </body>
    </html>
  )
}