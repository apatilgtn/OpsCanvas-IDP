// src/components/resources/ResourceCard.jsx
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const ResourceCard = ({ resource }) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-900">{resource.name}</h3>
            {resource.status === 'healthy' ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </div>
          <p className="text-sm text-gray-500">Type: {resource.type}</p>
          <p className="text-sm text-gray-500">Owner: {resource.owner}</p>
        </div>
        <div className="text-right">
          {Object.entries(resource.specs).map(([key, value]) => (
            <p key={key} className="text-sm text-gray-600">
              <span className="font-medium capitalize">{key}:</span> {value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;