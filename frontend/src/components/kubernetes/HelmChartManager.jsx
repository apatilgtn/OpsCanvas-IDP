// src/components/kubernetes/HelmChartManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box,
  Plus,
  RefreshCw,
  Archive,
  Clock,
  GitBranch,
  Settings,
  Upload,
  Download
} from 'lucide-react';

const HelmChartManager = () => {
  const [releases, setReleases] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('releases');

  // Mock data
  const mockReleases = [
    {
      name: 'prometheus',
      namespace: 'monitoring',
      chart: 'prometheus-community/prometheus',
      version: '15.5.3',
      status: 'deployed',
      updated: '2024-03-04T10:30:00Z',
      values: {
        replicas: 2,
        persistence: { enabled: true },
        resources: { limits: { cpu: '1000m', memory: '2Gi' } }
      }
    },
    {
      name: 'nginx-ingress',
      namespace: 'ingress',
      chart: 'ingress-nginx/ingress-nginx',
      version: '4.7.0',
      status: 'failed',
      updated: '2024-03-04T09:15:00Z',
      values: {
        replicas: 3,
        service: { type: 'LoadBalancer' },
        resources: { limits: { cpu: '500m', memory: '1Gi' } }
      }
    }
  ];

  const mockRepositories = [
    {
      name: 'bitnami',
      url: 'https://charts.bitnami.com/bitnami',
      status: 'ready'
    },
    {
      name: 'prometheus-community',
      url: 'https://prometheus-community.github.io/helm-charts',
      status: 'ready'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReleases(mockReleases);
        setRepositories(mockRepositories);
      } catch (error) {
        console.error('Failed to fetch Helm data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTabs = () => (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab('releases')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'releases'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Releases
        </button>
        <button
          onClick={() => setActiveTab('repositories')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'repositories'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Repositories
        </button>
      </nav>
    </div>
  );

  const renderReleases = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Helm Releases</h3>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Install Chart
        </button>
      </div>

      {releases.map((release) => (
        <div
          key={release.name}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900">{release.name}</h4>
              <p className="text-sm text-gray-500">{release.chart}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                release.status === 'deployed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {release.status}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Namespace</p>
              <p className="mt-1 text-sm text-gray-900">{release.namespace}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Version</p>
              <p className="mt-1 text-sm text-gray-900">{release.version}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(release.updated).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-500 mb-2">Values</h5>
            <pre className="bg-gray-50 rounded-md p-3 text-sm overflow-auto">
              {JSON.stringify(release.values, null, 2)}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRepositories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Helm Repositories</h3>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Repository
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {repositories.map((repo) => (
              <tr key={repo.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {repo.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {repo.url}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {repo.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    Update
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Helm Chart Management</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage Helm charts, releases, and repositories
        </p>
      </div>

      {renderTabs()}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        activeTab === 'releases' ? renderReleases() : renderRepositories()
      )}
    </div>
  );
};

export default HelmChartManager;