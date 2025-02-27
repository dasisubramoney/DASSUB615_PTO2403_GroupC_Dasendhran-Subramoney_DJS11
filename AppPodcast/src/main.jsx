import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AudioProvider } from './components/Layout/AudioContext.jsx'

createRoot(document.getElementById('root')).render(
  <AudioProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AudioProvider>,
)
