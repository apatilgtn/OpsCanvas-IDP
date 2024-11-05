import React from 'react';
import { Tag, Clock, Activity, Shield } from 'lucide-react';

interface API {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'beta' | 'deprecated';
  type: 'internal' | 'public';
  lastUpdated: string;
  tags: string[];
  metrics: {
    requests: number;
    latency: number;
    errorRate: number;
  };
}

const APIList = () => {
  const mockAPIs: API[] = [
    {
      id: '1',
      name: 'User Management API',
      description: 'Core user management and authentication endpoints',
      version: 'v2.1.0',
      status: 'active',
      type: 'internal',
      lastUpdated: '2024-02-15',
      tags: ['core', 'auth', 'users'],
      metrics: {
        requests: 1250000,
        latency: 125,
        errorRate: 0.5
      }
    },
    {
      id: '2',
      name: 'Payment Processing API',
      description: 'Payment processing and transaction management',
      version: 'v1.3.2',
      status: 'beta',
      type: 'internal',
      lastUpdated: '2024-02-10',
      tags: ['payments', 'transactions'],
      metrics: {
        requests: 850000,
        latency: 145,
        errorRate: 0.8
      }
    }
  ];

  const getStatusColor = (status: API['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'beta':
        return 'bg-yellow-100 text-yellow-800';
      case 'deprecated':
        return 'bg-red-100 text-red-800';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="divide-y divide-gray-200">
      {mockAPIs.map((api) => (
        <div key={api.id} className="p-6 hover:bg-gray-50">
          <div className="flex justify-between">
            <div className="flex-1">
              {/* API Header */}
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-medium text-gray-900">{api.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {api.version}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(api.status)}`}>
                  {api.status}
                </span>
              </div>

              {/* Description */}
              <p className="mt-1 text-sm text-gray-500">{api.description}</p>

              {/* Meta Information */}
              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Updated {api.lastUpdated}
                </span>
                <span className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {api.tags.join(', ')}
                </span>
              </div>

              {/* Metrics */}
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center text-xs">
                  <Activity className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="font-medium">{formatNumber(api.metrics.requests)}</span>
                  <span className="ml-1 text-gray-500">requests/month</span>
                </div>
                <div className="flex items-center text-xs">
                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="font-medium">{api.metrics.latency}ms</span>
                  <span className="ml-1 text-gray-500">avg latency</span>
                </div>
                <div className="flex items-center text-xs">
                  <Shield className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="font-medium">{api.metrics.errorRate}%</span>
                  <span className="ml-1 text-gray-500">error rate</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-2 ml-6">
              <button className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-500">
                View Documentation
              </button>
              <button className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-500">
                Test Endpoints
              </button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-500">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default APIList;