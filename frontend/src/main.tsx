import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext"
import { UserFlowProvider } from "./context/UserFlowContext"

import { BrowserRouter as Router } from "react-router-dom"
import './index.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider >
        <EventProvider >
          <UserFlowProvider>
            <App />
          </UserFlowProvider>
        </EventProvider >
      </AuthProvider >
    </Router>
  </StrictMode>,
)
