require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

// Import routes
const clientRoutes = require('./routes/clientRoutes');
const roomRoutes = require('./routes/roomRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/bookings', bookingRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Music Studio Information System API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
