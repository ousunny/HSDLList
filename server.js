const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const PORT = process.env.PORT || 5000;

// Routes
const authRoutes = require('./routes/api/auth');
const usersRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const seriesRoutes = require('./routes/api/series');

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
app.use('/api/profile', profileRoutes);
app.use('/api/series', seriesRoutes);

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
