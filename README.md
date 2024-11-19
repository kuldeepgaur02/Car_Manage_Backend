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


## API Documentation

This project uses Swagger for API documentation. Access the interactive API documentation at:

```
http://localhost:5000/api/docs
```

## API Endpoints

### Authentication

#### Register
- **Method**: POST
- **Endpoint**: `/api/auth/register`

#### Login
- **Method**: POST
- **Endpoint**: `/api/auth/login`

### Car Management

#### Create Car
- **Method**: POST
- **Endpoint**: `/api/cars`
- **Example**:
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "title=Car Model X" \
  -F "description=A high-end sports car" \
  -F "tags[car_type]=Sports" \
  -F "tags[company]=CarCo" \
  -F "tags[dealer]=XYZ Motors" \
  -F "images=@path/to/image.jpg"
```

#### Get All Cars
- **Method**: GET
- **Endpoint**: `/api/cars?search=keyword`
- **Example**:
```bash
curl -X GET http://localhost:5000/api/cars?search=Sports \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Get a Car by ID
- **Method**: GET
- **Endpoint**: `/api/cars/:id`
- **Example**:
```bash
curl -X GET http://localhost:5000/api/cars/<car_id> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Update a Car
- **Method**: PATCH
- **Endpoint**: `/api/cars/:id`
- **Example**:
```bash
curl -X PATCH http://localhost:5000/api/cars/<car_id> \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "title=Updated Model" \
  -F "tags[car_type]=Luxury"
```

#### Delete a Car
- **Method**: DELETE
- **Endpoint**: `/api/cars/:id`
- **Example**:
```bash
curl -X DELETE http://localhost:5000/api/cars/<car_id> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Screenshots

## Swagger UI

### Swagger UI Example
![Swagger UI](./images/1.png)

### Swagger Auth
![Swagger Auth](./images/2.png)

### Swagger Cars
![Swagger Cars](./images/3.png)

### Swagger Schema
![Swagger Schema](./images/4.png)



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



## 👨‍💻 Author

Your Name
Kuldeep Gour 
kuldeepgour002@gmail.com

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the robust database
