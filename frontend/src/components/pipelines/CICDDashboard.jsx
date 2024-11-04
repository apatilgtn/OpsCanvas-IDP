// src/components/pipelines/CICDDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import PipelineStats from './PipelineStats';
import BuildMetrics from './BuildMetrics';

const CICDDashboard = () => {
  const [pipelineData, setPipelineData] = useState({
    recentBuilds: [],
    stats: {
      totalBuilds: 156,
      successRate: 94.2,
      averageDuration: '6m 15s',
      failureRate: 5.8,
      deploymentFrequency: 'Daily'
    }
  });

  // Simulated real-time data
  const mockPipelineData = {
    recentBuilds: [
      {
        id: 'build-123',
        branch: 'main',
        commit: 'feat: Add new dashboard features',
        status: 'success',
        duration: '5m 30s',
        timestamp: '2024-03-04T10:30:00Z',
        triggeredBy: 'John Doe'
      },
      {
        id: 'build-122',
        branch: 'feature/api-update',
        commit: 'fix: API response handling',
        status: 'failed',
        duration: '4m 15s',
        timestamp: '2024-03-04T10:15:00Z',
        triggeredBy: 'Jane Smith'
      }
    ]
  };

  useEffect(() => {
    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      setPipelineData(prevData => ({
        ...mockPipelineData,
        stats: {
          ...prevData.stats
        }
      }));
    }, 5000);

    return () => clearInterval(updateInterval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <PipelineStats stats={pipelineData.stats} />
      </div>

      {/* Recent Builds */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Builds</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {pipelineData.recentBuilds.map((build) => (
              <div 
                key={build.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(build.status)}
                  <div>
                    <div className="font-medium text-gray-900">{build.commit}</div>
                    <div className="text-sm text-gray-500">
                      <span className="flex items-center">
                        <GitBranch className="w-4 h-4 mr-1" />
                        {build.branch}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{build.duration}</span>
                  <span>{new Date(build.timestamp).toLocaleTimeString()}</span>
                  <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Build Metrics */}
      <div className="mt-6">
        <BuildMetrics stats={pipelineData.stats} />
      </div>
    </div>
  );
};

export default CICDDashboard;