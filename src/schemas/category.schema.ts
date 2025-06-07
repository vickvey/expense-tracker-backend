import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().nonempty('Category Name is required'),
    description: z.string().optional(),
    color: z.string().nonempty('Give the category a color, man!'),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().optional(),
    color: z.string().optional(),
  }),
});
