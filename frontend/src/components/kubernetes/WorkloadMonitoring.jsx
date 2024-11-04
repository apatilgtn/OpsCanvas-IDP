// src/components/kubernetes/WorkloadMonitoring.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Terminal,
  MoreVertical,
  Archive,
  Cpu,
  HardDrive
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WorkloadMonitoring = () => {
  const [workloads, setWorkloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkload, setSelectedWorkload] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    totalPods: 0,
    healthyPods: 0,
    cpuUsage: 0,
    memoryUsage: 0
  });

  // Mock workloads data
  const mockWorkloads = [
    {
      id: 'workload-1',
      name: 'frontend-app',
      type: 'Deployment',
      namespace: 'default',
      status: 'Running',
      replicas: { current: 3, desired: 3 },
      cpu: { usage: '250m', limit: '500m' },
      memory: { usage: '512Mi', limit: '1Gi' },
      pods: [
        { name: 'frontend-app-1', status: 'Running', restarts: 0 },
        { name: 'frontend-app-2', status: 'Running', restarts: 0 },
        { name: 'frontend-app-3', status: 'Running', restarts: 1 }
      ],
      metrics: [
        { time: '00:00', cpu: 45, memory: 60 },
        { time: '01:00', cpu: 42, memory: 58 },
        { time: '02:00', cpu: 48, memory: 62 },
        { time: '03:00', cpu: 50, memory: 65 },
        { time: '04:00', cpu: 46, memory: 61 }
      ]
    },
    {
      id: 'workload-2',
      name: 'backend-api',
      type: 'StatefulSet',
      namespace: 'default',
      status: 'Warning',
      replicas: { current: 2, desired: 3 },
      cpu: { usage: '400m', limit: '1000m' },
      memory: { usage: '1.5Gi', limit: '2Gi' },
      pods: [
        { name: 'backend-api-0', status: 'Running', restarts: 0 },
        { name: 'backend-api-1', status: 'Running', restarts: 2 },
        { name: 'backend-api-2', status: 'Failed', restarts: 3 }
      ],
      metrics: [
        { time: '00:00', cpu: 65, memory: 75 },
        { time: '01:00', cpu: 70, memory: 78 },
        { time: '02:00', cpu: 68, memory: 76 },
        { time: '03:00', cpu: 72, memory: 80 },
        { time: '04:00', cpu: 69, memory: 77 }
      ]
    }
  ];

  // Status icon helper function
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Running':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'Failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    const fetchWorkloads = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWorkloads(mockWorkloads);
        
        // Calculate metrics
        const total = mockWorkloads.reduce((acc, workload) => acc + workload.pods.length, 0);
        const healthy = mockWorkloads.reduce((acc, workload) => 
          acc + workload.pods.filter(pod => pod.status === 'Running').length, 0
        );
        
        setMetrics({
          totalPods: total,
          healthyPods: healthy,
          cpuUsage: 75, // Mock value
          memoryUsage: 68 // Mock value
        });
      } catch (error) {
        console.error('Failed to fetch workloads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkloads();
  }, []);

  const renderMetricsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <Box className="w-10 h-10 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Pods</p>
            <h3 className="text-2xl font-semibold text-gray-900">{metrics.totalPods}</h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Healthy Pods</p>
            <h3 className="text-2xl font-semibold text-gray-900">{metrics.healthyPods}</h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <Cpu className="w-10 h-10 text-purple-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">CPU Usage</p>
            <h3 className="text-2xl font-semibold text-gray-900">{metrics.cpuUsage}%</h3>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <HardDrive className="w-10 h-10 text-orange-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Memory Usage</p>
            <h3 className="text-2xl font-semibold text-gray-900">{metrics.memoryUsage}%</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPodsList = (pods) => (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-500 mb-2">Pods</h4>
      <div className="space-y-2">
        {pods.map((pod) => (
          <div
            key={pod.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              {getStatusIcon(pod.status)}
              <span className="ml-2 text-sm font-medium text-gray-900">{pod.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Restarts: {pod.restarts}
              </span>
              <button
                className="text-gray-400 hover:text-gray-600"
                title="View Logs"
              >
                <Terminal className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkloads = () => (
    <div className="space-y-6">
      {workloads.map((workload) => (
        <div
          key={workload.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {getStatusIcon(workload.status)}
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">{workload.name}</h3>
                <p className="text-sm text-gray-500">
                  {workload.type} • {workload.namespace}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Replicas: {workload.replicas.current}/{workload.replicas.desired}
              </span>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          {renderPodsList(workload.pods)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Workload Monitoring</h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage your Kubernetes workloads
        </p>
      </div>

      {renderMetricsCards()}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        renderWorkloads()
      )}
    </div>
  );
};

export default WorkloadMonitoring;