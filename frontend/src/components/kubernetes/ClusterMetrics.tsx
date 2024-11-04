import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { ClusterMetrics as ClusterMetricsType } from '@/types/kubernetes';

interface ClusterMetricsProps {
  metrics: ClusterMetricsType;
}

export function ClusterMetrics({ metrics }: ClusterMetricsProps) {
  const cpuPercentage = (metrics.cpu.used / metrics.cpu.total) * 100;
  const memoryPercentage = (metrics.memory.used / metrics.memory.total) * 100;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">CPU Usage</span>
          <span className="text-sm font-medium">
            {metrics.cpu.used}GB / {metrics.cpu.total}GB
          </span>
        </div>
        <ProgressBar 
          value={cpuPercentage} 
          variant={cpuPercentage > 80 ? 'danger' : cpuPercentage > 60 ? 'warning' : 'success'} 
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">Memory Usage</span>
          <span className="text-sm font-medium">
            {metrics.memory.used}GB / {metrics.memory.total}GB
          </span>
        </div>
        <ProgressBar 
          value={memoryPercentage}
          variant={memoryPercentage > 80 ? 'danger' : memoryPercentage > 60 ? 'warning' : 'success'}
        />
      </div>
    </div>
  );
}