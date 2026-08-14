# Northstar Retail Co. — Support Deflection MVP

## Project Overview

Northstar Retail Co. is a mid-size e-commerce company whose support
team receives a high volume of repetitive customer questions.

For this sprint, our team was tasked with developing a Support
Deflection MVP capable of reducing manual handling of at least two
customer support categories.

The team selected:

1. Returns & Refunds
2. Stock Availability

The MVP provides self-service functionality that allows customers to
obtain information without requiring a support agent for every
request.

---

## Live Deployment

The application is currently live and can be accessed at the following links:

- **Frontend (Vercel):** [https://northstar-sprint-assistant.vercel.app/](https://northstar-sprint-assistant.vercel.app/)
- **Backend API (Render):** [https://northstar-sprint-d1wc.onrender.com](https://northstar-sprint-d1wc.onrender.com)
- **Database:** MongoDB Atlas

---

## Sprint Context

This project was completed as part of a one-week industry working
simulation with a highly constrained delivery timeline.

Due to the limited time available to the team, building the entire
application independently from an empty repository would have
introduced unnecessary setup and integration overhead and reduced the
time available for testing, collaboration, and delivery.

Therefore, during the initial virtual team working session, the
repository administrator established a common technical baseline for
the project.

The baseline provided the team with:

- Initial application structure
- Core MERN configuration
- Initial database integration
- Initial frontend structure
- Initial backend structure
- Initial MVP functionality

This baseline was treated as the team's common starting point rather
than as the completed contribution of an individual member.

Following the baseline setup, the team divided the remaining
implementation, testing, integration, documentation, and deployment
work among the five members.

---

## Collaborative Development Approach

After establishing the baseline, the team worked through GitHub using
individual branches and assigned tasks.

The team responsibilities were divided as follows:

| Member | Responsibility |
|---|---|
| Member 1 | Team Lead + Backend/API |
| Member 2 | Frontend/UI |
| Member 3 | Database + Business Logic |
| Member 4 | Testing / QA |
| Member 5 | DevOps + Documentation |

Each member was assigned specific tasks through the GitHub Project
Board.

Members were expected to:

1. Work on their assigned task.
2. Make meaningful changes to the project.
3. Test their changes.
4. Commit their work using the agreed commit convention.
5. Push their branch to GitHub.
6. Create or participate in Pull Request reviews.
7. Keep the Project Board status synchronized with their work.

---

## Git Branch Structure

The project uses separate branches for major areas of responsibility:

```text
main
│
├── feature/backend-api
├── feature/frontend
├── feature/database
├── test/mvp-testing
└── docs/devops
```

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
You can test the application using the following mock data pre-loaded into the database:

**Returns & Refunds:**
- **Completed Return:** Enter Order ID `NS1001` (Shows an eligible, approved return with a completed refund).
- **Rejected Return:** Enter Order ID `NS1002` (Shows an ineligible, rejected return).
- **Pending Refund:** Enter Order ID `NS1003` (Shows an approved return with a pending refund).
- **In Transit Return:** Enter Order ID `NS2001` (Shows an eligible return that is currently in transit).
- **Processing Return:** Enter Order ID `NS2002` (Shows an eligible return currently processing).
- **Received & Processing Refund:** Enter Order ID `NS2003` (Shows a received return where the refund is processing).
- **Ineligible (Past Window):** Enter Order ID `NS2004` (Shows an ineligible return because it is past 30 days).
- **Invalid/Error Data:** Enter Order ID `NS9999` (Shows an error that the order was not found).

**Stock Availability:**
- **In Stock (Shoes):** Enter Product ID `P1001` and Variant `Size 42` (Shows 6 in stock).
- **Out of Stock (Shoes):** Enter Product ID `P1001` and Variant `Size 44` (Shows an out-of-stock error).
- **In Stock (Apparel):** Enter Product ID `P1002` and Variant `Medium` (Shows 10 in stock).
- **In Stock (Parka):** Enter Product ID `P2001` and Variant `Large` (Shows 15 in stock).
- **Low Stock (Parka):** Enter Product ID `P2001` and Variant `Medium` (Shows 2 in stock).
- **In Stock (Yoga Mat):** Enter Product ID `P2002` and Variant `One Size` (Shows 45 in stock).
- **Invalid Product:** Enter Product ID `P9999` (Shows an error that the product was not found).
