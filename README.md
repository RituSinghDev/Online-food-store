# GoFood - MERN Stack Food Delivery Application

A full-stack food delivery application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

The project is organized into two main directories:

- `frontend/`: Contains the React frontend application
- `backend/`: Contains the Express backend API

## Features

- User authentication (register, login, profile)
- Food item browsing with filtering by category
- Food item details view
- Shopping cart functionality
- Checkout process
- Order history and tracking
- Order cancellation
- Profile management

## Tech Stack

- **Frontend**: React, React Router, Bootstrap, Context API
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)

### Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mernapp
   ```

2. Install root dependencies:
   ```
   npm install
   ```

3. Install frontend and backend dependencies:
   ```
   npm run install-both
   ```

4. Create a `.env` file in the `backend` directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/gofood
   PORT=5000
   JWT_SECRET=your-secret-key
   ```

5. Import sample data:
   ```
   npm run data:import
   ```

## Running the Application

### Development Mode

To run both frontend and backend in development mode:

```
npm run dev
```

This will start the backend server on port 5000 and the frontend development server on port 3000.

### Backend Only

```
npm run server
```

### Frontend Only

```
npm run client
```

## API Endpoints

### Food Items
- `GET /api/food-items`: Get all food items
- `GET /api/food-items/:id`: Get a specific food item
- `GET /api/food-items/category/:category`: Get food items by category
- `POST /api/food-items`: Create a new food item (admin)

### Users
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Authenticate a user
- `GET /api/users/profile`: Get user profile (protected)
- `PUT /api/users/profile`: Update user profile (protected)

### Orders
- `POST /api/orders`: Create a new order (protected)
- `GET /api/orders/myorders`: Get user's orders (protected)
- `GET /api/orders/:id`: Get specific order (protected)
- `PUT /api/orders/:id/cancel`: Cancel an order (protected)

## License

ISC 