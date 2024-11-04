// src/components/docker/RegistryManager.jsx
import React, { useState } from 'react';
import { 
  Server,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

const RegistryManager = ({ registries: initialRegistries }) => {
  const [registries] = useState([
    {
      id: 'reg1',
      name: 'Docker Hub',
      url: 'https://hub.docker.com',
      type: 'dockerhub',
      status: 'connected',
      imageCount: 25,
      lastSync: '2024-03-04T10:30:00Z',
      credentials: {
        username: 'organization',
        configured: true
      }
    },
    {
      id: 'reg2',
      name: 'Azure Container Registry',
      url: 'myregistry.azurecr.io',
      type: 'acr',
      status: 'connected',
      imageCount: 15,
      lastSync: '2024-03-04T09:45:00Z',
      credentials: {
        username: 'serviceaccount',
        configured: true
      }
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'syncing':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getRegistryTypeIcon = (type) => {
    switch (type) {
      case 'dockerhub':
        return 'https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png';
      case 'acr':
        return 'https://azurecomcdn.azureedge.net/cvt-fe62df961bc666c2e82e0e4f895b4255a9365dd3ae4b6b8c0c667354e7b0aced/images/page/services/container-registry/container-registry.svg';
      case 'ecr':
        return 'https://avatars.githubusercontent.com/u/2232217?s=200&v=4';
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Container Registries</h2>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Registry
        </button>
      </div>

      {/* Registries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registries.map((registry) => (
          <div
            key={registry.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="p-6">
              {/* Registry Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Server className="w-6 h-6 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {registry.name}
                    </h3>
                    <p className="text-sm text-gray-500">{registry.url}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(registry.status)}
                </div>
              </div>

              {/* Registry Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Images</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {registry.imageCount}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Sync</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(registry.lastSync).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Registry Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync
                </button>
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistryManager;