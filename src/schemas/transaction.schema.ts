import { z } from 'zod';

export const createTransactionSchema = z.object({
  body: z.object({
    amount: z
      .number()
      .positive('Amount must be positive')
      .finite('Amount must be a valid number'),
    type: z.enum(['Income', 'Expense'], {
      message: 'Type must be Income or Expense',
    }),
    description: z.string().optional(),
    currency: z.enum(['INR', 'USD', 'EUR'], {
      message: 'Currency is required',
    }),
    date: z.string().datetime('Invalid date format').or(z.date()).optional(),
    category: z.string().min(1, 'Category ID is required'),
  }),
});

export const updateTransactionSchema = z.object({
  body: z.object({
    amount: z
      .number()
      .positive('Amount must be positive')
      .finite('Amount must be a valid number')
      .optional(),
    type: z
      .enum(['Income', 'Expense'], {
        message: 'Type must be Income or Expense',
      })
      .optional(),
    description: z.string().optional(),
    currency: z
      .enum(['INR', 'USD', 'EUR'], {
        message: 'Currency is required',
      })
      .optional(),
    date: z.string().datetime('Invalid date format').or(z.date()).optional(),
    category: z.string().min(1, 'Category ID is required').optional(),
  }),
});
