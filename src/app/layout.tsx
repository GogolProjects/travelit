import {  Alkatra} from 'next/font/google'
import '@/src/style/globals.css'
import { cn } from '../lib/utils'
import Nav from '../components/Nav'
import { Toaster } from '../components/ui/Toaster'
import Providers from '../components/Providers'

export const metadata = {
  title: 'Travelit',
  description: 'A forum where we share our trip expiriance and hacks',
}

const alkatra = Alkatra ({
  subsets: ['latin'],
  weight: '400'
})

export default function RootLayout({
  children,
  authModal
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang="en" 
      className={cn(
        'bg-teal text-slate-900 antialiased light', 
        alkatra.className
      )}>
      <body className='min-h-screen pt-12 bg-lime-50 antialiased'>
        <Providers>
        <Nav/>
        {authModal}
        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div>
        <Toaster />
        </Providers>
      </body>
    </html>
  )
}
