# Rideya SaaS Implementation Plan (TypeScript + Node.js)

## Phase 1: Foundation Setup (Weeks 1-2)

### 1.1 Project Initialization
```bash
# Monorepo structure with Turborepo/Nx
rideya/
├── apps/
│   ├── api-gateway/          # Main API gateway
│   ├── auth-service/         # Authentication microservice
│   ├── booking-service/      # Ride booking logic
│   ├── payment-service/      # Payment processing
│   ├── notification-service/ # SMS/Email/Push
│   ├── admin-dashboard/      # Next.js admin panel
│   ├── client-website/       # Next.js white-label template
│   ├── passenger-app/        # React Native
│   └── driver-app/           # React Native
├── packages/
│   ├── shared-types/         # TypeScript interfaces
│   ├── ui-components/        # Shared React components
│   ├── utils/                # Common utilities
│   └── config/               # Shared configurations
└── infrastructure/
    ├── docker/
    ├── kubernetes/
    └── terraform/
```

### 1.2 Core Technology Setup
- **Package Manager**: pnpm (for monorepo efficiency)
- **Build Tool**: Turborepo or Nx
- **Linting**: ESLint + Prettier
- **Testing**: Jest + Supertest (API), React Testing Library (UI)
- **Documentation**: TypeDoc + Swagger/OpenAPI

### 1.3 Development Environment
```typescript
// package.json (root)
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  }
}
```

## Phase 2: Backend Core Services (Weeks 3-6)

### 2.1 Authentication Service
**Tech Stack**: Node.js + Express/NestJS + Passport.js + JWT

```typescript
// auth-service/src/types/auth.types.ts
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  CLIENT_ADMIN = 'client_admin',
  DRIVER = 'driver',
  PASSENGER = 'passenger',
  TOURIST = 'tourist'
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserPayload {
  id: string;
  email: string;
  role: UserRole;
  clientId?: string;
  permissions: string[];
}
```

**Key Features**:
- OAuth2 + JWT token generation
- Role-based access control (RBAC)
- Multi-tenant authentication
- Passport/ID verification for tourists
- Social login integration

### 2.2 Booking Service
**Tech Stack**: Node.js + NestJS + Bull (queue) + Socket.io

```typescript
// booking-service/src/types/booking.types.ts
export enum RideStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
  ARRIVED = 'arrived',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface RideBooking {
  id: string;
  passengerId: string;
  driverId?: string;
  clientId: string;
  pickup: Location;
  dropoff: Location;
  status: RideStatus;
  fareEstimate: FareCalculation;
  vehicleType: string;
  scheduledAt?: Date;
  createdAt: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}
```

**Key Features**:
- Real-time ride matching algorithm
- WebSocket connections for live updates
- Queue system for ride requests
- Multi-service support (taxi, delivery, rental)
- Group booking & package booking

### 2.3 Dispatch & Matching Service
**Tech Stack**: Node.js + Redis (geospatial) + PostgreSQL

```typescript
// dispatch-service/src/matching.algorithm.ts
export interface MatchingCriteria {
  location: Location;
  vehicleType: string;
  maxDistance: number; // in km
  ecoPreference?: boolean;
  priorities: {
    distance: number;    // weight 0-1
    rating: number;      // weight 0-1
    waitTime: number;    // weight 0-1
    earnings: number;    // weight 0-1
  };
}

export class DispatchEngine {
  async findBestDriver(
    booking: RideBooking,
    criteria: MatchingCriteria
  ): Promise<Driver | null> {
    // Geospatial search using Redis
    // Score-based matching algorithm
    // Return best driver
  }
}
```

### 2.4 Payment Service
**Tech Stack**: Node.js + Stripe SDK + PayPal SDK

```typescript
// payment-service/src/types/payment.types.ts
export enum PaymentMethod {
  CARD = 'card',
  CASH = 'cash',
  WALLET = 'wallet',
  UPI = 'upi'
}

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  gatewayTransactionId?: string;
  metadata: Record<string, any>;
}

export interface RevenueSharing {
  totalFare: number;
  platformFee: number;
  clientRevenue: number;
  driverEarnings: number;
  partnerCommission?: number;
}
```

### 2.5 Notification Service
**Tech Stack**: Node.js + Twilio + SendGrid + Firebase Cloud Messaging

```typescript
// notification-service/src/types/notification.types.ts
export enum NotificationType {
  SMS = 'sms',
  EMAIL = 'email',
  PUSH = 'push',
  WHATSAPP = 'whatsapp'
}

export interface NotificationPayload {
  userId: string;
  type: NotificationType;
  template: string;
  data: Record<string, any>;
  priority: 'low' | 'medium' | 'high';
}
```

## Phase 3: Database Design (Week 4)

### 3.1 MongoDB Collections
```typescript
// MongoDB - Real-time data
- users (passengers, drivers, admins)
- rides (active & completed rides)
- vehicles
- driver_locations (geospatial index)
- ride_history
- feedback_reviews
```

### 3.2 PostgreSQL Tables
```sql
-- PostgreSQL - Financial & reporting data
CREATE TABLE clients (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  domain VARCHAR(255) UNIQUE,
  subscription_plan VARCHAR(50),
  branding JSONB,
  created_at TIMESTAMP
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  booking_id UUID,
  client_id UUID,
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  status VARCHAR(20),
  revenue_breakdown JSONB,
  created_at TIMESTAMP
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  client_id UUID,
  plan_type VARCHAR(50),
  billing_cycle VARCHAR(20),
  amount DECIMAL(10,2),
  next_billing_date DATE
);
```

### 3.3 Redis Cache Structure
```typescript
// Redis - Caching & real-time state
- session:${userId} (user sessions)
- driver:location:${driverId} (geospatial)
- ride:active:${rideId} (active ride state)
- rate:limit:${ip} (API rate limiting)
- fare:cache:${route} (fare calculations)
```

## Phase 4: API Gateway (Week 5)

### 4.1 API Structure
```typescript
// api-gateway/src/routes/v1/index.ts
export const routes = {
  auth: '/api/v1/auth/*',
  bookings: '/api/v1/bookings/*',
  payments: '/api/v1/payments/*',
  users: '/api/v1/users/*',
  drivers: '/api/v1/drivers/*',
  admin: '/api/v1/admin/*',
  webhooks: '/api/v1/webhooks/*'
};

// REST + GraphQL hybrid
- REST for CRUD operations
- GraphQL for complex queries (admin dashboard)
- WebSocket for real-time updates
```

### 4.2 Middleware Stack
```typescript
// api-gateway/src/middleware/
- authentication.middleware.ts (JWT verification)
- authorization.middleware.ts (RBAC)
- rate-limiting.middleware.ts (Redis-based)
- request-validation.middleware.ts (Zod/Joi)
- error-handling.middleware.ts
- logging.middleware.ts (Winston/Pino)
- multi-tenant.middleware.ts (client isolation)
```

## Phase 5: Frontend Applications (Weeks 6-10)

### 5.1 Admin Dashboard (Next.js)
**Tech Stack**: Next.js 14 + TypeScript + TailwindCSS + Shadcn UI

```typescript
// admin-dashboard/src/features/
- dashboard/          (analytics, real-time metrics)
- bookings/           (ride management)
- drivers/            (driver management)
- passengers/         (customer management)
- payments/           (revenue tracking)
- settings/           (configuration)
- reports/            (business intelligence)
```

**Key Features**:
- Real-time dispatch board (WebSocket)
- Revenue analytics with charts (Recharts)
- Driver & vehicle management
- CRM tools (loyalty, promotions)
- Multi-language support (i18next)

### 5.2 Client White-Label Website (Next.js)
```typescript
// client-website/src/
- Dynamic theming based on client branding
- SSR for SEO optimization
- Booking widget with fare calculator
- Live vehicle tracking map
- Multi-language support
- Payment integration
```

### 5.3 Mobile Apps (React Native)
**Passenger App**:
```typescript
// passenger-app/src/screens/
- Home.tsx (booking interface)
- RideTracking.tsx (live map)
- BookingHistory.tsx
- Payments.tsx
- Profile.tsx
- EcoRides.tsx (CO2 tracking)
```

**Driver App**:
```typescript
// driver-app/src/screens/
- HomeScreen.tsx (accept rides)
- Navigation.tsx (turn-by-turn)
- Earnings.tsx (revenue dashboard)
- Marketplace.tsx (driver services)
- Profile.tsx
```

## Phase 6: Tourism Layer (Week 8)

### 6.1 Tourist Authentication
```typescript
// auth-service/src/tourist/
export interface TouristVerification {
  passportNumber: string;
  nationality: string;
  idDocument: File;
  faceVerification: File;
  status: 'pending' | 'verified' | 'rejected';
}

// Integration with ID verification APIs
- Onfido
- Jumio
- Veriff
```

### 6.2 Multi-Currency & Language
```typescript
// shared-types/src/tourism.types.ts
export interface MultiCurrencyFare {
  baseCurrency: string;
  amount: number;
  convertedAmount: Record<string, number>; // USD, EUR, GBP, etc.
  exchangeRate: number;
}

// i18n setup
- English, Spanish, French, German, Arabic, Chinese
- Real-time translation for chat (Google Translate API)
```

## Phase 7: Integrations (Week 9)

### 7.1 Maps Integration
```typescript
// maps-service/src/providers/
- GoogleMapsProvider.ts
- MapboxProvider.ts
- OpenStreetMapProvider.ts

export interface RouteCalculation {
  distance: number;
  duration: number;
  polyline: string;
  steps: RouteStep[];
  trafficConditions?: TrafficData;
}
```

### 7.2 Payment Gateways
```typescript
// payment-service/src/gateways/
- StripeGateway.ts
- PayPalGateway.ts
- RazorpayGateway.ts

export interface PaymentGateway {
  createPaymentIntent(amount: number, currency: string): Promise<any>;
  capturePayment(intentId: string): Promise<any>;
  refund(transactionId: string, amount: number): Promise<any>;
}
```

## Phase 8: DevOps & Infrastructure (Week 10)

### 8.1 Docker Setup
```dockerfile
# Dockerfile (each microservice)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist ./dist
CMD ["node", "dist/main.js"]
```

### 8.2 Kubernetes Deployment
```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: booking-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: booking-service
  template:
    metadata:
      labels:
        app: booking-service
    spec:
      containers:
      - name: booking-service
        image: rideya/booking-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: url
```

### 8.3 CI/CD Pipeline (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: docker build -t rideya/api:${{ github.sha }} .
      - name: Push to registry
        run: docker push rideya/api:${{ github.sha }}
      - name: Deploy to Kubernetes
        run: kubectl apply -f kubernetes/
```

## Phase 9: Testing Strategy

### 9.1 Unit Tests
```typescript
// booking-service/tests/unit/fare.test.ts
import { FareCalculator } from '../src/services/fare.calculator';

describe('FareCalculator', () => {
  it('should calculate base fare correctly', () => {
    const calculator = new FareCalculator();
    const fare = calculator.calculate({
      distance: 10,
      duration: 20,
      vehicleType: 'sedan'
    });
    expect(fare.total).toBeGreaterThan(0);
  });
});
```

### 9.2 Integration Tests
```typescript
// api-gateway/tests/integration/booking.test.ts
describe('Booking API', () => {
  it('should create a booking', async () => {
    const response = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingData);
    expect(response.status).toBe(201);
  });
});
```

### 9.3 E2E Tests (Playwright)
```typescript
// e2e/passenger-booking.spec.ts
test('passenger can book a ride', async ({ page }) => {
  await page.goto('/');
  await page.fill('#pickup', 'Airport');
  await page.fill('#dropoff', 'Hotel');
  await page.click('button:has-text("Book Ride")');
  await expect(page.locator('.ride-confirmation')).toBeVisible();
});
```

## Phase 10: Security Implementation

### 10.1 Security Checklist
- [ ] Input validation (Zod schemas)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (sanitization)
- [ ] CSRF tokens
- [ ] Rate limiting (Redis)
- [ ] Encryption at rest (AES-256)
- [ ] TLS 1.3 in transit
- [ ] JWT with short expiry + refresh tokens
- [ ] RBAC implementation
- [ ] API key management (vault)
- [ ] GDPR compliance (data export, deletion)
- [ ] Security headers (Helmet.js)
- [ ] DDoS protection (Cloudflare)

### 10.2 Environment Variables
```typescript
// shared-types/src/config.ts
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'staging' | 'production';
  PORT: number;
  DATABASE_URL: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  STRIPE_SECRET_KEY: string;
  TWILIO_ACCOUNT_SID: string;
  MAPS_API_KEY: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
}
```

## Key NPM Packages

```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "express": "^4.18.0",
    "typescript": "^5.3.0",
    "prisma": "^5.7.0",
    "@prisma/client": "^5.7.0",
    "mongoose": "^8.0.0",
    "redis": "^4.6.0",
    "bull": "^4.12.0",
    "socket.io": "^4.6.0",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0",
    "stripe": "^14.0.0",
    "twilio": "^4.20.0",
    "nodemailer": "^6.9.0",
    "winston": "^3.11.0",
    "joi": "^17.11.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.0",
    "axios": "^1.6.0",
    "dotenv": "^16.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/express": "^4.17.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "ts-node": "^10.9.0",
    "nodemon": "^3.0.0"
  }
}
```

## Timeline Summary

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Foundation Setup | Weeks 1-2 | Project structure, dev environment |
| Backend Core | Weeks 3-6 | Auth, Booking, Payment services |
| Database Design | Week 4 | Schema design, migrations |
| API Gateway | Week 5 | Unified API layer |
| Frontend Apps | Weeks 6-10 | Admin, Client sites, Mobile apps |
| Tourism Layer | Week 8 | Multi-currency, ID verification |
| Integrations | Week 9 | Maps, Payments, Communications |
| DevOps | Week 10 | Docker, K8s, CI/CD |

## Next Steps

1. **Week 1**: Set up monorepo and initialize all services
2. **Week 2**: Implement authentication service with JWT
3. **Week 3**: Build booking service with real-time matching
4. **Week 4**: Design and implement database schemas
5. **Week 5**: Create API gateway with middleware stack
6. **Week 6**: Start admin dashboard development
7. **Week 7**: Build client white-label website template
8. **Week 8**: Implement tourism features
9. **Week 9**: Integrate third-party services
10. **Week 10**: Deploy to staging environment
