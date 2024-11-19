require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./ swagger.json')

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const connectDB = require('./config/db');

const app = express()
// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Update the static middleware to use /tmp/uploads
app.use('/uploads', express.static(path.join('/tmp', 'uploads')));

// Swagger Documentation
app.use('/api/docs', swaggerUi.serve);
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);


// Ensure the uploads directory exists inside /tmp
const fs = require('fs');
const uploadDir = path.join('/tmp', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const multer = require('multer');
// Configure storage for multer to store files in the /tmp/uploads directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store files in /tmp/uploads
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep the original file name
    }
});
const upload = multer({ storage });
// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});
// Home route
app.get("/", (req, resp) => {
    resp.status(200).json("Welcome to Backend server");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;   // Default to 3000 if not defined
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api/docs`);
});