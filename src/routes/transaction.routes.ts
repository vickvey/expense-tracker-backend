import { Router } from 'express';
import {
  createTransactionByUser,
  deleteTransactionByUser,
  getAllTransactionsByUser,
  getTransactionByUser,
  updateTransactionByUser,
} from '../controllers/transaction.controller';
import {
  createTransactionSchema,
  updateTransactionSchema,
} from '../schemas/transaction.schema';
import validate from '../middleware/validate';

const router = Router();

router.get('/', getAllTransactionsByUser);

router.get('/:id', getTransactionByUser);

router.post('/', validate(createTransactionSchema), createTransactionByUser);

router.put('/:id', validate(updateTransactionSchema), updateTransactionByUser);

router.delete('/:id', deleteTransactionByUser);

export default router; // transactionRouter
