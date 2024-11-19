require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');
const connectDB = require('./config/db');

const app = express();
// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve images from /tmp/uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'tmp', 'uploads')));  // Use __dirname for dynamic path

// Swagger Documentation
app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Ensure the uploads directory exists inside /tmp
const fs = require('fs');
const uploadDir = path.join(__dirname, 'tmp', 'uploads');  // Use __dirname to make the path relative
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// File upload configuration with multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store files in /tmp/uploads
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep the original file name
    }
});

const upload = multer({ storage });

// File upload route
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api/docs`);
});
