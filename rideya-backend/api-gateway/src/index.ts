import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import winston from 'winston';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console({ format: winston.format.simple() })],
});

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
});
app.use('/api', limiter);

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'api-gateway',
    timestamp: new Date().toISOString(),
    services: {
      auth: process.env.AUTH_SERVICE_URL,
      booking: process.env.BOOKING_SERVICE_URL,
      payment: process.env.PAYMENT_SERVICE_URL,
      notification: process.env.NOTIFICATION_SERVICE_URL,
    },
  });
});

// Service routes with proxy
const services = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
  booking: process.env.BOOKING_SERVICE_URL || 'http://localhost:3002',
  payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3003',
  notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3004',
};

// Auth Service
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
    pathRewrite: {
      '^/api/auth': '/api/auth',
    },
    onError: (err, req, res) => {
      logger.error('Auth service error:', err);
      (res as Response).status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Auth service is currently unavailable',
        },
      });
    },
  })
);

// Booking Service
app.use(
  '/api/bookings',
  createProxyMiddleware({
    target: services.booking,
    changeOrigin: true,
    pathRewrite: {
      '^/api/bookings': '/api/bookings',
    },
    onError: (err, req, res) => {
      logger.error('Booking service error:', err);
      (res as Response).status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Booking service is currently unavailable',
        },
      });
    },
  })
);

// Payment Service
app.use(
  '/api/payments',
  createProxyMiddleware({
    target: services.payment,
    changeOrigin: true,
    pathRewrite: {
      '^/api/payments': '/api/payments',
    },
    onError: (err, req, res) => {
      logger.error('Payment service error:', err);
      (res as Response).status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Payment service is currently unavailable',
        },
      });
    },
  })
);

// Notification Service
app.use(
  '/api/notifications',
  createProxyMiddleware({
    target: services.notification,
    changeOrigin: true,
    pathRewrite: {
      '^/api/notifications': '/api/notifications',
    },
    onError: (err, req, res) => {
      logger.error('Notification service error:', err);
      (res as Response).status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Notification service is currently unavailable',
        },
      });
    },
  })
);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'API endpoint not found',
    },
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🌐 API Gateway running on http://localhost:${PORT}`);
  logger.info(`📊 Health check: http://localhost:${PORT}/health`);
  logger.info(`🔐 Auth API: http://localhost:${PORT}/api/auth/*`);
  logger.info(`🚗 Booking API: http://localhost:${PORT}/api/bookings/*`);
  logger.info(`💳 Payment API: http://localhost:${PORT}/api/payments/*`);
  logger.info(`📬 Notification API: http://localhost:${PORT}/api/notifications/*`);
});

export default app;
