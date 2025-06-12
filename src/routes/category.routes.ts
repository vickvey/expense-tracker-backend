import { Router } from 'express';
import {
  createCategoryByUser,
  deleteCategoryByUser,
  getAllCategoriesByUser,
  getCategoryByUser,
  updateCategoryByUser,
} from '@/controllers/category.controller';
import validate from '@/middleware/validate';
import {
  createCategorySchema,
  updateCategorySchema,
} from '@/schemas/category.schema';

const router = Router();

router.get('/', getAllCategoriesByUser);

router.get('/:id', getCategoryByUser);

router.post('/', validate(createCategorySchema), createCategoryByUser);

router.put('/:id', validate(updateCategorySchema), updateCategoryByUser);

router.delete('/:id', deleteCategoryByUser);

export default router; // categoryRouter
