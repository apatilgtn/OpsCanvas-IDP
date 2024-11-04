// src/components/docker/DockerManagement.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Shield, 
  Database,
  RefreshCw,
  Play,
  Pause,
  RotateCw,
  Trash2,
  Search,
  Timer,
  HardDrive,
  Clock
} from 'lucide-react';

const DockerManagement = () => {
  const [activeTab, setActiveTab] = useState('containers');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'containers', label: 'Containers', icon: Box },
    { id: 'images', label: 'Images', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'registry', label: 'Registry', icon: Database }
  ];

  // Mock container data
  const containers = [
    {
      name: 'frontend-app-1',
      image: 'frontend-app:latest',
      status: 'healthy',
      stats: {
        cpu: '0.5%',
        memory: '256MB / 512MB',
        uptime: '2 days',
        created: '02/03/2024, 9:00:00 pm'
      },
      network: 'frontend-network',
      ports: '80:80'
    },
    {
      name: 'backend-api-1',
      image: 'backend-api:v1.2.3',
      status: 'unhealthy',
      stats: {
        cpu: '0%',
        memory: '0MB / 1024MB',
        uptime: '0',
        created: '02/03/2024, 2:30:00 am'
      },
      network: 'backend-network',
      ports: '3000:3000'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header with Title and Search */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Docker</h1>
          <p className="text-sm text-gray-500">Manage Docker images and repositories</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Container List */}
      {activeTab === 'containers' && (
        <div className="space-y-4">
          {containers.map((container, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      {container.name}
                      <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        container.status === 'healthy' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {container.status}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500">Image: {container.image}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {container.status === 'healthy' ? (
                    <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                      <Pause className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-100">
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                    <RotateCw className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">CPU Usage</p>
                    <p className="text-sm text-gray-900">{container.stats.cpu}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Memory</p>
                    <p className="text-sm text-gray-900">{container.stats.memory}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Uptime</p>
                    <p className="text-sm text-gray-900">{container.stats.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Box className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="text-sm text-gray-900">{container.stats.created}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Network</p>
                  <p className="text-sm text-gray-900">{container.network}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ports</p>
                  <p className="text-sm text-gray-900">{container.ports}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DockerManagement;