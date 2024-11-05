import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus,
  Book,
  Activity,
  Clock,
  Tag,
  Settings,
  ExternalLink,
  GitBranch,
  Play,
  FileText,
  Link as LinkIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const APIManagementPage = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const tabs = [
    { id: 'catalog', label: 'API Catalog', icon: Book },
    { id: 'documentation', label: 'Documentation', icon: FileText },
    { id: 'metrics', label: 'Metrics & Usage', icon: Activity },
    { id: 'settings', label: 'Gateway Settings', icon: Settings }
  ];

  // Realistic API data
  const mockAPIs = [
    {
      id: 'user-api',
      name: 'User Management API',
      version: 'v2.1.0',
      status: 'active',
      type: 'internal',
      lastUpdated: '2024-02-15',
      description: 'Core user management and authentication endpoints for user creation, authentication, and profile management.',
      tags: ['core', 'auth', 'users'],
      metrics: {
        requests: '2.5M/month',
        latency: '120ms',
        uptime: '99.99%'
      },
      docs: {
        swagger: 'https://api.cloudedge.dev/user/swagger',
        postman: 'https://www.postman.com/cloudedge/user-api',
        github: 'https://github.com/cloudedge/user-api'
      },
      endpoints: [
        '/api/v2/users',
        '/api/v2/auth',
        '/api/v2/profiles'
      ]
    },
    {
      id: 'payment-api',
      name: 'Payment Processing API',
      version: 'v1.3.2',
      status: 'beta',
      type: 'internal',
      lastUpdated: '2024-02-10',
      description: 'Secure payment processing system supporting multiple payment providers, currencies, and transaction types.',
      tags: ['payments', 'transactions', 'beta'],
      metrics: {
        requests: '1.2M/month',
        latency: '180ms',
        uptime: '99.95%'
      },
      docs: {
        swagger: 'https://api.cloudedge.dev/payment/swagger',
        postman: 'https://www.postman.com/cloudedge/payment-api',
        github: 'https://github.com/cloudedge/payment-api'
      },
      endpoints: [
        '/api/v1/payments',
        '/api/v1/transactions',
        '/api/v1/refunds'
      ]
    },
    {
      id: 'resource-api',
      name: 'Resource Management API',
      version: 'v3.0.1',
      status: 'active',
      type: 'internal',
      lastUpdated: '2024-02-18',
      description: 'Comprehensive API for managing cloud resources, including compute, storage, and networking components.',
      tags: ['resources', 'cloud', 'infrastructure'],
      metrics: {
        requests: '3.8M/month',
        latency: '145ms',
        uptime: '99.98%'
      },
      docs: {
        swagger: 'https://api.cloudedge.dev/resource/swagger',
        postman: 'https://www.postman.com/cloudedge/resource-api',
        github: 'https://github.com/cloudedge/resource-api'
      },
      endpoints: [
        '/api/v3/compute',
        '/api/v3/storage',
        '/api/v3/network'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">API Management</h1>
          <p className="text-sm text-gray-500">Discover, test, and manage your APIs</p>
        </div>
        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New API
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-1 py-4 border-b-2 text-sm font-medium
                ${activeTab === tab.id 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search APIs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <select className="text-sm border border-gray-300 rounded-md p-2">
            <option>All Versions</option>
            <option>Latest Only</option>
            <option>Active Versions</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        {activeTab === 'catalog' && (
          <div className="divide-y divide-gray-200">
            {mockAPIs.map((api) => (
              <div key={api.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">{api.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {api.version}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${api.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {api.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{api.description}</p>
                    
                    {/* Metrics */}
                    <div className="mt-4 flex items-center space-x-6">
                      <div className="flex items-center text-xs">
                        <Activity className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium">{api.metrics.requests}</span>
                        <span className="ml-1 text-gray-500">requests</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium">{api.metrics.latency}</span>
                        <span className="ml-1 text-gray-500">avg latency</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Activity className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium">{api.metrics.uptime}</span>
                        <span className="ml-1 text-gray-500">uptime</span>
                      </div>
                    </div>

                    {/* Tags and Meta */}
                    <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated {api.lastUpdated}
                      </span>
                      <span className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {api.tags.join(', ')}
                      </span>
                    </div>

                    {/* Documentation Links */}
                    <div className="mt-4 flex items-center space-x-4">
                      <a 
                        href={api.docs.swagger}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-blue-600 hover:text-blue-500"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Swagger Docs
                      </a>
                      <a 
                        href={api.docs.postman}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-blue-600 hover:text-blue-500"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Postman Collection
                      </a>
                      <a 
                        href={api.docs.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-blue-600 hover:text-blue-500"
                      >
                        <GitBranch className="h-4 w-4 mr-1" />
                        Source Code
                      </a>
                    </div>

                    {/* Endpoints */}
                    <div className="mt-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-2">Available Endpoints</h4>
                      <div className="space-y-1">
                        {api.endpoints.map((endpoint, index) => (
                          <div key={index} className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                            {endpoint}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-6 flex flex-col space-y-2">
                    <Link
                      to={`/apis/${api.id}/docs`}
                      className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-500"
                    >
                      View Documentation
                    </Link>
                    <Link
                      to={`/apis/${api.id}/playground`}
                      className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-500"
                    >
                      API Playground
                    </Link>
                    <Link
                      to={`/apis/${api.id}/metrics`}
                      className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-500"
                    >
                      View Analytics
                    </Link>
                    <Link
                      to={`/apis/${api.id}/settings`}
                      className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-500"
                    >
                      Settings
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default APIManagementPage;