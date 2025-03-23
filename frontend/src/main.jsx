import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Question from './Components/MockTest/Quesion.jsx'
import OneTest from './Testing/OneTest.jsx'
import Quiz from './Components/Quiz.jsx/Quiz.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <App/>
  </StrictMode>,
)
