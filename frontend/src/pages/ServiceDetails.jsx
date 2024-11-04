import React from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { id } = useParams();

  // Dummy data for service details
  const service = {
    id: id,
    name: `Service ${id}`,
    description: `Detailed description of Service ${id}`,
    owner: 'Team A',
    contact: 'team-a@example.com',
    sla: '99.99%',
    incidents: [
      { id: 1, description: 'Incident 1', status: 'Resolved', timestamp: '2023-06-10T10:30:00' },
      { id: 2, description: 'Incident 2', status: 'Open', timestamp: '2023-06-11T15:45:00' },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Owner:</p>
            <p>{service.owner}</p>
          </div>
          <div>
            <p className="font-bold">Contact:</p>
            <p>{service.contact}</p>
          </div>
          <div>
            <p className="font-bold">SLA:</p>
            <p>{service.sla}</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-8 mb-4">Recent Incidents</h3>
        <div className="divide-y divide-gray-200">
          {service.incidents.map((incident) => (
            <div key={incident.id} className="py-2">
              <div className="flex justify-between">
                <span>{incident.description}</span>
                <span className={`font-bold ${
                  incident.status === 'Resolved' ? 'text-green-500' : 'text-red-500'
                }`}>{incident.status}</span>
              </div>
              <div className="text-sm text-gray-500">{incident.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;