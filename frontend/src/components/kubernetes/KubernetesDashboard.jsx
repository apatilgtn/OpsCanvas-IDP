// src/components/kubernetes/KubernetesDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Database, 
  Box, 
  Shield, 
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import ClusterOverview from './ClusterOverview';
import NamespaceManager from './NamespaceManager';
import WorkloadMonitoring from './WorkloadMonitoring';
import HelmChartManager from './HelmChartManager';
import RBACManager from './RBACManager';

const KubernetesDashboard = () => {
  const [activeTab, setActiveTab] = useState('clusters');
  const [clusterData, setClusterData] = useState({
    clusters: [],
    loading: true,
    error: null
  });

  // Mock data for demonstration
  const mockClusterData = {
    clusters: [
      {
        id: 'cluster-1',
        name: 'production-cluster',
        provider: 'AKS',
        status: 'healthy',
        version: '1.25.6',
        nodes: 5,
        cpu: { used: 65, total: 100 },
        memory: { used: 75, total: 128 },
        pods: { running: 48, total: 60 },
        health: {
          status: 'Healthy',
          lastCheck: '2024-03-04T10:30:00Z',
          issues: []
        }
      },
      {
        id: 'cluster-2',
        name: 'staging-cluster',
        provider: 'GKE',
        status: 'warning',
        version: '1.24.12',
        nodes: 3,
        cpu: { used: 45, total: 60 },
        memory: { used: 35, total: 64 },
        pods: { running: 28, total: 40 },
        health: {
          status: 'Warning',
          lastCheck: '2024-03-04T10:30:00Z',
          issues: ['High memory usage in node-2']
        }
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchClusters = async () => {
      try {
        // In real implementation, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClusterData({
          clusters: mockClusterData.clusters,
          loading: false,
          error: null
        });
      } catch (error) {
        setClusterData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch cluster data'
        }));
      }
    };

    fetchClusters();
  }, []);

  const tabs = [
    { id: 'clusters', label: 'Clusters', icon: Server },
    { id: 'namespaces', label: 'Namespaces', icon: Box },
    { id: 'workloads', label: 'Workloads', icon: Database },
    { id: 'helm', label: 'Helm Charts', icon: Box },
    { id: 'rbac', label: 'RBAC', icon: Shield }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'clusters':
        return <ClusterOverview clusters={clusterData.clusters} />;
      case 'namespaces':
        return <NamespaceManager />;
      case 'workloads':
        return <WorkloadMonitoring />;
      case 'helm':
        return <HelmChartManager />;
      case 'rbac':
        return <RBACManager />;
      default:
        return <ClusterOverview clusters={clusterData.clusters} />;
    }
  };

  return (
    <div className="p-6">
      {/* Tabs Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow">
        {clusterData.loading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : clusterData.error ? (
          <div className="flex items-center justify-center h-64 text-red-500">
            <AlertCircle className="w-6 h-6 mr-2" />
            {clusterData.error}
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default KubernetesDashboard;