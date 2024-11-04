import React from 'react';
import { AlertTriangle, AlertOctagon } from 'lucide-react';
import type { HealthIssue } from '@/types/kubernetes';

interface HealthStatusProps {
  issues: HealthIssue[];
}

export function HealthStatus({ issues }: HealthStatusProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-500">Health Issues</h4>
      <div className="space-y-2">
        {issues.map((issue, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 p-3 rounded-lg ${
              issue.severity === 'warning' ? 'bg-yellow-50' : 'bg-red-50'
            }`}
          >
            {issue.severity === 'warning' ? (
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            ) : (
              <AlertOctagon className="w-5 h-5 text-red-500 flex-shrink-0" />
            )}
            <div>
              <p className={`text-sm ${
                issue.severity === 'warning' ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {issue.message}
              </p>
              {issue.nodeId && (
                <p className="text-sm text-gray-500">Node: {issue.nodeId}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}