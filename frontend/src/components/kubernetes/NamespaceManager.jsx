// src/components/kubernetes/NamespaceManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Plus, 
  Trash2, 
  Edit, 
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

const NamespaceManager = () => {
  const [namespaces, setNamespaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data
  const mockNamespaces = [
    {
      name: 'default',
      status: 'active',
      created: '2024-03-01T10:00:00Z',
      resourceQuota: {
        cpu: { used: '500m', limit: '1000m' },
        memory: { used: '1Gi', limit: '2Gi' },
        pods: { used: 5, limit: 10 }
      },
      labels: { environment: 'production', team: 'platform' }
    },
    {
      name: 'monitoring',
      status: 'active',
      created: '2024-03-01T10:00:00Z',
      resourceQuota: {
        cpu: { used: '200m', limit: '500m' },
        memory: { used: '512Mi', limit: '1Gi' },
        pods: { used: 3, limit: 5 }
      },
      labels: { environment: 'production', team: 'devops' }
    }
  ];

  useEffect(() => {
    const fetchNamespaces = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNamespaces(mockNamespaces);
      } catch (error) {
        console.error('Failed to fetch namespaces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNamespaces();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'terminating':
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getResourceUsagePercentage = (used, limit) => {
    const usedValue = parseInt(used);
    const limitValue = parseInt(limit);
    return (usedValue / limitValue) * 100;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Namespaces</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Namespace
        </button>
      </div>

      {/* Namespaces List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {namespaces.map((namespace) => (
            <div
              key={namespace.name}
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="p-6">
                {/* Namespace Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(namespace.status)}
                    <h3 className="text-lg font-medium text-gray-900">
                      {namespace.name}
                    </h3>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Resource Usage */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* CPU Usage */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">CPU</span>
                      <span className="text-gray-900">
                        {namespace.resourceQuota.cpu.used} / {namespace.resourceQuota.cpu.limit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2"
                        style={{
                          width: `${getResourceUsagePercentage(
                            namespace.resourceQuota.cpu.used,
                            namespace.resourceQuota.cpu.limit
                          )}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Memory Usage */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Memory</span>
                      <span className="text-gray-900">
                        {namespace.resourceQuota.memory.used} / {namespace.resourceQuota.memory.limit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 rounded-full h-2"
                        style={{
                          width: `${getResourceUsagePercentage(
                            namespace.resourceQuota.memory.used,
                            namespace.resourceQuota.memory.limit
                          )}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Pods Usage */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Pods</span>
                      <span className="text-gray-900">
                        {namespace.resourceQuota.pods.used} / {namespace.resourceQuota.pods.limit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 rounded-full h-2"
                        style={{
                          width: `${(namespace.resourceQuota.pods.used / namespace.resourceQuota.pods.limit) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Labels</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(namespace.labels).map(([key, value]) => (
                      <span
                        key={key}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NamespaceManager;