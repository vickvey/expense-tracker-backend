# Personal Finance Tracker REST API

A TypeScript-based REST API for tracking expenses, built with Express, Mongoose, and Zod for server-side validation.

## Features
- User authentication and management
- Category and transaction tracking
- Type-safe server-side validation with Zod
- Centralized error handling with custom error class and middleware
- MongoDB integration with Mongoose

## Setup
1. Clone the repository: `git clone https://github.com/vickvey/expense-tracker-backend.git`
2. Install dependencies: `pnpm install`
3. Copy the example env file:   
    ```bash
    cp .env.example .env.development.local  
    ```
4. Run: `npm start`

## API Routers
- `Router /api/v1/auth`: Auth Related
- `Router /api/v1/user`: User Related
- `Router /api/v1/category`: Category Related
- `Router /api/v1/transaction`: Transaction Related

## Technologies
- TypeScript, Express, Mongoose, Zod
- MongoDB
