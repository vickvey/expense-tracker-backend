import { Router } from 'express';
import validate from '../middleware/validate';
import { createUserSchema } from '@/schemas/user.schema';
import { loginSchema } from '@/schemas/auth.schema';
import { registerUser, loginUser } from '@/controllers/auth.controller';

const router = Router();

router.post('/sign-up', validate(createUserSchema), registerUser);

router.post('/sign-in', validate(loginSchema), loginUser);

// router.post('/sign-up', logoutUser);

export default router; // authRouter
