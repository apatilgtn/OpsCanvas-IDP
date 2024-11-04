import React from 'react';
import ServiceHealth from './ServiceHealth';
import IncidentHistory from './IncidentHistory';

const MonitoringDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Monitoring Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ServiceHealth />
        <IncidentHistory />
      </div>
    </div>
  );
};

export default MonitoringDashboard;