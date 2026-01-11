import { getAuthDb } from '../database/db.js';

// Middleware untuk cek apakah user adalah admin
export function isAdmin(req, res, next) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(401).json({ error: 'Username dan password diperlukan' });
  }
  
  try {
    const db = getAuthDb();
    const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ? AND role = ?');
    stmt.bind([username, password, 'admin']);
    
    if (stmt.step()) {
      const user = stmt.getAsObject();
      req.user = user;
      stmt.free();
      next();
    } else {
      stmt.free();
      res.status(403).json({ error: 'Akses ditolak. Hanya admin yang dapat melakukan aksi ini.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Middleware untuk verifikasi login
export function authenticate(req, res, next) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(401).json({ error: 'Username dan password diperlukan' });
  }
  
  try {
    const db = getAuthDb();
    const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    stmt.bind([username, password]);
    
    if (stmt.step()) {
      const user = stmt.getAsObject();
      req.user = user;
      stmt.free();
      next();
    } else {
      stmt.free();
      res.status(401).json({ error: 'Username atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
