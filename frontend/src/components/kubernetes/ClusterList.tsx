import React from 'react';
import { AlertTriangle, Settings, Trash } from 'lucide-react';
import type { KubernetesCluster } from '@/types/kubernetes';

const mockClusters: KubernetesCluster[] = [
  {
    id: 'prod',
    name: 'production-cluster',
    provider: 'AKS',
    version: '1.25.6',
    status: 'healthy',
    metrics: {
      nodes: 5,
      pods: { running: 48, total: 60 },
      cpu: { used: 65, total: 100 },
      memory: { used: 75, total: 128 }
    }
  },
  {
    id: 'staging',
    name: 'staging-cluster',
    provider: 'GKE',
    version: '1.24.12',
    status: 'warning',
    metrics: {
      nodes: 3,
      pods: { running: 28, total: 40 },
      cpu: { used: 45, total: 60 },
      memory: { used: 35, total: 64 }
    },
    healthIssues: [
      { message: 'High memory usage in node-2', nodeId: 'node-2' }
    ]
  }
];

export function ClusterList() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-white">Kubernetes Clusters</h2>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-xs text-white rounded-md hover:bg-blue-700">
          + Add Cluster
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockClusters.map((cluster) => (
          <div 
            key={cluster.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    cluster.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm font-medium">{cluster.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <Trash className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500">Provider</div>
                  <div className="text-sm">{cluster.provider}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Version</div>
                  <div className="text-sm">{cluster.version}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Nodes</div>
                  <div className="text-sm">{cluster.metrics.nodes}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Pods</div>
                  <div className="text-sm">
                    {cluster.metrics.pods.running} / {cluster.metrics.pods.total}
                  </div>
                </div>
              </div>

              {/* Resource Usage Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">CPU Usage</span>
                    <span>
                      {cluster.metrics.cpu.used}GB / {cluster.metrics.cpu.total}GB
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${(cluster.metrics.cpu.used / cluster.metrics.cpu.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Memory Usage</span>
                    <span>
                      {cluster.metrics.memory.used}GB / {cluster.metrics.memory.total}GB
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${(cluster.metrics.memory.used / cluster.metrics.memory.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Health Issues */}
              {cluster.healthIssues && cluster.healthIssues.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs text-gray-500 mb-2">Health Issues</div>
                  {cluster.healthIssues.map((issue, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-2 bg-yellow-50 rounded-md"
                    >
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-yellow-700">{issue.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}