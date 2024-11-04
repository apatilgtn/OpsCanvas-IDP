// backend/routes/kubernetes.js
const express = require('express');
const router = express.Router();
const KubernetesCluster = require('../models/KubernetesCluster');

router.get('/clusters', async (req, res) => {
  try {
    const clusters = await KubernetesCluster.find();
    res.json(clusters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add other Kubernetes-related routes...

module.exports = router;
