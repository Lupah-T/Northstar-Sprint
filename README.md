# Northstar Support Deflection MVP

## Overview
Northstar Retail Co. is a mid-size e-commerce company experiencing a high volume of repetitive customer support inquiries. This MVP aims to deflect common support tickets by providing an automated self-service portal for "Returns & Refunds" and "Stock Availability" inquiries.

## Features
- **Returns & Refunds**: Customers can check the eligibility, return status, and refund status of their orders.
- **Stock Availability**: Customers can verify if a product or a specific variant is currently in stock.

## Technology Stack
- **Frontend**: React, Vite, JavaScript, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Testing**: Jest, Supertest

## Architecture
The application follows a simple client-server architecture:
`React -> Express REST API -> Mongoose -> MongoDB`

## Repository Structure
```
northstar-sprint/
├── backend/          # Express API and Mongoose models
├── frontend/         # React SPA using Vite
├── docs/             # Technical and project documentation
├── README.md         # This file
├── TEAM-CHARTER.md   # Team roles and responsibilities
└── GO-LIVE-NOTE.md   # Deployment readiness note
```

## Installation and Setup

### 1. Database Setup
1. Ensure MongoDB is running locally on port 27017.
2. The database will be created automatically upon connection.

### 2. Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables: `cp .env.example .env`
4. Seed the database with demo data: `npm run seed`
5. Start the backend server: `npm start` (or `npm run dev` for development mode)

### 3. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Configure environment variables: `cp .env.example .env`
4. Start the Vite development server: `npm run dev`

### 4. Testing
- Run backend tests: `cd backend && npm test`

## API Examples
- `GET /api/returns/NS1001` - Returns status for order NS1001.
- `GET /api/stock/P1001` - Returns total stock for product P1001.
- `GET /api/stock/P1001/Size 42` - Returns stock for variant Size 42.

## Demo Workflow
1. Navigate to the React frontend in your browser.
2. Select "Returns & Refunds".
3. Enter `NS1001` to see an eligible, approved return with a completed refund.
4. Select "Stock Availability".
5. Enter `P1001` and `Size 42` to see an in-stock item.
