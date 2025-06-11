import mongoose, { Document } from 'mongoose';

interface ITransaction extends Document {
  _id: string
  amount: number
  type: 'Income' | 'Expense'
  description: string
  currency: 'INR' | 'USD' | 'EUR'
  date: Date
  userId: mongoose.Schema.Types.ObjectId
  categoryId: mongoose.Schema.Types.ObjectId
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: [true, 'Transaction Amount is required'],
      validate: {
        validator: (val: number) => val >= 0,
        message: 'Amount must be a non-negative number',
      },
    },
    type: {
      type: String,
      enum: ['Income', 'Expense'],
      required: [true, 'Transaction Type is required'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 255,
      
    },
    currency: {
      type: String,
      enum: ['INR', 'USD', 'EUR'],
      required: [true, 'Transaction Currency is required'],
    },
    date: {
      type: Date,
      required: [true, 'Transaction Date is required'],
      default: new Date(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Transaction should be related to a User'],
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Transaction Category is required'],
    },
  },
  {
    timestamps: true,
  },
);

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export {ITransaction, Transaction};