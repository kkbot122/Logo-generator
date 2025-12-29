import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aura: AI Logo Maker',
  description: 'Design intelligence for your brand.',
  // ADD THIS SECTION
  icons: {
    icon: '/aura_logo.png', // The path to your image in the public folder
    apple: '/aura_logo.png', // Optional: for iPhone home screen shortcuts
  },
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