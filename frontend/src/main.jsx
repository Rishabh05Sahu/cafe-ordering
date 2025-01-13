import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StyledEngineProvider } from '@mui/material'
import { CartProvider } from './CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
    <CartProvider>
      <App />
    </CartProvider>
    </StyledEngineProvider>
  </StrictMode>,
)
