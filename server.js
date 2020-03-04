const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(
  express.json({
    extended: false
  })
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
