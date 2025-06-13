import { AuthRequest } from '@/types';
import { Response, NextFunction } from 'express';
import Transaction from '@/models/transaction.model';
import { ApiResponse } from '@/lib/apiResponse';

const getAllTransactionsByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingTransactions = await Transaction.find({
      user: req.user?.id,
    });
    return ApiResponse.success(
      res,
      200,
      `Fetched all transactions for User: ${req.user?.id}`,
      existingTransactions,
    );
  } catch (error) {
    next(error);
  }
};

const getTransactionByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingTransaction = await Transaction.findOne({
      user: req.user?.id,
      _id: req.params?.id,
    });
    if (!existingTransaction) {
      console.log(`ERROR: Transaction with _id: ${req.params?.id} not found`);
      return ApiResponse.error(res, 404, 'Transaction not found');
    }

    console.log(
      `INFO: Fetched transaction data for User: ${req.user?.id} - ${JSON.stringify(existingTransaction)}`,
    );
    return ApiResponse.success(
      res,
      200,
      'Fetched transaction for user',
      existingTransaction,
    );
  } catch (error) {
    next(error);
  }
};

const createTransactionByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newTransaction = await Transaction.create({
      user: req.user?.id,
      amount: req.body?.amount,
      type: req.body?.type,
      description: req.body?.description,
      currency: req.body?.currency,
      category: req.body?.category,
    });
    if (!newTransaction) {
      console.error(
        `ERROR: Could not create transaction with user: ${req.user?.id}`,
      );
      return ApiResponse.error(
        res,
        400,
        'Could not create transaction with user',
        newTransaction,
      );
    }

    console.info(
      `INFO: Transaction Created - ${JSON.stringify(newTransaction)}`,
    );
    return ApiResponse.success(res, 201, 'Transaction Created', newTransaction);
  } catch (error) {
    next(error);
  }
};

const updateTransactionByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingTransaction = await Transaction.findOne({
      user: req.user?.id,
      _id: req.params?.id,
    });

    if (!existingTransaction)
      return ApiResponse.error(res, 404, 'Transaction not found');

    const updateExistingTransaction = await Transaction.findOneAndUpdate(
      {
        user: req.user?.id,
        _id: req.params?.id,
      },
      {
        amount: req.body?.amount,
        type: req.body?.type,
        description: req.body?.description,
        currency: req.body?.currency,
        category: req.body?.category,
        date: req.body?.date,
        updatedAt: new Date(),
      },
    );

    return ApiResponse.success(
      res,
      200,
      'Transaction updated',
      updateExistingTransaction,
    );
  } catch (error) {
    next(error);
  }
};

const deleteTransactionByUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    await Transaction.findOneAndDelete({
      user: req.user?.id,
      _id: req.params?.id,
    });

    return ApiResponse.success(res, 204, `Transaction deleted`);
  } catch (error) {
    next(error);
  }
};

export {
  getAllTransactionsByUser,
  getTransactionByUser,
  createTransactionByUser,
  updateTransactionByUser,
  deleteTransactionByUser,
};
