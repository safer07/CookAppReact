import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { SpeedInsights } from '@vercel/speed-insights/react'
import ReactDOM from 'react-dom/client'

import '../assets/css/index.css'
import AppRouter from './AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRouter />
      <SpeedInsights />
    </BrowserRouter>
  </React.StrictMode>,
)
