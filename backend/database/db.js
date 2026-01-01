import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

// Initialize database
export async function initializeDatabase() {
  const SQL = await initSqlJs();
  const dbPath = join(__dirname, 'zzz_characters.db');
  
  // Load existing database or create new one
  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
    console.log('Database loaded from file');
  } else {
    db = new SQL.Database();
    
    // Run schema
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
    db.exec(schema);
    
    // Save database to file
    saveDatabase();
    console.log('Database initialized successfully');
  }
}

// Save database to file
export function saveDatabase() {
  const dbPath = join(__dirname, 'zzz_characters.db');
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(dbPath, buffer);
}

// Get database instance
export function getDb() {
  return db;
}

export default { initializeDatabase, getDb, saveDatabase };
