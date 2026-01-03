import { Response } from 'express';
import { User } from '../models/User';
import { OTP as OTPModel } from '../models/OTP';
import { generateOTP, sendOTP } from '../utils/otp';
import { generateTokens } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '@rideya/shared-types';

// Send OTP to Phone
export const sendPhoneOTP = async (req: AuthRequest, res: Response) => {
  try {
    const { phone } = req.body;

    // Delete any existing OTPs for this phone
    await OTPModel.deleteMany({ phone, verified: false });

    // Generate and save new OTP
    const otpCode = generateOTP();
    
    const otp = await OTPModel.create({
      phone,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send OTP via Twilio
    const sent = await sendOTP(phone, otpCode);

    if (!sent) {
      return res.status(500).json({
        success: false,
        error: {
          code: 'OTP_SEND_FAILED',
          message: 'Failed to send OTP',
        },
      });
    }

    res.json({
      success: true,
      data: {
        message: 'OTP sent successfully',
        expiresIn: 600, // 10 minutes in seconds
        // In development, include OTP for testing
        ...(process.env.NODE_ENV === 'development' && { otp: otpCode }),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'OTP_SEND_FAILED',
        message: error.message,
      },
    });
  }
};

// Verify OTP and Register/Login
export const verifyPhoneOTP = async (req: AuthRequest, res: Response) => {
  try {
    const { phone, otp, firstName, lastName, role } = req.body;

    // Find OTP
    const otpRecord = await OTPModel.findOne({
      phone,
      otp,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_OTP',
          message: 'Invalid or expired OTP',
        },
      });
    }

    // Check attempts
    if (otpRecord.attempts >= 5) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'TOO_MANY_ATTEMPTS',
          message: 'Too many failed attempts. Request a new OTP.',
        },
      });
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    // Check if user exists
    let user = await User.findOne({ phone });

    if (!user) {
      // Register new user
      if (!firstName || !lastName) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_FIELDS',
            message: 'First name and last name are required for registration',
          },
        });
      }

      user = await User.create({
        phone,
        firstName,
        lastName,
        role: role || UserRole.PASSENGER,
        phoneVerified: true,
      });
    } else {
      // Update phone verification
      user.phoneVerified = true;
      await user.save();
    }

    // Generate tokens
    const tokens = generateTokens({
      userId: user._id.toString(),
      phone: user.phone,
      role: user.role,
    });

    // Save refresh token
    user.refreshTokens.push(tokens.refreshToken);
    await user.save();

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isVerified: user.phoneVerified,
        },
        ...tokens,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'VERIFICATION_FAILED',
        message: error.message,
      },
    });
  }
};
