import React from 'react';

const IncidentHistory = () => {
  // Dummy data for incident history
  const incidents = [
    { id: 1, service: 'Service 1', description: 'Incident 1', status: 'Resolved', timestamp: '2023-06-10T10:30:00' },
    { id: 2, service: 'Service 2', description: 'Incident 2', status: 'Open', timestamp: '2023-06-11T15:45:00' },
    { id: 3, service: 'Service 3', description: 'Incident 3', status: 'In Progress', timestamp: '2023-06-12T09:15:00' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Incident History</h3>
      <div className="divide-y divide-gray-200">
        {incidents.map((incident) => (
          <div key={incident.id} className="py-2">
            <div className="flex justify-between">
              <span>{incident.service}</span>
              <span className={`font-bold ${
                incident.status === 'Resolved' ? 'text-green-500' :
                incident.status === 'Open' ? 'text-red-500' : 'text-yellow-500'
              }`}>{incident.status}</span>
            </div>
            <div className="text-sm text-gray-500">{incident.description}</div>
            <div className="text-sm text-gray-500">{incident.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentHistory;