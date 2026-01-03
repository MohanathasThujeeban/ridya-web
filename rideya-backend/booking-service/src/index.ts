import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  // Join room for ride updates
  socket.on('join:ride', (rideId: string) => {
    socket.join(`ride:${rideId}`);
    console.log(`Socket ${socket.id} joined ride:${rideId}`);
  });

  // Driver location update
  socket.on('driver:location', (data) => {
    const { rideId, location } = data;
    io.to(`ride:${rideId}`).emit('driver:location:update', location);
  });

  socket.on('disconnect', () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'booking-service',
    timestamp: new Date().toISOString(),
  });
});

// Booking Endpoints (Placeholder)
app.post('/api/bookings', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Create booking - To be implemented',
    data: { bookingId: 'placeholder-id' },
  });
});

app.get('/api/bookings/:id', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Get booking details - To be implemented',
    data: { bookingId: req.params.id },
  });
});

app.get('/api/bookings', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'List bookings - To be implemented',
    data: { bookings: [] },
  });
});

// Driver endpoints
app.post('/api/drivers/:id/accept', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Accept ride - To be implemented' });
});

app.post('/api/drivers/:id/location', (req: Request, res: Response) => {
  res.json({ success: true, message: 'Update location - To be implemented' });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚗 Booking Service running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔌 WebSocket ready for real-time updates`);
});

export default app;
