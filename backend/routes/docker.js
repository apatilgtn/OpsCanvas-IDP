// backend/routes/docker.js
const express = require('express');
const router = express.Router();
const DockerContainer = require('../models/DockerContainer');

router.get('/containers', async (req, res) => {
  try {
    const containers = await DockerContainer.find();
    res.json(containers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add other Docker-related routes...

module.exports = router;