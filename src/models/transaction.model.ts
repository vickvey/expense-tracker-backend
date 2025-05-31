import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Transaction Amount is required'],
      validate: {
        validator: (val: number) => val >= 0,
        message: 'Amount must greater than integer',
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
      maxLength: 255,
    },
    currency: {
      type: String,
      enum: ['INR', 'USD', 'EUR'],
      required: [true, 'Transaction Currency is required'],
    },
    date: {
      type: Date,
      required: [true, 'Transaction Date is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Transaction should be related to a User'],
    },
  },
  {
    timestamps: true,
  },
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
