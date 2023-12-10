import { Inter } from 'next/font/google'
import '../public/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { NavigationProvider } from '../components/NavigationContext'
import { CartProvider } from '@/components/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SuppStore',
  description: 'App for shopping',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-full">
        <NavigationProvider>
            <CartProvider>
            <Navbar />
            <main className="relative flex-grow overflow-hidden p-4">
              {children}
            </main>
            <Footer />
            </CartProvider>
        </NavigationProvider>
      </body>
    </html>
  )
}
