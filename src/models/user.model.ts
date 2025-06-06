import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Enter a valid email address',
      ],
      maxLength: 255,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    userType: {
      type: String,
      enum: ['standard', 'admin'],
      default: 'standard',
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
