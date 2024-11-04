// src/components/docker/SecurityScanner.jsx
import React, { useState } from 'react';
import { 
  Shield,
  AlertTriangle,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const SecurityScanner = () => {
  const [scanResults] = useState({
    lastScan: '2024-03-04T10:30:00Z',
    totalImages: 15,
    scannedImages: 12,
    findings: {
      critical: 2,
      high: 5,
      medium: 8,
      low: 12
    },
    vulnerableImages: [
      {
        name: 'backend-api:v1.2.3',
        vulnerabilities: {
          critical: 1,
          high: 2,
          medium: 3,
          low: 4
        },
        lastScan: '2024-03-04T09:00:00Z',
        status: 'vulnerable'
      },
      {
        name: 'frontend-app:latest',
        vulnerabilities: {
          critical: 0,
          high: 1,
          medium: 2,
          low: 3
        },
        lastScan: '2024-03-04T08:30:00Z',
        status: 'warning'
      }
    ]
  });

  const [selectedPolicy, setSelectedPolicy] = useState({
    blockCritical: true,
    scanOnPush: true,
    dailyScan: false
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'vulnerable':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'secure':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const togglePolicy = (policyName) => {
    setSelectedPolicy(prev => ({
      ...prev,
      [policyName]: !prev[policyName]
    }));
  };

  const renderSummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <Shield className="w-10 h-10 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Scanned Images</p>
            <p className="text-2xl font-semibold text-gray-900">
              {scanResults.scannedImages}/{scanResults.totalImages}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <AlertTriangle className="w-10 h-10 text-red-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Critical Findings</p>
            <p className="text-2xl font-semibold text-gray-900">
              {scanResults.findings.critical}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <AlertTriangle className="w-10 h-10 text-orange-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">High Severity</p>
            <p className="text-2xl font-semibold text-gray-900">
              {scanResults.findings.high}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <Shield className="w-10 h-10 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Scans</p>
            <p className="text-2xl font-semibold text-gray-900">
              {scanResults.totalImages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVulnerabilityCard = (image) => (
    <div key={image.name} className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getStatusIcon(image.status)}
          <h4 className="ml-2 text-lg font-medium text-gray-900">
            {image.name}
          </h4>
        </div>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View Details
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-red-50 p-3 rounded">
          <p className="text-xs font-medium text-red-800">Critical</p>
          <p className="text-lg font-semibold text-red-900">
            {image.vulnerabilities.critical}
          </p>
        </div>
        <div className="bg-orange-50 p-3 rounded">
          <p className="text-xs font-medium text-orange-800">High</p>
          <p className="text-lg font-semibold text-orange-900">
            {image.vulnerabilities.high}
          </p>
        </div>
        <div className="bg-yellow-50 p-3 rounded">
          <p className="text-xs font-medium text-yellow-800">Medium</p>
          <p className="text-lg font-semibold text-yellow-900">
            {image.vulnerabilities.medium}
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded">
          <p className="text-xs font-medium text-green-800">Low</p>
          <p className="text-lg font-semibold text-green-900">
            {image.vulnerabilities.low}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Last scanned: {new Date(image.lastScan).toLocaleString()}
      </div>
    </div>
  );

  const renderPolicyToggle = (title, description, policyKey) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex items-center">
          <span className={`mr-3 text-sm ${selectedPolicy[policyKey] ? 'text-green-600' : 'text-gray-600'} font-medium`}>
            {selectedPolicy[policyKey] ? 'Enabled' : 'Disabled'}
          </span>
          <button
            onClick={() => togglePolicy(policyKey)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              selectedPolicy[policyKey] ? 'bg-green-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                selectedPolicy[policyKey] ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSummaryCards()}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Vulnerable Images</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {scanResults.vulnerableImages.map(renderVulnerabilityCard)}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Security Policies</h3>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Add Policy
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {renderPolicyToggle(
              'Block Critical Vulnerabilities',
              'Prevent deployment of images with critical security vulnerabilities',
              'blockCritical'
            )}
            {renderPolicyToggle(
              'Scan on Push',
              'Automatically scan images when pushed to registry',
              'scanOnPush'
            )}
            {renderPolicyToggle(
              'Daily Scanning',
              'Scan all images daily for new vulnerabilities',
              'dailyScan'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityScanner;