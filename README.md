# 🚗 Car Management API

A robust RESTful API built with Node.js for managing car listings, featuring JWT authentication, image handling, and advanced search capabilities.

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **🔐 Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Secure password hashing
  - Token refresh mechanism

- **🚙 Car Management**
  - CRUD operations for car listings
  - Image upload with validation
  - Advanced filtering and search
  - Pagination and sorting
  - Tag-based categorization

- **📁 File Handling**
  - Multi-image upload support
  - Image optimization
  - Secure file storage
  - File type validation

- **🔍 Search Capabilities**
  - Full-text search
  - Filter by multiple parameters
  - Tag-based search
  - Price range filtering

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Image Processing:** Multer
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest
- **Validation:** Joi
- **ODM:** Mongoose

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

## 💻 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/car-management-api.git

# Navigate to project directory
cd car-management-api

# Install dependencies
npm install

# Install development dependencies
npm install --save-dev
```

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
MONGO_DB_NAME=car_management

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
UPLOAD_PATH=./uploads

# API Configuration
API_PREFIX=/api/v1
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Cors Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 🚀 Getting Started

```bash
# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Generate API documentation
npm run docs
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### 🔑 Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### 🔓 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Car Management Endpoints

#### 🚗 Create Car
```http
POST /cars
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "string",
  "description": "string",
  "price": "number",
  "tags": {
    "car_type": "string",
    "company": "string",
    "dealer": "string"
  },
  "images": "file[]"
}
```

#### 📋 Get All Cars
```http
GET /cars
Authorization: Bearer <token>
Query Parameters:
  - search: string
  - tags: object
  - page: number
  - limit: number
  - sort: string
```

#### 🔍 Get Car by ID
```http
GET /cars/:id
Authorization: Bearer <token>
```

#### ✏️ Update Car
```http
PATCH /cars/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### 🗑️ Delete Car
```http
DELETE /cars/:id
Authorization: Bearer <token>
```

## 💾 Database Schema

### User Schema
```javascript
{
  username: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Car Schema
```javascript
{
  title: String,
  description: String,
  price: Number,
  images: [String],
  tags: {
    car_type: String,
    company: String,
    dealer: String
  },
  owner: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- auth.test.js

# Generate coverage report
npm run test:coverage
```

## 🌐 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

Your Name
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the robust database
- All contributors who have helped with the project
