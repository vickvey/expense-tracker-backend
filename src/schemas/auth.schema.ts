import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Invalid email format')
      .nonempty('Email is required'),
    password: z.string().nonempty('Password is required'),
  }),
});
