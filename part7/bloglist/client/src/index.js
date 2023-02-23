import './app.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StateContextProvider } from './StateContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </QueryClientProvider>
  </Router>
)
