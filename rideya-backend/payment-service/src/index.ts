import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import Stripe from 'stripe';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia',
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'payment-service',
    timestamp: new Date().toISOString(),
  });
});

// Create Payment Intent
app.post('/api/payments/create-intent', async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'usd', bookingId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: { bookingId },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'PAYMENT_FAILED', message: error.message },
    });
  }
});

// Confirm Payment
app.post('/api/payments/confirm', async (req: Request, res: Response) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      success: true,
      data: {
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'PAYMENT_CONFIRMATION_FAILED', message: error.message },
    });
  }
});

// Refund Payment
app.post('/api/payments/refund', async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, amount } = req.body;

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });

    res.json({
      success: true,
      data: {
        refundId: refund.id,
        status: refund.status,
        amount: refund.amount / 100,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'REFUND_FAILED', message: error.message },
    });
  }
});

// Webhook for Stripe events
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    console.log(`Webhook received: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

// Start server
app.listen(PORT, () => {
  console.log(`💳 Payment Service running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;
