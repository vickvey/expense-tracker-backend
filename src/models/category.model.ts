import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 255,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 255,
    },
    type: {
      type: String,
      enum: ['expense'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model('Category', categorySchema);
