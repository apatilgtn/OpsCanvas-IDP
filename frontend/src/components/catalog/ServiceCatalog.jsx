// src/components/catalog/ServiceCatalog.jsx
import React from 'react';
import { 
  Server, 
  GitBranch, 
  Check, 
  AlertTriangle,
  Users,
  Clock,
  Activity,
  Plus,
  Link as LinkIcon
} from 'lucide-react';

const ServiceCatalog = () => {
  const services = [
    {
      id: 1,
      name: 'Authentication Service',
      description: 'Core authentication and authorization service',
      owner: 'Security Team',
      status: 'healthy',
      type: 'microservice',
      lifecycle: 'production',
      dependencies: [
        { name: 'User Service', status: 'healthy' },
        { name: 'Email Service', status: 'healthy' }
      ],
      lastDeployed: '2h ago',
      version: 'v2.1.0',
      metrics: {
        uptime: '99.99%',
        responseTime: '45ms',
        errorRate: '0.01%'
      }
    },
    {
      id: 2,
      name: 'Payment Gateway',
      description: 'Payment processing and transaction management',
      owner: 'Payments Team',
      status: 'warning',
      type: 'microservice',
      lifecycle: 'production',
      dependencies: [
        { name: 'User Service', status: 'healthy' },
        { name: 'Billing Service', status: 'warning' }
      ],
      lastDeployed: '1d ago',
      version: 'v1.5.2',
      metrics: {
        uptime: '99.95%',
        responseTime: '120ms',
        errorRate: '0.05%'
      }
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      healthy: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Catalog</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all services</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add New Service
        </button>
      </div>

      {/* Service List */}
      <div className="grid gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {/* Service Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <Server className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(service.status)}`}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(service.status)}
                  <span className="capitalize">{service.status}</span>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  Owner
                </div>
                <div className="mt-1 text-sm font-medium">{service.owner}</div>
              </div>
              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Version
                </div>
                <div className="mt-1 text-sm font-medium">{service.version}</div>
              </div>
              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Last Deployed
                </div>
                <div className="mt-1 text-sm font-medium">{service.lastDeployed}</div>
              </div>
              <div>
                <div className="flex items-center text-sm text-gray-500">
                  <Activity className="w-4 h-4 mr-2" />
                  Lifecycle
                </div>
                <div className="mt-1 text-sm font-medium capitalize">{service.lifecycle}</div>
              </div>
            </div>

            {/* Service Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">Uptime</div>
                <div className="text-sm font-medium text-gray-900">{service.metrics.uptime}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Avg Response Time</div>
                <div className="text-sm font-medium text-gray-900">{service.metrics.responseTime}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Error Rate</div>
                <div className="text-sm font-medium text-gray-900">{service.metrics.errorRate}</div>
              </div>
            </div>

            {/* Dependencies */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Dependencies</h4>
              <div className="grid grid-cols-2 gap-2">
                {service.dependencies.map((dep, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <LinkIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{dep.name}</span>
                    </div>
                    {getStatusIcon(dep.status)}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                View Metrics
              </button>
              <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                Manage Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCatalog;