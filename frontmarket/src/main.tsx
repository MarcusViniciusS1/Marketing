import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppRoutes from './route'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  </StrictMode>,
)
