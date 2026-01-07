import { useState } from 'react'
import Header from './components/Header'
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
      <Header onAdminClick={handleAdminClick} />
      <Navbar onNavigate={setCurrentPage} />

      <div style={{ marginLeft: '170px', marginTop: '80px', padding: '20px' }}>
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