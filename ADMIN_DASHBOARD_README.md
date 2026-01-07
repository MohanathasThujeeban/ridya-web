# Admin Dashboard

## Overview
The Admin Dashboard provides comprehensive tools for managing the Rideya rideshare platform, including:

- **Real-time Dispatch & Vehicle Allocation**: Monitor and manage active vehicles and ride requests
- **Revenue Reporting**: Track financial performance with detailed profit/loss analysis
- **CRM Module**: Manage customer relationships, loyalty programs, feedback, and promotions
- **Safety Module**: Handle SOS alerts and monitor live trips for passenger safety

## Access Credentials

Navigate to: `/admin/login`

**Default Credentials:**
- **Username**: `ADMIN`
- **Password**: `Admin123`

## Features

### 1. Dashboard Overview
- Real-time metrics and KPIs
- Active rides, revenue, user statistics
- Recent activity feed
- System alerts

### 2. Dispatch & Vehicle Allocation
- View all active vehicles and their status (Available, On Trip, Offline)
- Monitor pending ride requests
- Assign drivers to rides
- Real-time location tracking
- Vehicle performance metrics

### 3. Revenue Reporting
- Monthly/yearly revenue trends
- Revenue stream breakdown (commissions, fees, surge pricing)
- Expense tracking and analysis
- Profit margin calculations
- Export reports

### 4. CRM Module
- Customer database with loyalty tiers (Bronze, Silver, Gold, Platinum)
- Customer feedback management
- Promotions and discount management
- Email communication tools
- Customer lifetime value tracking

### 5. Safety Module
- **SOS Alerts**: Real-time emergency alert handling with priority levels
- **Live Trip Monitoring**: Track all active rides with safety scores
- Emergency contact options
- Trip status monitoring (On-time, Delayed, In-progress)
- Incident resolution tracking

## Navigation

The dashboard features a collapsible sidebar with quick access to all modules:
- Overview (Dashboard home)
- Dispatch & Vehicles
- Revenue Reports
- CRM
- Safety Module

## Security

- Session-based authentication
- Protected routes (redirects to login if not authenticated)
- Secure logout functionality

## Technical Stack

- React + TypeScript
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui component library
- Lucide React icons

## Future Enhancements

- Integration with real mapping services (Google Maps / Mapbox)
- Real-time WebSocket updates for live data
- Advanced analytics and reporting
- Multi-factor authentication
- Role-based access control (Super Admin, Admin, Support)
