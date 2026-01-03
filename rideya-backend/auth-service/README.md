# Authentication Service

Complete authentication service supporting Email, Phone (OTP), and Google OAuth authentication methods.

## Features

- ✅ **Email/Password Authentication**
- ✅ **Phone/OTP Authentication** (via Twilio)
- ✅ **Google OAuth 2.0**
- ✅ **JWT Access & Refresh Tokens**
- ✅ **Role-Based Access Control (RBAC)**
- ✅ **MongoDB Atlas Integration**
- ✅ **Rate Limiting**
- ✅ **Request Validation (Zod)**
- ✅ **Security Headers (Helmet)**
- ✅ **CORS Protection**

## Setup

### 1. Install Dependencies

```bash
cd apps/auth-service
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

#### MongoDB Atlas Setup:
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and update `MONGODB_URI`

#### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3001/api/auth/google/callback`
6. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

#### Twilio Setup (for Phone Auth):
1. Create account at [Twilio](https://www.twilio.com/)
2. Get Account SID and Auth Token
3. Get a phone number
4. Update Twilio credentials in `.env`

### 3. Start Service

```bash
pnpm dev
```

## API Endpoints

### Health Check
```http
GET /health
```

### Email Authentication

#### Register
```http
POST /api/auth/register/email
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "passenger"
}
```

#### Login
```http
POST /api/auth/login/email
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### Phone Authentication

#### Send OTP
```http
POST /api/auth/register/phone/send-otp
Content-Type: application/json

{
  "phone": "+94712345678"
}
```

#### Verify OTP & Register/Login
```http
POST /api/auth/register/phone/verify-otp
Content-Type: application/json

{
  "phone": "+94712345678",
  "otp": "123456",
  "firstName": "John",
  "lastName": "Doe",
  "role": "passenger"
}
```

### Google OAuth

#### Initiate OAuth Flow
```http
GET /api/auth/google
```

This redirects to Google login. After success, redirects to:
```
{FRONTEND_URL}/auth/callback?access_token=xxx&refresh_token=xxx
```

### Common Endpoints

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {access_token}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "passenger",
      "isVerified": true
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": []
  }
}
```

## User Roles

- `super_admin` - Platform administrator
- `client_admin` - Client company administrator
- `driver` - Driver role
- `passenger` - Passenger/customer role
- `tourist` - Tourist passenger role

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Short-lived access tokens (15min) + long-lived refresh tokens (7 days)
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Input Validation**: Zod schema validation
- **OTP Expiry**: 10 minutes
- **Max OTP Attempts**: 5 attempts per OTP

## Development

### Testing with cURL

Email Registration:
```bash
curl -X POST http://localhost:3001/api/auth/register/email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

Phone OTP (Development mode shows OTP in console):
```bash
curl -X POST http://localhost:3001/api/auth/register/phone/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+94712345678"}'
```

## Project Structure

```
src/
├── config/
│   ├── database.ts          # MongoDB connection
│   └── logger.ts             # Winston logger
├── controllers/
│   ├── email-auth.controller.ts      # Email authentication
│   ├── phone-auth.controller.ts      # Phone authentication
│   ├── google-auth.controller.ts     # Google OAuth
│   └── common-auth.controller.ts     # Common auth operations
├── middleware/
│   ├── auth.ts               # JWT authentication & RBAC
│   ├── validate.ts           # Request validation
│   └── error.ts              # Error handling
├── models/
│   ├── User.ts               # User model
│   └── OTP.ts                # OTP model
├── routes/
│   └── auth.routes.ts        # All auth routes
├── utils/
│   ├── jwt.ts                # JWT utilities
│   └── otp.ts                # OTP utilities
└── index.ts                  # Main application
```

## Next Steps

1. Set up MongoDB Atlas cluster
2. Configure Google OAuth credentials
3. Configure Twilio (optional for production phone auth)
4. Update environment variables
5. Run `pnpm dev` to start the service
6. Test endpoints with Postman or cURL
