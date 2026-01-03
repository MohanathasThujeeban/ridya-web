import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserRole } from '@rideya/shared-types';

export interface IUser extends Document {
  email?: string;
  phone?: string;
  password?: string;
  googleId?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  phoneVerified: boolean;
  emailVerified: boolean;
  refreshTokens: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    googleId: {
      type: String,
      sparse: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PASSENGER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    refreshTokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ googleId: 1 });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
