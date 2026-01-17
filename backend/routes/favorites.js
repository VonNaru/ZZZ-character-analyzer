import express from 'express';
import { 
  getUserFavorites, 
  addFavorite, 
  updateFavorite, 
  removeFavorite 
} from '../controllers/favoritesController.js';

const router = express.Router();

// Get user's favorites
router.get('/', getUserFavorites);

// Add to favorites
router.post('/', addFavorite);

// Update favorite
router.put('/:id', updateFavorite);

// Remove from favorites
router.delete('/:id', removeFavorite);

export default router;
