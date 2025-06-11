import mongoose, { Document } from 'mongoose';

interface ICategory extends Document {
  _id: string
  name: string
  description?: string
  color?: 'violet' | 'indigo' | 'blue' | 'green' | 'yellow' | 'orange' | 'red'
  userId: mongoose.Schema.Types.ObjectId
}

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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

const Category = mongoose.model('Category', categorySchema);

export {ICategory, Category};
