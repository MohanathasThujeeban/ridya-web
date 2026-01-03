import api from './api';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      isEmailVerified: boolean;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  };
}

export interface OTPResponse {
  success: boolean;
  message: string;
}

/**
 * Register with email and password
 */
export const registerWithEmail = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/api/auth/register/email', data);
  return response.data;
};

/**
 * Login with email and password
 */
export const loginWithEmail = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/api/auth/login/email', data);
  return response.data;
};

/**
 * Send OTP to phone number
 */
export const sendPhoneOTP = async (phone: string): Promise<OTPResponse> => {
  const response = await api.post('/api/auth/register/phone/send-otp', { phone });
  return response.data;
};

/**
 * Verify phone OTP
 */
export const verifyPhoneOTP = async (
  phone: string,
  otp: string,
  firstName: string,
  lastName: string
): Promise<AuthResponse> => {
  const response = await api.post('/api/auth/register/phone/verify-otp', {
    phone,
    otp,
    firstName,
    lastName,
  });
  return response.data;
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async () => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

/**
 * Logout user
 */
export const logout = async () => {
  const response = await api.post('/api/auth/logout');
  return response.data;
};

/**
 * Initiate Google OAuth (redirect to Google)
 */
export const loginWithGoogle = () => {
  window.location.href = 'http://localhost:3000/api/auth/google';
};
