// backend/routes/services.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const service = new Service({
    name: req.body.name,
    type: req.body.type,
    status: req.body.status,
    description: req.body.description,
    owner: req.body.owner
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add other CRUD operations...

module.exports = router;