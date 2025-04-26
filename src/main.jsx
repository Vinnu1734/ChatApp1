import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChatAppProvider } from "../Context/ChatAppContext.jsx"

createRoot(document.getElementById("root")).render(
  <ChatAppProvider>
    <App />
  </ChatAppProvider>
)
