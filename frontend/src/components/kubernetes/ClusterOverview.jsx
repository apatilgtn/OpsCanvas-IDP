// src/components/kubernetes/ClusterOverview.jsx
import React from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Plus,
  RefreshCw,
  Settings,
  Trash2
} from 'lucide-react';

const ClusterOverview = ({ clusters }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-gray-500" />;
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="p-6">
      {/* Actions Bar */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Kubernetes Clusters</h2>
        <div className="space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Cluster
          </button>
        </div>
      </div>

      {/* Clusters Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {clusters.map((cluster) => (
          <div
            key={cluster.id}
            className="bg-white overflow-hidden shadow rounded-lg border border-gray-200"
          >
            {/* Cluster Header */}
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(cluster.status)}
                  <h3 className="ml-2 text-lg font-medium text-gray-900">
                    {cluster.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Cluster Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Provider</p>
                  <p className="mt-1 text-sm text-gray-900">{cluster.provider}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Version</p>
                  <p className="mt-1 text-sm text-gray-900">{cluster.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nodes</p>
                  <p className="mt-1 text-sm text-gray-900">{cluster.nodes}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pods</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {cluster.pods.running} / {cluster.pods.total}
                  </p>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">CPU Usage</span>
                    <span className="text-sm text-gray-700">
                      {cluster.cpu.used}GB / {cluster.cpu.total}GB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getProgressColor((cluster.cpu.used / cluster.cpu.total) * 100)} rounded-full h-2`}
                      style={{ width: `${(cluster.cpu.used / cluster.cpu.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-500">Memory Usage</span>
                    <span className="text-sm text-gray-700">
                      {cluster.memory.used}GB / {cluster.memory.total}GB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getProgressColor((cluster.memory.used / cluster.memory.total) * 100)} rounded-full h-2`}
                      style={{ width: `${(cluster.memory.used / cluster.memory.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Health Issues */}
              {cluster.health.issues.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Health Issues</p>
                  <div className="space-y-2">
                    {cluster.health.issues.map((issue, index) => (
                      <div key={index} className="flex items-center text-sm text-yellow-700 bg-yellow-50 px-3 py-2 rounded-md">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClusterOverview;