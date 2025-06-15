import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Routes.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import Toaster from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

    <RouterProvider router={router}/>
    </AuthProvider>
    <Toaster/>
  </StrictMode>,
)
