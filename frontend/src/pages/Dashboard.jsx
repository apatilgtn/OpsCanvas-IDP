import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'Components', count: '3' },
    { title: 'APIs', count: '2' },
    { title: 'Resources', count: '2' },
    { title: 'Systems', count: '2' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Platform Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Recent Components */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Components</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { name: 'Auth Service', owner: 'team-a' },
            { name: 'User API', owner: 'team-b' },
            { name: 'Payment Gateway', owner: 'team-c' }
          ].map((component, index) => (
            <div key={index} className="px-6 py-4">
              <h3 className="text-sm font-medium text-gray-900">{component.name}</h3>
              <p className="text-sm text-gray-500">Owner: {component.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;