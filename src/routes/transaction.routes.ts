import { Router } from 'express';

const router = Router();

router.get('/', getAllCaTransactionsByUser);

router.get('/:id', getTransactionByUser);

router.post('/', createTransactionByUser);

router.put('/:id', updateTransactionByUser);

router.delete('/:id', deleteTransactionByUser);

export default router; // transactionRouter
