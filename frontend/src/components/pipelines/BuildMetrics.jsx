// src/components/pipelines/BuildMetrics.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BuildMetrics = ({ stats }) => {
  const data = [
    { name: 'Mon', builds: 24, success: 20, failed: 4 },
    { name: 'Tue', builds: 28, success: 25, failed: 3 },
    { name: 'Wed', builds: 32, success: 30, failed: 2 },
    { name: 'Thu', builds: 26, success: 22, failed: 4 },
    { name: 'Fri', builds: 30, success: 28, failed: 2 },
    { name: 'Sat', builds: 18, success: 16, failed: 2 },
    { name: 'Sun', builds: 15, success: 14, failed: 1 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Metrics</h3>
      <div className="h-80">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="success" fill="#10B981" name="Successful Builds" />
          <Bar dataKey="failed" fill="#EF4444" name="Failed Builds" />
        </BarChart>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="text-sm font-medium text-green-600">Success Rate</h4>
          <p className="text-2xl font-semibold text-green-900">{stats.successRate}%</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <h4 className="text-sm font-medium text-red-600">Failure Rate</h4>
          <p className="text-2xl font-semibold text-red-900">{stats.failureRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default BuildMetrics;