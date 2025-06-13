import mongoose, {Document} from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name?: string;
  email: string;
  password: string;
  role: 'standard' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
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
    role: {
      type: String,
      enum: ['standard', 'admin'],
      default: 'standard',
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
