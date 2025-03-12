import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import ReactDOM from 'react-dom/client'

import '../assets/css/index.css'
import AppRouter from './AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
)
