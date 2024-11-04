// src/components/pipelines/DeploymentHistory.jsx
import React from 'react';
import { Clock, GitBranch, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const DeploymentHistory = ({ builds }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Deployment History</h3>
      
      <div className="space-y-4">
        {builds.map((build) => (
          <div 
            key={build.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              {getStatusIcon(build.status)}
              <div>
                <div className="font-medium text-gray-900">{build.commit}</div>
                <div className="text-sm text-gray-500 flex items-center space-x-2">
                  <span className="flex items-center">
                    <GitBranch className="w-4 h-4 mr-1" />
                    {build.branch}
                  </span>
                  <span>•</span>
                  <span>{formatDate(build.timestamp)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{build.duration}</span>
              <span className="text-sm text-gray-600">by {build.triggeredBy}</span>
              <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Load More History
        </button>
      </div>
    </div>
  );
};

export default DeploymentHistory;