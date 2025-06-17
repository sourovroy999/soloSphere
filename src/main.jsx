import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './Routes/Routes.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import {Toaster} from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient= new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

    <QueryClientProvider client={queryClient}>
         <RouterProvider router={router}/>
           <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <Toaster/>
    </AuthProvider>
  </StrictMode>,
)
