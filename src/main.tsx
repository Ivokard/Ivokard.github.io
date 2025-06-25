import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import './utils/i18n'

const container = document.querySelector('#root')

if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(
    <App />
  )
} else {
  console.error("Root container not found")
}