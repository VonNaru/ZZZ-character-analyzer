import express from 'express';
import {
  getAllCharacters,
  getCharacterById,
  addCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacterRatings,
  addRating
} from '../controllers/characterController.js';

const router = express.Router();

router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.post('/', addCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);
router.get('/:id/ratings', getCharacterRatings);
router.post('/:id/ratings', addRating);

export default router;
