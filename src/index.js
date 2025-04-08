import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './components/Cart/CartContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <CartProvider>
            <App />
        </CartProvider>
    </BrowserRouter>
)