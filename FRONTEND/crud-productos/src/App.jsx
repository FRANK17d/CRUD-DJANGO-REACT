import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import ProductList from "./components/ProductList"
import ProductForm from "./components/ProductForm"
import Header from "./components/Header"
import theme from "./theme"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList/>} />
            <Route path="/nuevo-producto" element={<ProductForm/>}/>
            <Route path="/editar-producto/:id" element={<ProductForm/>}/>
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: 'white',
                },
              },
            }}
          />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
