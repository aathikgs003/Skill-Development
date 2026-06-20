import express from 'express';
import {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
} from '../../controllers/master/board.controller.js';
import protect from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createBoard)
  .get(protect, getAllBoards);

router.route('/:id')
  .get(protect, getBoardById)
  .put(protect, updateBoard)
  .delete(protect, deleteBoard);

export default router;
