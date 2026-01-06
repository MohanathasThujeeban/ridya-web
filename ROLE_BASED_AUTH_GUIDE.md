# Role-Based Authentication Flow

## Overview
The RIDEYA app now has a complete role-based signup and signin flow that allows users to register and login as either a Passenger or a Driver.

## User Journey

### 1. **Sign Up Flow**

#### Step 1: Click "Get Started" or "Sign Up"
- User clicks signup button on homepage
- Redirects to `/role-select`

#### Step 2: Role Selection Page (`/role-select`)
- User chooses between two roles:
  - **Passenger**: Book rides and travel
  - **Driver**: Drive and earn money
- Features displayed for each role:
  - **Passenger**: Book rides, real-time tracking, safe drivers, rating system
  - **Driver**: Earn money, flexible schedule, nearby requests, reputation building
- Click "Continue" button after selecting role

#### Step 3: Registration Form (`/signup`)
- Page header shows selected role (e.g., "Join RIDEYA as a Driver")
- User can choose signup method:
  - **Google Sign Up** (OAuth)
  - **Phone Number** (with OTP verification)
  - **Email** (with password)

##### Phone Number Flow:
1. Enter phone number
2. Click "Send OTP"
3. Receive 6-digit OTP code
4. Enter OTP and verify
5. Complete profile (First name, Last name, optional email)

##### Email Flow:
1. Enter email address
2. Create password
3. Confirm password
4. Click "Create Account"
5. Complete profile (First name, Last name)

#### Step 4: Account Creation
- User role is stored in localStorage
- User data is saved
- User is redirected based on role:
  - **Passenger** → Homepage (`/`)
  - **Driver** → Driver Dashboard (`/driver-dashboard`)

---

### 2. **Sign In Flow**

#### Step 1: Click "Sign In"
- User clicks signin link from signup page or navigation
- Redirects to `/signin`

#### Step 2: Sign In Page (`/signin`)
- User selects their role (if not already set):
  - **Passenger** or **Driver**
- Role is displayed as a badge at the top
- User can change role if needed

#### Step 3: Choose Sign In Method
- **Google Sign In** (OAuth)
- **Email** (with password)
  - Enter email
  - Enter password
  - "Forgot Password?" link available
- **Phone** (with OTP)
  - Enter phone number
  - Receive and enter OTP

#### Step 4: Authentication
- User credentials are verified
- User role is retrieved and stored
- User is redirected based on role:
  - **Passenger** → Homepage (`/`)
  - **Driver** → Driver Dashboard (`/driver-dashboard`)

---

## Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | HomePage | Main landing page for passengers |
| `/role-select` | RoleSelector | Choose between Passenger/Driver role |
| `/signup` | SignUpPage | Registration form with role-specific messaging |
| `/signin` | SignInPage | Login form with role selection |
| `/driver-dashboard` | DriverDashboard | Driver-specific dashboard |

---

## Components Created/Modified

### New Components:
1. **RoleSelector** (`src/components/RoleSelector.tsx`)
   - Beautiful role selection interface
   - Shows benefits of each role
   - Passes selected role to signup

2. **SignInPage** (`src/components/SignInPage.tsx`)
   - Role-based signin
   - Multiple authentication methods
   - Redirects based on user role

3. **DriverDashboardPage** (`src/components/DriverDashboardPage.tsx`)
   - Dashboard for drivers
   - Online/offline toggle
   - Stats display (trips, earnings, rating, online time)
   - Quick actions menu

### Modified Components:
1. **SignUpPage** (`src/components/SignUpPage.tsx`)
   - Now accepts role parameter
   - Shows role-specific messaging
   - Stores role in localStorage
   - Redirects based on role

2. **App.tsx**
   - Added new routes for role-select, signin, driver-dashboard
   - Updated signup navigation to go through role-select first

---

## Data Storage

### LocalStorage Keys:
- `userRole`: Stores user's role ('PASSENGER' | 'DRIVER')
- `userData`: Stores user information (name, email, phone, role)

### Example userData object:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+94701234567",
  "role": "DRIVER"
}
```

---

## Features

### For Passengers:
- ✅ Book rides from homepage
- ✅ Real-time ride tracking
- ✅ Rate drivers
- ✅ View ride history

### For Drivers:
- ✅ Driver dashboard with stats
- ✅ Online/offline toggle
- ✅ Accept/reject ride requests
- ✅ View earnings and ratings
- ✅ Profile management
- ✅ Real-time location on map

---

## Security Notes

Currently, the authentication is using localStorage for demonstration purposes. In production:
- Implement proper JWT token authentication with the backend
- Use HTTP-only cookies for secure token storage
- Implement proper session management
- Add role-based access control (RBAC) middleware
- Validate user roles on backend for every request

---

## Next Steps

To complete the integration:
1. Connect signup/signin forms to backend API (`/api/auth`)
2. Implement JWT token handling
3. Add protected route guards
4. Implement Google OAuth integration
5. Add phone OTP verification with Twilio
6. Implement forgot password functionality
7. Add driver verification process
8. Implement ride matching for drivers

---

## Testing the Flow

### Test as Passenger:
1. Go to homepage
2. Click "Get Started"
3. Select "Passenger" role
4. Complete signup with email
5. You'll be redirected to homepage (logged in)

### Test as Driver:
1. Go to homepage
2. Click "Get Started"
3. Select "Driver" role
4. Complete signup with email
5. You'll be redirected to Driver Dashboard
6. Toggle "Go Online" to start accepting rides

---

## Visual Flow

```
Homepage
   ↓
[Get Started] Button
   ↓
Role Selection Page
   ↓
Choose: Passenger or Driver
   ↓
   ├─→ Passenger Selected → Signup Page (Passenger branding)
   │                              ↓
   │                         Complete Signup
   │                              ↓
   │                         Redirect to Homepage
   │
   └─→ Driver Selected → Signup Page (Driver branding)
                              ↓
                         Complete Signup
                              ↓
                         Redirect to Driver Dashboard
```

## Sign In Flow:
```
Sign In Page
   ↓
Select Role (if not selected)
   ↓
Choose Auth Method
   ↓
   ├─→ Google OAuth
   ├─→ Email + Password
   └─→ Phone + OTP
        ↓
   Authenticate
        ↓
   ├─→ Passenger → Homepage
   └─→ Driver → Driver Dashboard
```
