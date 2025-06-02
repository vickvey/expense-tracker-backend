import { NextFunction, Response } from 'express';
import argon2 from 'argon2';
import { User } from '../models/user.model';
import { ApiResponse } from '../lib/apiResponse';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AuthRequest, RegisterInput, LoginInput } from '../types';

const registerUser = async (
  req: AuthRequest, // Use AuthRequest for consistency
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body as RegisterInput;
  if (!name || !email || !password) {
    return ApiResponse.error(res, 'Missing required fields', 400);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(
        res,
        `User with email ${existingUser.email} already exists`,
        409,
      );
    }

    const hashPassword = await argon2.hash(password);
    const createdUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // TODO: Implement logger.middleware.ts
    console.log(`[CREATE]: User created successfully - ${createdUser._id}`);

    return ApiResponse.success(res, 201, 'User registered successfully!', {
      id: createdUser._id.toString(),
      name: createdUser.name,
      email: createdUser.email,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (
  req: AuthRequest, // Use AuthRequest for consistency
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body as LoginInput;
  if (!email || !password) {
    return ApiResponse.error(res, 'Missing required fields', 400);
  }

  try {
    // Find user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return ApiResponse.error(res, `User with email: ${email} not found`, 404);
    }

    // Verify password
    const isPasswordMatch = await argon2.verify(
      existingUser.password,
      password,
    );
    if (!isPasswordMatch) {
      return ApiResponse.error(res, 'Invalid credentials', 401);
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: existingUser._id.toString() },
      env.JWT_SECRET,
      { expiresIn: '1h' }, // TODO: Fix this '1h' to use env variable JWT_EXPIRES_IN
    );

    // TODO: implement good logging in logger.middleware.ts
    console.log(`[LOGIN]: User logged in - ${existingUser._id}`);

    return ApiResponse.success(res, 200, 'Login successful', { token });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
