import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { ApiResponse } from '../lib/apiResponse';
import { Category } from '../models/category.model';

const getAllCategoriesByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await Category.find({
      user: req.user?.id,
    });
    return ApiResponse.success(
      res,
      200,
      `Fetched all categories by User: ${req.user?.id}`,
      categories,
    );
  } catch (error) {
    next(error);
  }
};

const getCategoryByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await Category.findOne({
      user: req.user?.id,
      _id: req.params?.id,
    });
    if (!category) {
      console.log(`[INFO]: Category with _id: ${req.params?.id} not found`);
      return ApiResponse.error(res, 404, 'Category not found');
    }

    console.log(
      `[INFO]: Fetched category data for User: ${req.user?.id} - ${JSON.stringify(category)}`,
    );
    return ApiResponse.success(res, 200, 'Fetched category for user', category);
  } catch (error) {
    next(error);
  }
};

const createCategoryByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Create here
    const existingCategory = await Category.findOne({
      user: req.user?.id,
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
    });
    if (existingCategory) {
      return ApiResponse.error(
        res,
        409,
        'Category already exists',
        existingCategory,
      );
    }

    // Create new category
    const newCategory = await Category.create({
      user: req.user?.id,
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
    });

    return ApiResponse.success(res, 201, 'Category created', newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategoryByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingCategory = await Category.findOne({
      user: req.user?.id,
      _id: req.params?.id,
    });

    if (!existingCategory)
      return ApiResponse.error(res, 404, 'Category not found');

    const updateExistingCategory = await Category.findOneAndUpdate(
      {
        user: req.user?.id,
        _id: req.params?.id,
      },
      {
        user: req.user?.id,
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        updatedAt: new Date(),
      },
    );

    return ApiResponse.success(
      res,
      200,
      'Category updated',
      updateExistingCategory,
    );
  } catch (error) {
    next(error);
  }
};

const deleteCategoryByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const findCategory = await Category.findOneAndDelete({
      user: req.user?.id,
      _id: req.params?.id,
    });

    return ApiResponse.success(
      res,
      204,
      `Category: ${findCategory?.name} deleted`,
    );
  } catch (error) {
    next(error);
  }
};

export {
  getAllCategoriesByUser,
  getCategoryByUser,
  createCategoryByUser,
  updateCategoryByUser,
  deleteCategoryByUser,
};
