require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const returnsRoutes = require('./routes/returns');
const stockRoutes = require('./routes/stock');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/returns', returnsRoutes);
app.use('/api/stock', stockRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Northstar Support Deflection API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Unable to retrieve the requested information' });
});

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
}

module.exports = app;
