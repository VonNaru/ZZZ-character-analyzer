import { getDb, saveDatabase } from '../database/db.js';

// Get all favorites for a user
export const getUserFavorites = (req, res) => {
  try {
    const userId = req.query.userId || req.body.userId;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const db = getDb();
    const query = `
      SELECT 
        f.id,
        f.user_id,
        f.character_id,
        f.custom_tier,
        f.notes,
        f.created_at,
        c.name,
        c.element,
        c.rarity,
        c.role,
        c.tier as original_tier,
        c.image_url
      FROM favorites f
      JOIN characters c ON f.character_id = c.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `;

    const stmt = db.prepare(query);
    stmt.bind([userId]);
    
    const favorites = [];
    while (stmt.step()) {
      const row = stmt.getAsObject();
      favorites.push(row);
    }
    stmt.free();

    res.json(favorites);
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ error: 'Failed to get favorites' });
  }
};

// Add character to favorites
export const addFavorite = (req, res) => {
  try {
    const { userId, characterId, customTier, notes } = req.body;

    if (!userId || !characterId || !customTier) {
      return res.status(400).json({ 
        error: 'User ID, Character ID, and Custom Tier are required' 
      });
    }

    const db = getDb();

    // Check if already in favorites
    const checkStmt = db.prepare(
      'SELECT id FROM favorites WHERE user_id = ? AND character_id = ?'
    );
    checkStmt.bind([userId, characterId]);
    
    if (checkStmt.step()) {
      checkStmt.free();
      return res.status(400).json({ error: 'Character already in favorites' });
    }
    checkStmt.free();

    // Insert favorite
    const insertStmt = db.prepare(`
      INSERT INTO favorites (user_id, character_id, custom_tier, notes)
      VALUES (?, ?, ?, ?)
    `);
    insertStmt.bind([userId, characterId, customTier, notes || null]);
    insertStmt.step();
    insertStmt.free();

    saveDatabase();

    res.status(201).json({ 
      message: 'Character added to favorites',
      favoriteId: db.exec('SELECT last_insert_rowid()')[0].values[0][0]
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

// Update favorite (tier or notes)
export const updateFavorite = (req, res) => {
  try {
    const { id } = req.params;
    const { customTier, notes } = req.body;

    if (!customTier) {
      return res.status(400).json({ error: 'Custom tier is required' });
    }

    const db = getDb();
    const stmt = db.prepare(`
      UPDATE favorites 
      SET custom_tier = ?, notes = ?
      WHERE id = ?
    `);
    stmt.bind([customTier, notes || null, id]);
    stmt.step();
    stmt.free();

    saveDatabase();

    res.json({ message: 'Favorite updated successfully' });
  } catch (error) {
    console.error('Error updating favorite:', error);
    res.status(500).json({ error: 'Failed to update favorite' });
  }
};

// Remove from favorites
export const removeFavorite = (req, res) => {
  try {
    const { id } = req.params;

    const db = getDb();
    const stmt = db.prepare('DELETE FROM favorites WHERE id = ?');
    stmt.bind([id]);
    stmt.step();
    stmt.free();

    saveDatabase();

    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};
