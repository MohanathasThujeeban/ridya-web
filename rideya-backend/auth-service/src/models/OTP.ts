import mongoose, { Schema, Document } from 'mongoose';

export interface IOTP extends Document {
  phone: string;
  otp: string;
  expiresAt: Date;
  verified: boolean;
  attempts: number;
  createdAt: Date;
}

const OTPSchema = new Schema<IOTP>(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
    verified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for automatic deletion of expired OTPs
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
OTPSchema.index({ phone: 1 });

export const OTP = mongoose.model<IOTP>('OTP', OTPSchema);
