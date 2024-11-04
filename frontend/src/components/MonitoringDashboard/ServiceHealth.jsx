import React from 'react';

const ServiceHealth = () => {
  // Dummy data for service health
  const services = [
    { name: 'Service 1', status: 'Healthy', sla: '99.99%' },
    { name: 'Service 2', status: 'Warning', sla: '98.5%' },
    { name: 'Service 3', status: 'Critical', sla: '95%' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-xl font-bold mb-4">Service Health</h3>
      <div className="divide-y divide-gray-200">
        {services.map((service, index) => (
          <div key={index} className="py-2">
            <div className="flex justify-between">
              <span>{service.name}</span>
              <span className={`font-bold ${
                service.status === 'Healthy' ? 'text-green-500' :
                service.status === 'Warning' ? 'text-yellow-500' : 'text-red-500'
              }`}>{service.status}</span>
            </div>
            <div className="text-sm text-gray-500">{`SLA: ${service.sla}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHealth;