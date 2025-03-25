const express = require('express');
const mongoose = require('mongoose');
const galleryRoutes = require('./routes/gallery');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Allow frontend access
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the application if database connection fails
  });

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Products API' });
});

// Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);
app.use('/api/gallery', galleryRoutes); // Mount gallery routes after CORS middleware

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong', details: err.message });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});