import { useState } from 'react';

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  panel: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    borderRadius: '15px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '30px',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '5px 10px',
    transition: 'color 0.3s'
  },
  h2: {
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '28px'
  },
  h3: {
    color: '#fff',
    marginBottom: '15px',
    fontSize: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    color: '#aaa',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    padding: '10px',
    border: '1px solid #333',
    borderRadius: '8px',
    backgroundColor: '#0f0f1e',
    color: '#fff',
    fontSize: '14px',
    transition: 'border-color 0.3s'
  },
  select: {
    padding: '10px',
    border: '1px solid #333',
    borderRadius: '8px',
    backgroundColor: '#0f0f1e',
    color: '#fff',
    fontSize: '14px',
    transition: 'border-color 0.3s'
  },
  button: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '10px'
  },
  errorMessage: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    border: '1px solid #ff4444',
    color: '#ff6666',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px'
  },
  hint: {
    textAlign: 'center',
    marginTop: '10px'
  },
  hintText: {
    color: '#666',
    fontStyle: 'italic'
  },
  imagePreview: {
    margin: '10px 0',
    textAlign: 'center'
  },
  previewImg: {
    maxWidth: '150px',
    maxHeight: '150px',
    borderRadius: '8px',
    border: '2px solid #333'
  }
};

export default function AdminPanel({ onClose, onCharacterAdded, user }) {
  const [error, setError] = useState('');
  
  // Check if user is admin
  const isAdmin = user && user.role === 'admin';
  
  // Form state untuk karakter baru
  const [characterForm, setCharacterForm] = useState({
    name: '',
    element: '',
    rarity: 5,
    role: 'Attacker',
    tier: 'T0',
    image_url: ''
  });

  const handleAddCharacter = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isAdmin) {
      setError('Anda tidak memiliki akses admin');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...characterForm,
          username: user.username,
          password: 'dummy' // You might want to use token-based auth instead
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Karakter berhasil ditambahkan!');
        setCharacterForm({
          name: '',
          element: '',
          rarity: 5,
          role: 'Attacker',
          tier: 'T0',
          image_url: ''
        });
        
        // Notify parent component untuk refresh
        if (onCharacterAdded) {
          onCharacterAdded();
        }
        
        // Tutup panel setelah 1 detik
        setTimeout(() => {
          if (onClose) onClose();
        }, 1000);
      } else {
        setError(data.error || 'Gagal menambahkan karakter');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menambahkan karakter');
      console.error(err);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <button 
          style={styles.closeButton} 
          onClick={onClose}
          onMouseEnter={(e) => e.target.style.color = '#ff4444'}
          onMouseLeave={(e) => e.target.style.color = '#fff'}
        >
          x
        </button>
        
        <h2 style={styles.h2}>Admin Panel</h2>
        
        {!user ? (
          <div style={styles.errorMessage}>
            Silakan login terlebih dahulu untuk mengakses panel ini.
          </div>
        ) : !isAdmin ? (
          <div style={styles.errorMessage}>
            Akses ditolak. Hanya admin yang dapat menambah karakter.
            <br /><br />
            <small>Login sebagai: <strong>{user.username}</strong> ({user.role})</small>
          </div>
        ) : (
          <div>
            <h3 style={styles.h3}>Tambah Karakter Baru</h3>
            <div style={{ color: '#aaa', marginBottom: '15px', fontSize: '14px' }}>
              Login sebagai: <strong style={{ color: '#667eea' }}>{user.username}</strong> (Admin)
            </div>
            
            {error && <div style={styles.errorMessage}>{error}</div>}
            
            <form onSubmit={handleAddCharacter} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nama Karakter:</label>
                <input
                  type="text"
                  value={characterForm.name}
                  onChange={(e) => setCharacterForm({...characterForm, name: e.target.value})}
                  required
                  placeholder="Contoh: Ellen Joe"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Element:</label>
                <input
                  type="text"
                  value={characterForm.element}
                  onChange={(e) => setCharacterForm({...characterForm, element: e.target.value})}
                  placeholder="Contoh: Ice (opsional)"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Rarity:</label>
                <select
                  value={characterForm.rarity}
                  onChange={(e) => setCharacterForm({...characterForm, rarity: parseInt(e.target.value)})}
                  style={styles.select}
                  onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                >
                  <option value="5">5 Star</option>
                  <option value="4">4 Star</option>
                  <option value="3">3 Star</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Role:</label>
                <select
                  value={characterForm.role}
                  onChange={(e) => setCharacterForm({...characterForm, role: e.target.value})}
                  style={styles.select}
                  onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                >
                  <option value="Attacker">Attacker</option>
                  <option value="Stun">Stun</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Tier:</label>
                <select
                  value={characterForm.tier}
                  onChange={(e) => setCharacterForm({...characterForm, tier: e.target.value})}
                  style={styles.select}
                  onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                >
                  <option value="T0">T0</option>
                  <option value="T0.5">T0.5</option>
                  <option value="T1">T1</option>
                  <option value="T1.5">T1.5</option>
                  <option value="T2">T2</option>
                  <option value="T3">T3</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Image URL:</label>
                <input
                  type="text"
                  value={characterForm.image_url}
                  onChange={(e) => setCharacterForm({...characterForm, image_url: e.target.value})}
                  placeholder="URL gambar karakter"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                />
              </div>
              
              {characterForm.image_url && (
                <div style={styles.imagePreview}>
                  <img src={characterForm.image_url} alt="Preview" style={styles.previewImg} />
                </div>
              )}
              
              <button 
                type="submit" 
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Tambah Karakter
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
