// src/components/pipelines/EnvironmentStatus.jsx
import React from 'react';
import { 
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpCircle
} from 'lucide-react';

const EnvironmentStatus = ({ environment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'deploying':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'deploying':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <ArrowUpCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const color = getStatusColor(environment.status);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {environment.name}
          </h3>
          {getStatusIcon(environment.status)}
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className={`text-${color}-500 capitalize`}>
              {environment.status}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Version</span>
            <span className="text-gray-900">{environment.version}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last Deployment</span>
            <span className="text-gray-900">
              {new Date(environment.lastDeployment).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Uptime</span>
            <span className="text-gray-900">{environment.uptime}</span>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentStatus;