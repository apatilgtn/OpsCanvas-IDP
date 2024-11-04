// src/components/docker/ContainerList.jsx
import React, { useState } from 'react';
import { 
  Play,
  Square,
  RefreshCw,
  Trash2,
  Terminal,
  Activity,
  Cpu,
  HardDrive,
  Pause,
  RotateCw,
  AlertCircle
} from 'lucide-react';

const ContainerList = ({ searchTerm }) => {
  const [containers] = useState([
    {
      id: 'cont1',
      name: 'frontend-app-1',
      image: 'frontend-app:latest',
      status: 'running',
      uptime: '2 days',
      cpu: '0.5%',
      memory: '256MB / 512MB',
      ports: '80:80',
      network: 'frontend-network',
      created: '2024-03-02T10:00:00Z',
      healthCheck: 'healthy',
      logs: []
    },
    {
      id: 'cont2',
      name: 'backend-api-1',
      image: 'backend-api:v1.2.3',
      status: 'stopped',
      uptime: '0',
      cpu: '0%',
      memory: '0MB / 1024MB',
      ports: '3000:3000',
      network: 'backend-network',
      created: '2024-03-01T15:30:00Z',
      healthCheck: 'unhealthy',
      logs: []
    },
    {
      id: 'cont3',
      name: 'redis-cache',
      image: 'redis:6-alpine',
      status: 'running',
      uptime: '5 days',
      cpu: '0.2%',
      memory: '128MB / 256MB',
      ports: '6379:6379',
      network: 'backend-network',
      created: '2024-02-28T12:00:00Z',
      healthCheck: 'healthy',
      logs: []
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'text-green-500';
      case 'stopped':
        return 'text-red-500';
      case 'restarting':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <Activity className="w-5 h-5 text-green-500" />;
      case 'stopped':
        return <Square className="w-5 h-5 text-red-500" />;
      case 'restarting':
        return <RotateCw className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getHealthCheckBadge = (health) => {
    const colors = {
      healthy: 'bg-green-100 text-green-800',
      unhealthy: 'bg-red-100 text-red-800',
      starting: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[health] || 'bg-gray-100 text-gray-800'}`}>
        {health}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleAction = (containerId, action) => {
    console.log(`${action} container ${containerId}`);
    // Implement container actions here
  };

  const filteredContainers = containers.filter(container =>
    container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    container.image.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {filteredContainers.map(container => (
        <div
          key={container.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="p-6">
            {/* Container Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {getStatusIcon(container.status)}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {container.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Image: {container.image}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getHealthCheckBadge(container.healthCheck)}
                <div className="flex space-x-2 ml-4">
                  {container.status === 'running' ? (
                    <button
                      onClick={() => handleAction(container.id, 'stop')}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Stop Container"
                    >
                      <Square className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction(container.id, 'start')}
                      className="p-2 text-gray-400 hover:text-green-600"
                      title="Start Container"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(container.id, 'restart')}
                    className="p-2 text-gray-400 hover:text-yellow-600"
                    title="Restart Container"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAction(container.id, 'logs')}
                    className="p-2 text-gray-400 hover:text-blue-600"
                    title="View Logs"
                  >
                    <Terminal className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAction(container.id, 'delete')}
                    className="p-2 text-gray-400 hover:text-red-600"
                    title="Delete Container"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Container Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Cpu className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">CPU Usage</p>
                    <p className="text-sm text-gray-900">{container.cpu}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <HardDrive className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Memory</p>
                    <p className="text-sm text-gray-900">{container.memory}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Uptime</p>
                    <p className="text-sm text-gray-900">{container.uptime}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <RefreshCw className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="text-sm text-gray-900">{formatDate(container.created)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Container Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Network</p>
                <p className="mt-1 text-sm text-gray-900">{container.network}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ports</p>
                <p className="mt-1 text-sm text-gray-900">{container.ports}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerList;