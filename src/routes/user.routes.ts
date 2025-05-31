import { Router } from 'express';

const router = Router();

router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; // userRouter
