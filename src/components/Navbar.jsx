import maluImage from '/pictures/malu_tuh.jpg'

function Navbar({ onNavigate, onAdminClick }) {
  return (
    <nav style={navStyle}>
      <img src={maluImage} alt="Malu" style={maluImageStyle} />
      <button style={buttonStyle} onClick={() => onNavigate('home')}>
        Home
      </button>
      <button style={buttonStyle} onClick={() => onNavigate('about')}>
        About
      </button>
      <button style={adminButtonStyle} onClick={onAdminClick}>
        Admin Panel
      </button>
    </nav>
  )
}

const navStyle = {
  backgroundColor: '#808080',
  height: '100vh',
  width: '150px',
  position: 'fixed',
  top: 0,
  left: 0,
  padding: '20px'
}

const maluImageStyle = {
  width: '100%',
  padding: '10px'
}

const buttonStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  backgroundColor: '#031403ff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
}

const adminButtonStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '20px',
  backgroundColor: '#ff6b35',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold'
}


export default Navbar