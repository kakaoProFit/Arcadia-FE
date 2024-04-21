import '../styles/globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from '@/styles/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
        <body>
          <header>
            <Header />
          </header>
          {children}
          <footer>
            <Footer />
          </footer>
        </body>
      </ThemeProvider>
    </html>
  )
}
