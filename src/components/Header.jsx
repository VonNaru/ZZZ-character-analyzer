const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#0a1929',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    zIndex: 999,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
  },
  logo: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoIcon: {
    fontSize: '28px'
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  adminButton: {
    padding: '8px 20px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  }
};

export default function Header({ onAdminClick }) {
  return (
    <div style={styles.header}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🎮</span>
        <span>ZZZ Character Analyzer</span>
      </div>
      
      <div style={styles.buttons}>
        <button 
          style={styles.adminButton}
          onClick={onAdminClick}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#5568d3';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#667eea';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Admin Panel
        </button>
      </div>
    </div>
  );
}
