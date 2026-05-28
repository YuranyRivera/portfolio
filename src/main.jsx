/**
 * main.jsx
 * Punto de entrada de la aplicación.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/globals.css'
import App from './App'

// Skip link accesible
const skipLinkStyle = document.createElement('style')
skipLinkStyle.textContent = `
  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    background: #7c3aed;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0 0 8px 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    z-index: 9999;
    transition: top 0.2s;
    text-decoration: none;
  }
  .skip-link:focus {
    top: 0;
    outline: 2px solid #c4b5fd;
    outline-offset: 2px;
  }
`
document.head.appendChild(skipLinkStyle)

const container = document.getElementById('root')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)
