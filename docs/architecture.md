# Application Architecture

The Northstar Support Deflection MVP uses the MERN stack in a simple, monolithic client-server pattern.

## High-Level Flow
```
Customer Browser (React UI) 
       ↓ HTTP GET
Express.js REST API Server
       ↓ Mongoose Queries
MongoDB Database
```

## Frontend (React + Vite)
- **Role**: Provides the user interface, handles input validation, sends requests to the backend, and displays results.
- **Structure**: Uses a component-based architecture with distinct forms for Returns and Stock, a central API service for fetching, and a responsive CSS layout.

## Backend (Node.js + Express)
- **Role**: Serves as the REST API, processes business logic, and handles data retrieval.
- **Structure**: 
  - `routes/`: Defines API endpoints and routes requests to controllers.
  - `controllers/`: Handles request parsing, triggers services, and formats HTTP responses.
  - `services/`: Contains core business logic (e.g., determining return eligibility based on order status).
  - `models/`: Defines the data schema using Mongoose.

## Database (MongoDB)
- **Role**: Stores all persistent data including customers, orders, returns, products, and inventory.
- **Schema**: Highly normalized structure for the MVP to allow independent updates to inventory and return records.
