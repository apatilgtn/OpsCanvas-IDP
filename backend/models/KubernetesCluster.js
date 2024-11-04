// backend/models/KubernetesCluster.js
const clusterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    provider: { type: String, required: true },
    version: String,
    status: String,
    nodes: [{
      name: String,
      status: String,
      role: String,
      resources: {
        cpu: String,
        memory: String
      }
    }],
    metadata: {
      created: { type: Date, default: Date.now },
      updated: { type: Date, default: Date.now }
    }
  });
  
  module.exports = mongoose.model('KubernetesCluster', clusterSchema);
  