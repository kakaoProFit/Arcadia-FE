import '../styles/globals.css'
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
        <head>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
            rel="stylesheet"
          />
        </head>
        <body className="bg-white">
          <header>
            <Header />
          </header>
          {children}
          <footer>
            <Footer />
          </footer>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"
            async
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"
            async
          />
        </body>
      </ThemeProvider>
    </html>
  )
}
