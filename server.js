require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./ swagger.json');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.REACT_APP_API_URL || '*',
  credentials: true
}));
app.use(express.json());

// For Vercel, we need to handle uploads differently
// Instead of using local filesystem, consider using cloud storage
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Swagger Documentation
app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// For Vercel, we need to export the app
module.exports = app;

// Only start the server if we're not in Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api/docs`);
  });
}
