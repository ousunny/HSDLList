const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Routes
const authRoutes = require('./routes/api/auth');
const usersRoutes = require('./routes/api/users');

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
app.use('/api/users', usersRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
