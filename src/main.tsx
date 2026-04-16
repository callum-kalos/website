import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import PhilosophyPage from './pages/PhilosophyPage'
import LocationPage from './pages/LocationPage'
import { ThemeProvider } from './hooks/useTheme'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/philosophy', element: <PhilosophyPage /> },
  { path: '/locations/:slug', element: <LocationPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
