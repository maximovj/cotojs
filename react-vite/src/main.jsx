import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './services/socketService.js';
import 'react-tippy/dist/tippy.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <App />
)
