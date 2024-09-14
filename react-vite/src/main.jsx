import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './services/socketService.js';

createRoot(document.getElementById('root')).render(
  <App />
)
