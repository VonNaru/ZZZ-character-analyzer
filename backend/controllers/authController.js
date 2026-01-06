import { getDb } from '../database/db.js';

// Login user
export function login(req, res) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password diperlukan' });
  }
  
  try {
    const db = getDb();
    const stmt = db.prepare('SELECT id, username, role FROM users WHERE username = ? AND password = ?');
    stmt.bind([username, password]);
    
    if (stmt.step()) {
      const user = stmt.getAsObject();
      stmt.free();
      res.json({ 
        success: true, 
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } else {
      stmt.free();
      res.status(401).json({ error: 'Username atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Check if user is admin
export function checkAdmin(req, res) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password diperlukan' });
  }
  
  try {
    const db = getDb();
    const stmt = db.prepare('SELECT role FROM users WHERE username = ? AND password = ?');
    stmt.bind([username, password]);
    
    if (stmt.step()) {
      const user = stmt.getAsObject();
      stmt.free();
      res.json({ isAdmin: user.role === 'admin' });
    } else {
      stmt.free();
      res.status(401).json({ error: 'Username atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
