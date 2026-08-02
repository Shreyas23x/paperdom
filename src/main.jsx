import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// NOTE: StrictMode is intentionally omitted. Its dev-only double-mount breaks
// framer-motion's useScroll({ target }) measurement (the scroll-linked card
// animation in ScrollShowcase), a known framer-motion + React 18 issue.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
