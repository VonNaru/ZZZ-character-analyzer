import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database/db.js';
import characterRoutes from './routes/characters.js';
import tierListRoutes from './routes/tierLists.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
await initializeDatabase();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'ZZZ Character Analyzer API' });
});

app.use('/api/characters', characterRoutes);
app.use('/api/tierlists', tierListRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET    http://localhost:${PORT}/api/characters`);
  console.log(`  GET    http://localhost:${PORT}/api/characters/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/characters`);
  console.log(`  PUT    http://localhost:${PORT}/api/characters/:id`);
  console.log(`  DELETE http://localhost:${PORT}/api/characters/:id`);
  console.log(`  GET    http://localhost:${PORT}/api/tierlists`);
  console.log(`  GET    http://localhost:${PORT}/api/tierlists/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/tierlists`);
  console.log(`  PUT    http://localhost:${PORT}/api/tierlists/:id`);
  console.log(`  DELETE http://localhost:${PORT}/api/tierlists/:id`);
});
