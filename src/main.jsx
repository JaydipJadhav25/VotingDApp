import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Web3Provider from './context/Web3Provider.jsx'

createRoot(document.getElementById('root')).render(
  <Web3Provider>
  <StrictMode>
    <App />
  </StrictMode>,
  </Web3Provider>
)
