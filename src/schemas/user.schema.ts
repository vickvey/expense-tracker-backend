import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Full Name must be at least 3 characters')
      .nonempty('Full name is required'),
    email: z
      .string()
      .email('Invalid email format')
      .nonempty('Email is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .nonempty('Password is required'),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').optional(),
    name: z
      .string()
      .min(3, 'Full name must be at least 3 characters')
      .optional(),
  }),
});
