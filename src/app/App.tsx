import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

import ReactDOM from 'react-dom/client'

import '../assets/css/index.css'
import AppRouter from './AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>,
)
