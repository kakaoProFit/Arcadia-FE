import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from '@/styles/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ThemeModeScript } from 'flowbite-react'

import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

export const metadata = {
  title: 'Arcadia',
  description: '심리적으로 지친 이들을 위한 유토피아',
  icons: {
    icon: '/images/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <ThemeModeScript />
          <Link
            href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-white">
          <header>
            <Header />
          </header>
          {children}
          <footer>
            <Footer />
          </footer>
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
            strategy="beforeInteractive"
          />
        </body>
      </ThemeProvider>
    </html>
  )
}
