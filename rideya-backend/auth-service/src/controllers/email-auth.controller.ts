import { Response } from 'express';
import { User } from '../models/User';
import { generateTokens } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '@rideya/shared-types';

// Register with Email
export const registerWithEmail = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'User with this email already exists',
        },
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: role || UserRole.PASSENGER,
      emailVerified: false,
    });

    // Generate tokens
    const tokens = generateTokens({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Save refresh token
    user.refreshTokens.push(tokens.refreshToken);
    await user.save();

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isVerified: user.isVerified,
        },
        ...tokens,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'REGISTRATION_FAILED',
        message: error.message,
      },
    });
  }
};

// Login with Email
export const loginWithEmail = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'ACCOUNT_DISABLED',
          message: 'Your account has been disabled',
        },
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
    }

    // Generate tokens
    const tokens = generateTokens({
      userId: user._id.toString(),
      email: user.email,
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
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isVerified: user.isVerified,
        },
        ...tokens,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'LOGIN_FAILED',
        message: error.message,
      },
    });
  }
};
