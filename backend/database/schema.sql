-- Characters table
CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    element TEXT,
    rarity INTEGER,
    role TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tier lists table
CREATE TABLE IF NOT EXISTS tier_lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tier list items table
CREATE TABLE IF NOT EXISTS tier_list_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tier_list_id INTEGER,
    character_id INTEGER,
    tier TEXT NOT NULL,
    FOREIGN KEY (tier_list_id) REFERENCES tier_lists(id),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id INTEGER,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    review TEXT,
    user_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

-- Insert sample characters
INSERT INTO characters (name, element, rarity, role, image_url) VALUES
('Jane Doe', NULL, 5, 'Attacker', 'https://img.game8.co/4372195/ea916a2155290708a65bdec8dba028ce.png/show'),
('Yixuan', NULL, 5, 'Attacker', 'https://img.game8.co/4178829/017e13743c4762e07e0df875888bf56b.png/show'),
('Miyabi', NULL, 5, 'Attacker', 'https://img.game8.co/4059078/d955d184a5e8c2a1841d0f9723a19da0.png/show'),
('Astra Yao', NULL, 5, 'Support', 'https://img.game8.co/4080088/fa217d0eba80ff3a1694f354d33cc12e.png/show'),
('Yuzuha', NULL, 5, 'Support', 'https://img.game8.co/4212687/46603f907c8d4befa538f9bb94dd22d4.png/show'),
('Lucia', NULL, 5, 'Support', 'https://img.game8.co/4303634/f8acab2bfbfc82495f4afd63269347a8.png/show');
