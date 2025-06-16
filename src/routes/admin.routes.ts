// src/routes/admin.routes.ts
import { Router } from 'express';
// import {
//   getAllUsers,
//   getUserById,
//   updateUserById,
//   deleteUserById,
// } from '@/controllers/admin/user.controller';

const router = Router();

// Admin-only user management
// TODO: Complete all this
router.get('/users', getAllUsers); // GET /api/v1/admin/users
router.get('/users/:id', getUserById); // GET /api/v1/admin/users/:id
router.put('/users/:id', updateUserById); // PUT /api/v1/admin/users/:id
router.delete('/users/:id', deleteUserById); // DELETE /api/v1/admin/users/:id

export default router;
