import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Users,
  Link as LinkIcon,
  ChevronDown,
  AlertCircle,
  Cloud
} from 'lucide-react';

const APIManagementPage = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Available filters
  const filters = {
    status: ['active', 'beta', 'deprecated'],
    type: ['internal', 'public', 'partner'],
    category: ['core', 'payment', 'user', 'resource']
  };

  const tabs = [
    { id: 'catalog', label: 'API Catalog', icon: Book },
    { id: 'documentation', label: 'Documentation', icon: FileText },
    { id: 'metrics', label: 'Metrics & Usage', icon: Activity },
    { id: 'settings', label: 'Gateway Settings', icon: Settings }
  ];

  // Mock API data with detailed information
  const mockAPIs = [
    {
      id: 'user-api',
      name: 'User Management API',
      version: 'v2.1.0',
      status: 'active',
      type: 'internal',
      category: 'core',
      lastUpdated: '2024-02-15',
      description: 'Core user management and authentication endpoints for user creation, authentication, and profile management.',
      tags: ['core', 'auth', 'users'],
      metrics: {
        requests: '2.5M',
        latency: '120ms',
        uptime: '99.99%',
        errorRate: '0.01%'
      },
      docs: {
        swagger: 'https://api.cloudedge.dev/user/swagger',
        postman: 'https://www.postman.com/cloudedge/user-api',
        github: 'https://github.com/cloudedge/user-api'
      },
      maintainer: {
        team: 'Core Services',
        contact: 'core-team@cloudedge.dev'
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
      category: 'payment',
      lastUpdated: '2024-02-10',
      description: 'Secure payment processing system supporting multiple payment providers, currencies, and transaction types.',
      tags: ['payments', 'transactions', 'beta'],
      metrics: {
        requests: '1.2M',
        latency: '180ms',
        uptime: '99.95%',
        errorRate: '0.05%'
      },
      docs: {
        swagger: 'https://api.cloudedge.dev/payment/swagger',
        postman: 'https://www.postman.com/cloudedge/payment-api',
        github: 'https://github.com/cloudedge/payment-api'
      },
      maintainer: {
        team: 'Financial Services',
        contact: 'finance-team@cloudedge.dev'
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
      category: 'resource',
      lastUpdated: '2024-02-18',
      description: 'Comprehensive API for managing cloud resources, including compute, storage, and networking components.',
      tags: ['resources', 'cloud', 'infrastructure'],
      metrics: {
        requests: '3.8M',
        latency: '145ms',
        uptime: '99.98%',
        errorRate: '0.02%'
      },
      docs: {
        swagger: 'https://api.cloudedge.dev/resource/swagger',
        postman: 'https://www.postman.com/cloudedge/resource-api',
        github: 'https://github.com/cloudedge/resource-api'
      },
      maintainer: {
        team: 'Infrastructure',
        contact: 'infra-team@cloudedge.dev'
      },
      endpoints: [
        '/api/v3/compute',
        '/api/v3/storage',
        '/api/v3/network'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'beta':
        return 'bg-yellow-100 text-yellow-800';
      case 'deprecated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAPIs = mockAPIs.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.every(filter => {
        const [type, value] = filter.split(':');
        return api[type] === value;
      });

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">API Management</h1>
          <p className="text-sm text-gray-500">Discover, test, and manage your APIs</p>
        </div>
        <button 
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm 
                     text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
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
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search APIs by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium 
                         rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="p-4 space-y-4">
                  {Object.entries(filters).map(([filterType, values]) => (
                    <div key={filterType}>
                      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        {filterType}
                      </h3>
                      <div className="space-y-2">
                        {values.map((value) => (
                          <label key={value} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedFilters.includes(`${filterType}:${value}`)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFilters([...selectedFilters, `${filterType}:${value}`]);
                                } else {
                                  setSelectedFilters(selectedFilters.filter(f => f !== `${filterType}:${value}`));
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600"
                            />
                            <span className="ml-2 text-sm text-gray-600">{value}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        {activeTab === 'catalog' && (
          <div className="divide-y divide-gray-200">
            {filteredAPIs.map((api) => (
              <div key={api.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
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

                    {/* Metrics */}
                    <div className="mt-4 flex items-center space-x-6">
                      <div className="flex items-center text-xs">
                        <Activity className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium">{api.metrics.requests}</span>
                        <span className="ml-1 text-gray-500">requests/month</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium">{api.metrics.latency}</span>
                        <span className="ml-1 text-gray-500">avg latency</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <AlertCircle className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium">{api.metrics.errorRate}</span>
                        <span className="ml-1 text-gray-500">error rate</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <Cloud className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium">{api.metrics.uptime}</span>
                        <span className="ml-1 text-gray-500">uptime</span>
                      </div>
                    </div>

                    {/* Meta Information */}
                    <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Updated {api.lastUpdated}
                      </span>
                      <span className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {api.tags.join(', ')}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {api.maintainer.team}
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
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 
                               bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <FileText className="h-3.5 w-3.5 mr-1.5" />
                      Documentation
                    </Link>
                    <Link
                      to={`/apis/${api.id}/playground`}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 
                               bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Play className="h-3.5 w-3.5 mr-1.5" />
                      Try It Out
                    </Link>
                    <Link
                      to={`/apis/${api.id}/metrics`}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 
                               bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Activity className="h-3.5 w-3.5 mr-1.5" />
                      Analytics
                    </Link>
                    <Link
                      to={`/apis/${api.id}/settings`}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 
                               bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Settings className="h-3.5 w-3.5 mr-1.5" />
                      Settings
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredAPIs.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">No APIs found</h3>
                <p className="text-sm text-gray-500">
                  {searchQuery
                    ? `No APIs match your search "${searchQuery}"`
                    : 'No APIs available. Add your first API to get started.'}
                </p>
                <button className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New API
                </button>
              </div>
            )}
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'documentation' && (
          <div className="p-6">
            <div className="text-center text-sm text-gray-500">
              Select an API from the catalog to view its documentation
            </div>
          </div>
        )}

        {/* Metrics Tab */}
        {activeTab === 'metrics' && (
          <div className="p-6">
            <div className="text-center text-sm text-gray-500">
              Select an API from the catalog to view its metrics
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-sm font-medium text-gray-900 mb-4">API Gateway Settings</h3>
              
              {/* General Settings */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-xs font-medium text-gray-700 mb-3">General Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Gateway URL
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs"
                      placeholder="https://api.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      API Rate Limit
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-xs font-medium text-gray-700 mb-3">Security Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="require-auth"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="require-auth" className="ml-2 text-xs text-gray-700">
                      Require authentication for all APIs
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="ssl-required"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="ssl-required" className="ml-2 text-xs text-gray-700">
                      Require SSL/TLS
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default APIManagementPage;