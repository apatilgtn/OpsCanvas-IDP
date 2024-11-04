// src/components/pipelines/PipelineStats.jsx
import React from 'react';
import { 
  Activity,
  Timer,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const PipelineStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Builds',
      value: stats.totalBuilds,
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Avg Duration',
      value: stats.averageDuration,
      icon: Timer,
      color: 'purple'
    },
    {
      title: 'Failure Rate',
      value: `${stats.failureRate}%`,
      icon: AlertCircle,
      color: 'red'
    }
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow"
        >
          <div className={`flex items-center justify-between mb-2`}>
            <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
            </div>
            <span className="text-sm text-gray-500">Last 24h</span>
          </div>
          <div className="mt-2">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default PipelineStats;