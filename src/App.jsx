import { Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing.jsx'
import Username from'./pages/Username.jsx'
import Home from './pages/Home.jsx'
import './index.css'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<Username />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
