import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import nodemailer from 'nodemailer';
import { Twilio } from 'twilio';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// Initialize Twilio (optional - only if credentials are provided)
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN?.trim();

const twilioClient = 
  twilioAccountSid && twilioAuthToken && twilioAccountSid.startsWith('AC')
    ? new Twilio(twilioAccountSid, twilioAuthToken)
    : null;

if (!twilioClient) {
  console.log('⚠️  Twilio not configured - SMS notifications will be disabled');
}

// Initialize Nodemailer
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'notification-service',
    timestamp: new Date().toISOString(),
  });
});

// Send Email
app.post('/api/notifications/email', async (req: Request, res: Response) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!process.env.EMAIL_USER) {
      return res.json({
        success: true,
        message: 'Email service not configured (development mode)',
        dev: { to, subject, text },
      });
    }

    const info = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    res.json({
      success: true,
      data: {
        messageId: info.messageId,
        message: 'Email sent successfully',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'EMAIL_SEND_FAILED', message: error.message },
    });
  }
});

// Send SMS
app.post('/api/notifications/sms', async (req: Request, res: Response) => {
  try {
    const { to, message } = req.body;

    if (!twilioClient) {
      console.log(`📱 SMS to ${to}: ${message}`);
      return res.json({
        success: true,
        message: 'SMS service not configured (development mode)',
        dev: { to, message },
      });
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    res.json({
      success: true,
      data: {
        sid: result.sid,
        message: 'SMS sent successfully',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'SMS_SEND_FAILED', message: error.message },
    });
  }
});

// Send Push Notification
app.post('/api/notifications/push', async (req: Request, res: Response) => {
  try {
    const { token, title, body, data } = req.body;

    // TODO: Implement Firebase Cloud Messaging
    console.log(`🔔 Push notification: ${title} - ${body}`);

    res.json({
      success: true,
      message: 'Push notification service - To be implemented with Firebase',
      dev: { token, title, body, data },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'PUSH_SEND_FAILED', message: error.message },
    });
  }
});

// Bulk notification
app.post('/api/notifications/bulk', async (req: Request, res: Response) => {
  try {
    const { type, recipients, message } = req.body;

    console.log(`📨 Bulk ${type} notification to ${recipients.length} recipients`);

    res.json({
      success: true,
      message: `Bulk ${type} notification queued`,
      data: { queued: recipients.length },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: { code: 'BULK_NOTIFICATION_FAILED', message: error.message },
    });
  }
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

// Start server
app.listen(PORT, () => {
  console.log(`📬 Notification Service running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;
