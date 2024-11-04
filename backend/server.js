// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cloudedgeops', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import Routes
const serviceRoutes = require('./routes/services');
const kubernetesRoutes = require('./routes/kubernetes');
const dockerRoutes = require('./routes/docker');
const userRoutes = require('./routes/users');

// Use Routes
app.use('/api/services', serviceRoutes);
app.use('/api/kubernetes', kubernetesRoutes);
app.use('/api/docker', dockerRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});