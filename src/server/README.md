# Multi-Tenant SaaS Express Backend with DynamoDB

This Express.js backend supports multi-tenant SaaS architecture with AWS DynamoDB integration.

## Features

- Multi-tenant user management with DynamoDB
- CORS enabled for frontend integration
- Serverless-ready for AWS Lambda deployment
- RESTful API endpoints for user management

## Setup

### Prerequisites

- Node.js (v14 or higher)
- AWS Account with DynamoDB access
- AWS credentials configured (via AWS CLI, environment variables, or IAM roles)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure AWS credentials:
```bash
# Option 1: AWS CLI
aws configure

# Option 2: Environment variables
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_REGION=us-east-1
```

3. Create DynamoDB table:
```bash
aws dynamodb create-table \
    --table-name TenantsTable \
    --attribute-definitions \
        AttributeName=tenantID,AttributeType=S \
        AttributeName=userID,AttributeType=S \
    --key-schema \
        AttributeName=tenantID,KeyType=HASH \
        AttributeName=userID,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST
```

### Running the Application

```bash
# Development
npm start

# The server will start on port 3001 (or PORT environment variable)
```

## API Endpoints

### POST /api/signup
Create a new user for a tenant.

**Request Body:**
```json
{
  "tenantID": "tenant123",
  "userID": "user456",
  "password": "securepassword",
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully"
}
```

### POST /api/login
Validate user credentials.

**Request Body:**
```json
{
  "tenantID": "tenant123",
  "userID": "user456",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "tenantID": "tenant123",
    "userID": "user456",
    "data": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### GET /api/tenant/:tenantID
Get all users for a specific tenant.

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "tenantID": "tenant123",
      "userID": "user456",
      "data": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## DynamoDB Schema

The `TenantsTable` uses the following schema:
- **Partition Key**: `tenantID` (String)
- **Sort Key**: `userID` (String)
- **Attributes**:
  - `password` (String) - User password
  - `data` (Map) - Additional user data
  - `createdAt` (String) - ISO timestamp
  - `updatedAt` (String) - ISO timestamp

## CORS Configuration

The application is configured to allow requests from `http://localhost:3000` for frontend integration.

## Serverless Deployment

For AWS Lambda deployment, use the `lambda.js` file:

```javascript
const serverless = require('serverless-http');
const app = require('./app');

module.exports.handler = serverless(app);
```

## Security Notes

- Passwords are stored in plain text in this implementation. In production, use proper password hashing (bcrypt, scrypt, etc.)
- Implement proper authentication middleware for protected routes
- Add input validation and sanitization
- Use HTTPS in production
- Implement rate limiting and request validation

## Environment Variables

- `AWS_REGION`: AWS region for DynamoDB (default: us-east-1)
- `PORT`: Server port (default: 3001)

