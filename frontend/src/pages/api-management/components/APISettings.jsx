import React from 'react';
import { useParams } from 'react-router-dom';
import { Settings, Shield, Clock, Server, Database } from 'lucide-react';

const APISettings = () => {
  const { apiId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">API Settings</h1>
          <p className="text-sm text-gray-500">Configure settings for {apiId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* General Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">API Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                placeholder="API Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Version</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                placeholder="API Version"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Security Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Authentication Method</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm">
                <option>OAuth 2.0</option>
                <option>API Key</option>
                <option>JWT</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Require SSL/TLS</span>
              </label>
            </div>
          </div>
        </div>

        {/* Rate Limiting */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Rate Limiting</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rate Limit (requests per minute)</label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Burst Size</label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                placeholder="100"
              />
            </div>
          </div>
        </div>

        {/* Cache Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Cache Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Enable Caching</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cache TTL (seconds)</label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
                placeholder="300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default APISettings;