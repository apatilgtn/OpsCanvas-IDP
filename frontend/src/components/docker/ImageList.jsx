// src/components/docker/ImageList.jsx
import React, { useState } from 'react';
import { 
  Tag,
  Clock,
  HardDrive,
  Shield,
  MoreVertical,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const ImageList = ({ searchTerm, selectedRegistry }) => {
  const [images] = useState([
    {
      id: 'img1',
      name: 'frontend-app',
      tag: 'latest',
      registry: 'dockerhub',
      size: '156MB',
      created: '2024-03-04T10:30:00Z',
      vulnerabilities: {
        critical: 0,
        high: 2,
        medium: 5,
        low: 8
      },
      layers: 12,
      pulls: 1250,
      lastScan: '2024-03-04T12:00:00Z',
      scanStatus: 'clean'
    },
    {
      id: 'img2',
      name: 'backend-api',
      tag: 'v1.2.3',
      registry: 'acr',
      size: '245MB',
      created: '2024-03-03T15:45:00Z',
      vulnerabilities: {
        critical: 1,
        high: 3,
        medium: 7,
        low: 12
      },
      layers: 15,
      pulls: 850,
      lastScan: '2024-03-04T11:30:00Z',
      scanStatus: 'vulnerable'
    }
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScanStatusIcon = (status) => {
    switch (status) {
      case 'clean':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'vulnerable':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegistry = selectedRegistry === 'all' || image.registry === selectedRegistry;
    return matchesSearch && matchesRegistry;
  });

  return (
    <div className="space-y-6">
      {filteredImages.map(image => (
        <div
          key={image.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Tag className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {image.name}:{image.tag}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Registry: {image.registry}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Size</p>
                <p className="mt-1 text-sm text-gray-900">{image.size}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(image.created)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Layers</p>
                <p className="mt-1 text-sm text-gray-900">{image.layers}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pulls</p>
                <p className="mt-1 text-sm text-gray-900">{image.pulls}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getScanStatusIcon(image.scanStatus)}
                  <span className="text-sm font-medium text-gray-900">
                    Security Scan
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Last scan: {formatDate(image.lastScan)}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-4 gap-2">
                <div className="bg-red-50 p-2 rounded">
                  <p className="text-xs font-medium text-red-800">Critical</p>
                  <p className="text-lg font-semibold text-red-900">
                    {image.vulnerabilities.critical}
                  </p>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <p className="text-xs font-medium text-orange-800">High</p>
                  <p className="text-lg font-semibold text-orange-900">
                    {image.vulnerabilities.high}
                  </p>
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  <p className="text-xs font-medium text-yellow-800">Medium</p>
                  <p className="text-lg font-semibold text-yellow-900">
                    {image.vulnerabilities.medium}
                  </p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="text-xs font-medium text-green-800">Low</p>
                  <p className="text-lg font-semibold text-green-900">
                    {image.vulnerabilities.low}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageList;