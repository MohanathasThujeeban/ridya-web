# Quick Access Guide - Admin Dashboard

## How to Access

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Navigate to the Admin Login page**:
   - Open your browser and go to: `http://localhost:5173/admin/login`
   - Or click on "Admin Portal" link (if added to main navigation)

3. **Login with default credentials**:
   - Username: `ADMIN`
   - Password: `Admin123`

4. **You will be redirected to**: `http://localhost:5173/admin/dashboard`

## Dashboard Sections

Once logged in, use the sidebar navigation to access:

1. **Overview** - `/admin/dashboard`
   - Dashboard home with key metrics and stats

2. **Dispatch & Vehicles** - `/admin/dashboard/dispatch`
   - Real-time vehicle tracking and ride assignment

3. **Revenue Reports** - `/admin/dashboard/revenue`
   - Financial analytics and performance tracking

4. **CRM** - `/admin/dashboard/crm`
   - Customer management, feedback, and promotions

5. **Safety Module** - `/admin/dashboard/safety`
   - SOS alerts and live trip monitoring

## Features at a Glance

### Dispatch & Vehicle Allocation
- ✅ View available/busy/offline vehicles
- ✅ See pending ride requests
- ✅ Assign drivers to rides
- ✅ Track vehicle locations

### Revenue Reporting
- ✅ Monthly performance tracking
- ✅ Revenue stream breakdown
- ✅ Expense analysis
- ✅ Profit/loss tracking
- ✅ Export reports

### CRM Module
- ✅ Customer database with tiers
- ✅ Loyalty points management
- ✅ Feedback review system
- ✅ Promotion creation and tracking
- ✅ Customer communication

### Safety Module
- ✅ Real-time SOS alert handling
- ✅ Live trip monitoring
- ✅ Safety score tracking
- ✅ Emergency contact options
- ✅ Incident resolution

## Logout

Click the "Logout" button in the sidebar to end your admin session and return to the login page.

---

**Note**: This is a frontend-only implementation with mock data. In production, this would connect to a real backend API for live data and authentication.
