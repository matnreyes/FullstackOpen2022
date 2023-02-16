import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './QueryApp'
import { NotificationContextProvider } from './NotificationContext'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)
