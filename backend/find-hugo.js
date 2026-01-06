import { getDb, initializeDatabase } from './database/db.js';

await initializeDatabase();
const db = getDb();

console.log('\n=== MENCARI HUGO ===');
const stmt = db.prepare('SELECT * FROM characters WHERE name = ?');
stmt.bind(['Hugo']);

if (stmt.step()) {
  console.log('✓ HUGO DITEMUKAN DI DATABASE:');
  console.log(stmt.getAsObject());
} else {
  console.log('✗ Hugo TIDAK ditemukan di database');
}
stmt.free();

console.log('\n=== SEMUA KARAKTER DI DATABASE ===');
const allStmt = db.prepare('SELECT id, name, role, tier FROM characters');
let count = 0;
while (allStmt.step()) {
  const char = allStmt.getAsObject();
  count++;
  console.log(`${count}. ${char.name} (${char.role}, Tier ${char.tier})`);
}
allStmt.free();

console.log(`\nTotal: ${count} karakter`);
process.exit(0);
