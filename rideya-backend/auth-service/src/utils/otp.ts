import { Twilio } from 'twilio';
import { logger } from '../config/logger';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

let twilioClient: Twilio | null = null;

if (accountSid && authToken) {
  twilioClient = new Twilio(accountSid, authToken);
}

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (phone: string, otp: string): Promise<boolean> => {
  try {
    if (!twilioClient || !twilioPhone) {
      logger.warn('Twilio not configured. OTP:', otp);
      // In development, log the OTP
      console.log(`📱 OTP for ${phone}: ${otp}`);
      return true;
    }

    await twilioClient.messages.create({
      body: `Your RIDEYA verification code is: ${otp}. Valid for 10 minutes.`,
      from: twilioPhone,
      to: phone,
    });

    logger.info(`OTP sent to ${phone}`);
    return true;
  } catch (error) {
    logger.error('Failed to send OTP:', error);
    // In development, still return true and log OTP
    if (process.env.NODE_ENV === 'development') {
      console.log(`📱 OTP for ${phone}: ${otp}`);
      return true;
    }
    return false;
  }
};
