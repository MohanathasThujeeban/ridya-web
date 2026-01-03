import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import { connectDatabase } from './config/database';
import { logger } from './config/logger';
import { configureGoogleAuth } from './controllers/google-auth.controller';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport initialization
app.use(passport.initialize());
configureGoogleAuth();

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'auth-service',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB Atlas
    await connectDatabase();

    app.listen(PORT, () => {
      logger.info(`🔐 Auth Service running on http://localhost:${PORT}`);
      logger.info(`📊 Health check: http://localhost:${PORT}/health`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
      logger.info(`📧 Email auth: POST /api/auth/register/email`);
      logger.info(`📱 Phone auth: POST /api/auth/register/phone/send-otp`);
      logger.info(`🔑 Google OAuth: GET /api/auth/google`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

startServer();

export default app;
