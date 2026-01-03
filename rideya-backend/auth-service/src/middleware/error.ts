import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message,
        details: error.errors,
      },
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_ERROR',
        message: 'User already exists',
      },
    });
  }

  res.status(error.status || 500).json({
    success: false,
    error: {
      code: error.code || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Something went wrong',
    },
  });
};
