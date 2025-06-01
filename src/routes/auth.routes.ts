import { Router } from 'express';
import validate from '../middleware/validate';
import { createUserSchema } from '../schemas/user.schema';
import { ApiResponse } from '../lib/apiResponse';
// import { loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/sign-up', validate(createUserSchema), (req, res) => {
  return ApiResponse.success(
    res,
    201,
    'User Registered Successfully :)',
    req.body,
  );
});

// router.post('/sign-up', validate(createUserSchema), registerUser);
// router.post('/sign-in', validate(loginSchema), loginUser);
// router.post('/sign-up', logoutUser);

export default router; // authRouter
