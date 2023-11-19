import { Inter } from 'next/font/google'
import '../style/globals.css'
import { cn } from '../lib/utils'
import Nav from '../components/Nav'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Travelit',
  description: 'A forum where we share our trip expiriance and hacks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" 
    className={cn(
      'bg-white text-slate-900 antialiased light', 
      inter.className)}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <Nav/>
        <div className='conatiner max-w-7xl mx-auto h-full pt-12'>{children}</div>
        </body>
    </html>
  )
}
