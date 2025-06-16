// src/routes/user.routes.ts
import { Router } from 'express';
// import {
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
// } from '@/controllers/user.controller';

const router = Router();

// Self-service for authenticated users
// TODO: Complete all this
router.get('/me', getUserProfile); // GET /api/v1/user/me
router.put('/me', updateUserProfile); // PUT /api/v1/user/me
router.post('/change-password', changePassword); // POST /api/v1/user/change-password

export default router;
