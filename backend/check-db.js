import { getDb } from './database/db.js';

await import('./database/db.js').then(async (module) => {
  await module.initializeDatabase();
  
  const db = getDb();
  
  console.log('\n=== USERS TABLE ===');
  const usersStmt = db.prepare('SELECT * FROM users');
  while (usersStmt.step()) {
    const user = usersStmt.getAsObject();
    console.log(user);
  }
  usersStmt.free();
  
  console.log('\n=== CHARACTERS TABLE ===');
  const charsStmt = db.prepare('SELECT id, name, role, tier FROM characters');
  while (charsStmt.step()) {
    const char = charsStmt.getAsObject();
    console.log(char);
  }
  charsStmt.free();
  
  process.exit(0);
});
