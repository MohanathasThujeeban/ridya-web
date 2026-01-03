// User and Authentication Types
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
  TOURIST = 'TOURIST',
}

export interface User {
  _id: string;
  email?: string;
  phone?: string;
  googleId?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserPayload {
  userId: string;
  email?: string;
  phone?: string;
  role: UserRole;
}

// Booking Types
export enum RideStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  DRIVER_ARRIVED = 'DRIVER_ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
}

export interface RideBooking {
  _id: string;
  passengerId: string;
  driverId?: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  status: RideStatus;
  fare: FareCalculation;
  scheduledTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FareCalculation {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgePricing: number;
  discount: number;
  totalFare: number;
  currency: string;
}

// Payment Types
export enum PaymentMethod {
  CARD = 'CARD',
  CASH = 'CASH',
  WALLET = 'WALLET',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface PaymentTransaction {
  _id: string;
  bookingId: string;
  passengerId: string;
  driverId?: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RevenueSharing {
  totalAmount: number;
  platformFee: number;
  driverEarnings: number;
  clientCommission: number;
}

// Notification Types
export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
}

export interface NotificationPayload {
  type: NotificationType;
  recipient: string;
  subject?: string;
  message: string;
  data?: Record<string, any>;
}

// Vehicle Types
export interface Vehicle {
  _id: string;
  driverId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  vehicleType: 'SEDAN' | 'SUV' | 'VAN' | 'BIKE';
  seats: number;
  isActive: boolean;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
