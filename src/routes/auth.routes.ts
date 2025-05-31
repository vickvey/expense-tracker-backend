import { Router } from 'express';

const router = Router();

router.post('/sign-up', registerUser);
router.post('/sign-in', loginUser);
router.post('/sign-up', logoutUser);

export default router; // authRouter
