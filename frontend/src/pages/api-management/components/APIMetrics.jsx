import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Activity,
  Clock,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  BarChart2
} from 'lucide-react';

const APIMetrics = () => {
  const { apiId } = useParams();
  const [timeRange, setTimeRange] = useState('24h');

  const mockMetrics = {
    summary: {
      requests: '2.5M',
      latency: '120ms',
      errorRate: '0.01%',
      uptime: '99.99%'
    },
    trends: {
      requests: '+12.5%',
      latency: '-5.2%',
      errorRate: '+0.002%',
      uptime: '0%'
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">API Metrics</h1>
        <p className="text-sm text-gray-500">Monitor API performance and usage</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div className="inline-flex rounded-md shadow-sm">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`
                px-4 py-2 text-sm font-medium border
                ${timeRange === range 
                  ? 'bg-blue-50 text-blue-700 border-blue-200 z-10' 
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                }
                first:rounded-l-md last:rounded-r-md -ml-px first:ml-0
              `}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Request Volume */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Request Volume</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{mockMetrics.summary.requests}</p>
            </div>
            <div className={`flex items-center ${
              mockMetrics.trends.requests.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {mockMetrics.trends.requests.startsWith('+') ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="text-sm ml-1">{mockMetrics.trends.requests}</span>
            </div>
          </div>
          <div className="mt-4">
            <BarChart2 className="h-16 w-full text-blue-200" />
          </div>
        </div>

        {/* Average Latency */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Latency</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{mockMetrics.summary.latency}</p>
            </div>
            <div className={`flex items-center ${
              mockMetrics.trends.latency.startsWith('-') ? 'text-green-600' : 'text-red-600'
            }`}>
              {mockMetrics.trends.latency.startsWith('-') ? (
                <ArrowDown className="h-4 w-4" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
              <span className="text-sm ml-1">{mockMetrics.trends.latency.replace('-', '')}</span>
            </div>
          </div>
          <div className="mt-4">
            <BarChart2 className="h-16 w-full text-green-200" />
          </div>
        </div>

        {/* Error Rate */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Error Rate</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{mockMetrics.summary.errorRate}</p>
            </div>
            <div className={`flex items-center ${
              mockMetrics.trends.errorRate.startsWith('+') ? 'text-red-600' : 'text-green-600'
            }`}>
              {mockMetrics.trends.errorRate.startsWith('+') ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="text-sm ml-1">{mockMetrics.trends.errorRate}</span>
            </div>
          </div>
          <div className="mt-4">
            <BarChart2 className="h-16 w-full text-red-200" />
          </div>
        </div>

        {/* Uptime */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Uptime</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{mockMetrics.summary.uptime}</p>
            </div>
            <div className="flex items-center text-green-600">
              <span className="text-sm">{mockMetrics.trends.uptime}</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: mockMetrics.summary.uptime }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add more metric visualizations as needed */}
    </div>
  );
};

export default APIMetrics;