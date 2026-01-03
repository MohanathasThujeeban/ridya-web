import { Response } from 'express';
import { User } from '../models/User';
import { verifyRefreshToken, generateTokens } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

// Refresh Token
export const refreshToken = async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_TOKEN',
          message: 'Refresh token is required',
        },
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.userId);

    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid refresh token',
        },
      });
    }

    // Generate new tokens
    const tokens = generateTokens({
      userId: user._id.toString(),
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    // Replace old refresh token with new one
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
    user.refreshTokens.push(tokens.refreshToken);
    await user.save();

    res.json({
      success: true,
      data: tokens,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: {
        code: 'TOKEN_REFRESH_FAILED',
        message: 'Invalid or expired refresh token',
      },
    });
  }
};

// Logout
export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
    }

    // Remove refresh token from user
    if (refreshToken) {
      await User.findByIdAndUpdate(userId, {
        $pull: { refreshTokens: refreshToken },
      });
    }

    res.json({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'LOGOUT_FAILED',
        message: error.message,
      },
    });
  }
};

// Get Current User
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isVerified: user.isVerified,
          emailVerified: user.emailVerified,
          phoneVerified: user.phoneVerified,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_USER_FAILED',
        message: error.message,
      },
    });
  }
};
