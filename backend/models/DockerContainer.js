// backend/models/DockerContainer.js
const containerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    status: String,
    ports: [String],
    networks: [String],
    resources: {
      cpu: String,
      memory: String
    },
    metadata: {
      created: { type: Date, default: Date.now },
      updated: { type: Date, default: Date.now }
    }
  });
  
  module.exports = mongoose.model('DockerContainer', containerSchema);