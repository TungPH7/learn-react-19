import { BrowserRouter, Route, Routes } from 'react-router'
import './global.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Homepage</div>} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
