import { NextFunction, Request, Response } from 'express';
import argon2 from "argon2"
import { User } from '../models/user.model';
import { ApiResponse } from '../lib/apiResponse';
import { CustomError } from '../lib/customError';
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env';

interface AuthenticatedRequest extends Request {
  userId: string
}

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const {name, email, password} = req.body;
  try {
    const hashPassword = argon2.hash(password, {salt: 10});
    const createdUser = await User.create({name, email, password: hashPassword})
    if(!createdUser) throw new CustomError('Error Creating User', 409);
    console.log(`[CREATE]: User created successfully - `, createdUser);
    return ApiResponse.success(res, 201, 'User registered successfully!', createdUser);
  } catch (error) {
    next(error)
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  try {
    const existingUser = await User.findOne({email});
    if(!existingUser) throw new CustomError('User not found', 404);
    const isPasswordMatch = argon2.verify(existingUser.password, password);
    if(!isPasswordMatch) throw new CustomError("Password not match", 401);
    // Create jwt token
    const token = jwt.sign({userId: existingUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
    return token;
  } catch (error) {
    next(error);
  }
}

export {registerUser, loginUser};

