import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


// import { registerSW } from "virtual:pwa-register";
import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
