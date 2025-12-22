import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/tierlist'
import Background from './components/background'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <Background page={currentPage}>
      <Navbar onNavigate={setCurrentPage} />

      <div style={{ marginLeft: '170px', padding: '20px' }}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'about' && <About />}
      </div>
    </Background>
  )
}

export default App