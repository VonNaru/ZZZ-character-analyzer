import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/tierlist'
import Background from './components/background'
import AdminPanel from './components/AdminPanel'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAdminClick = () => {
    setShowAdminPanel(true)
  }

  const handleCloseAdmin = () => {
    setShowAdminPanel(false)
  }

  const handleCharacterAdded = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <Background page={currentPage}>
      <Navbar onNavigate={setCurrentPage} onAdminClick={handleAdminClick} />

      <div style={{ marginLeft: '170px', padding: '20px' }}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'about' && <About key={refreshTrigger} />}
      </div>

      {showAdminPanel && (
        <AdminPanel 
          onClose={handleCloseAdmin} 
          onCharacterAdded={handleCharacterAdded}
        />
      )}
    </Background>
  )
}

export default App