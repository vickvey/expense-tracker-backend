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
    color: {
      type: String,
      enum: ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'],
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
