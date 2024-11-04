import React from 'react';
import { Settings, Trash2 } from 'lucide-react';
import { ClusterMetrics } from './ClusterMetrics';
import { HealthStatus } from './HealthStatus';
import type { KubernetesCluster } from '@/types/kubernetes';

interface ClusterCardProps {
  cluster: KubernetesCluster;
}

export function ClusterCard({ cluster }: ClusterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            cluster.status === 'healthy' ? 'bg-green-500' : 
            cluster.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <h3 className="text-lg font-medium">{cluster.name}</h3>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Trash2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-500">Provider</label>
          <div className="font-medium">{cluster.provider}</div>
        </div>
        <div>
          <label className="text-sm text-gray-500">Version</label>
          <div className="font-medium">{cluster.version}</div>
        </div>
        <div>
          <label className="text-sm text-gray-500">Nodes</label>
          <div className="font-medium">{cluster.metrics.nodes}</div>
        </div>
        <div>
          <label className="text-sm text-gray-500">Pods</label>
          <div className="font-medium">
            {cluster.metrics.pods.running} / {cluster.metrics.pods.total}
          </div>
        </div>
      </div>

      <ClusterMetrics metrics={cluster.metrics} />
      
      {cluster.healthIssues.length > 0 && (
        <div className="mt-4">
          <HealthStatus issues={cluster.healthIssues} />
        </div>
      )}
    </div>
  );
}