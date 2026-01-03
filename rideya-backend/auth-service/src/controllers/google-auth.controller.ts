import { Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User';
import { generateTokens } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';
import { UserRole } from '@rideya/shared-types';

// Configure Google Strategy
export const configureGoogleAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const googleId = profile.id;

          if (!email) {
            return done(new Error('No email found from Google'), undefined);
          }

          // Find or create user
          let user = await User.findOne({ $or: [{ googleId }, { email }] });

          if (!user) {
            user = await User.create({
              googleId,
              email,
              firstName: profile.name?.givenName || 'User',
              lastName: profile.name?.familyName || '',
              role: UserRole.PASSENGER,
              emailVerified: true,
              isVerified: true,
            });
          } else if (!user.googleId) {
            // Link Google account to existing user
            user.googleId = googleId;
            user.emailVerified = true;
            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

// Google Auth Callback
export const googleAuthCallback = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user as any;

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
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

    // Redirect to frontend with tokens
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?access_token=${tokens.accessToken}&refresh_token=${tokens.refreshToken}`
    );
  } catch (error: any) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=${error.message}`);
  }
};
