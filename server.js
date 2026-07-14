require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Connect to MongoDB Atlas database
connectDB();

// Basic health check route endpoint
app.get('/', (req, res) => {
  res.send('MVC Course Management API is running perfectly...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
