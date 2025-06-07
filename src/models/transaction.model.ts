import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Transaction should be related to a User'],
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Transaction Category is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
