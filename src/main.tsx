import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App'

const container = document.querySelector('#root')

if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(<App />)
} else {
  console.error("Root container not found")
}