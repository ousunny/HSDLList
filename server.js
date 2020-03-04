const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Routes
const authRoutes = require('./routes/api/auth');

// Connect Database
connectDB();

// Middleware
app.use(
  express.json({
    extended: false
  })
);

// Define routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
