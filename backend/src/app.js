const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const featureRoutes = require('./routes/featureRoutes');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running successfully.' });
});

app.use('/api/features', featureRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

module.exports = app;
