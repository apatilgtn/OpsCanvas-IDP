// backend/models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  description: String,
  metadata: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  owner: { type: String, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);