import React from 'react';
import { 
  Database, 
  HardDrive, 
  Server, 
  Network,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const Resources = () => {
  const resourceTypes = [
    {
      title: 'Databases',
      count: 2,
      icon: Database,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      items: [
        {
          name: 'Production DB',
          type: 'PostgreSQL',
          status: 'healthy',
          specs: { cpu: '4 vCPU', memory: '16GB', storage: '500GB' }
        },
        {
          name: 'Analytics DB',
          type: 'ClickHouse',
          status: 'warning',
          specs: { cpu: '8 vCPU', memory: '32GB', storage: '1TB' }
        }
      ]
    },
    {
      title: 'Storage',
      count: 1,
      icon: HardDrive,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      items: [
        {
          name: 'User Content',
          type: 'S3 Compatible',
          status: 'healthy',
          specs: { capacity: '5TB', used: '3.2TB' }
        }
      ]
    },
    {
      title: 'Compute',
      count: 3,
      icon: Server,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      items: [
        {
          name: 'API Cluster',
          type: 'Kubernetes',
          status: 'healthy',
          specs: { nodes: 5, version: '1.25' }
        }
      ]
    },
    {
      title: 'Network',
      count: 1,
      icon: Network,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      items: [
        {
          name: 'Main VPC',
          type: 'Virtual Network',
          status: 'healthy',
          specs: { cidr: '10.0.0.0/16' }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
          <p className="mt-1 text-gray-600">Manage and monitor your infrastructure resources</p>
        </div>

        {/* Resource Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {resourceTypes.map((type) => (
            <div key={type.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${type.bgColor} rounded-lg`}>
                  <type.icon className={`h-6 w-6 ${type.iconColor}`} />
                </div>
                <span className="text-2xl font-semibold text-gray-900">{type.count}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{type.title}</h3>
            </div>
          ))}
        </div>

        {/* Resource Lists */}
        {resourceTypes.map((type) => (
          <div key={type.title} className="bg-white rounded-lg shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">{type.title}</h2>
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add {type.title.slice(0, -1)}
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {type.items.map((item, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        {item.status === 'healthy' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">Type: {item.type}</p>
                    </div>
                    <div className="text-right">
                      {Object.entries(item.specs).map(([key, value]) => (
                        <p key={key} className="text-sm text-gray-600">
                          <span className="font-medium capitalize">{key}:</span> {value}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;