import { getDb, saveDatabase } from '../database/db.js';

// Helper function to execute SELECT queries
function executeQuery(query, params = []) {
  const db = getDb();
  const stmt = db.prepare(query);
  if (params.length > 0) {
    stmt.bind(params);
  }
  
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// Helper function to execute INSERT/UPDATE/DELETE
function executeUpdate(query, params = []) {
  const db = getDb();
  db.run(query, params);
  saveDatabase();
}

// Get all characters
export function getAllCharacters(req, res) {
  try {
    const characters = executeQuery('SELECT * FROM characters ORDER BY rarity DESC, name');
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get character by ID
export function getCharacterById(req, res) {
  try {
    const { id } = req.params;
    const characters = executeQuery('SELECT * FROM characters WHERE id = ?', [id]);
    
    if (characters.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    res.json(characters[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add new character
export function addCharacter(req, res) {
  try {
    const { name, element, rarity, role, tier, image_url } = req.body;
    
    executeUpdate(
      'INSERT INTO characters (name, element, rarity, role, tier, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, element, rarity, role, tier || 'T3', image_url]
    );
    
    const lastId = executeQuery('SELECT last_insert_rowid() as id')[0].id;
    
    res.status(201).json({ 
      id: lastId,
      message: 'Character added successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update character
export function updateCharacter(req, res) {
  try {
    const { id } = req.params;
    const { name, element, rarity, role, tier, image_url } = req.body;
    
    executeUpdate(
      'UPDATE characters SET name = ?, element = ?, rarity = ?, role = ?, tier = ?, image_url = ? WHERE id = ?',
      [name, element, rarity, role, tier, image_url, id]
    );
    
    res.json({ message: 'Character updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete character
export function deleteCharacter(req, res) {
  try {
    const { id } = req.params;
    
    executeUpdate('DELETE FROM characters WHERE id = ?', [id]);
    
    res.json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get character ratings
export function getCharacterRatings(req, res) {
  try {
    const { id } = req.params;
    
    const ratings = executeQuery(
      'SELECT * FROM ratings WHERE character_id = ? ORDER BY created_at DESC',
      [id]
    );
    
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Add rating to character
export function addRating(req, res) {
  try {
    const { id } = req.params;
    const { rating, review, user_name } = req.body;
    
    executeUpdate(
      'INSERT INTO ratings (character_id, rating, review, user_name) VALUES (?, ?, ?, ?)',
      [id, rating, review, user_name]
    );
    
    const lastId = executeQuery('SELECT last_insert_rowid() as id')[0].id;
    
    res.status(201).json({ 
      id: lastId,
      message: 'Rating added successfully' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
