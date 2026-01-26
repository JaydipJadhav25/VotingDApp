import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Web3Provider from './context/Web3Provider.jsx'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')).render(
  <Web3Provider>
    <App />
    <Toaster/>
  </Web3Provider>
)
