import React from 'react';
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Tag,
} from 'lucide-react';

const DocumentView = ({ doc, onEdit }) => {
  const getStatusIcon = (status) => {
    if (status === 'up-to-date') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start space-x-4">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{doc.title}</h1>
            <p className="text-gray-600">{doc.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(doc.status)}
          <span className="text-sm font-medium text-gray-500">{doc.version}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-500">Type</div>
          <div className="mt-1 text-sm font-medium">{doc.type}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Last Updated</div>
          <div className="mt-1 text-sm font-medium">{doc.lastUpdated}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Author</div>
          <div className="mt-1 text-sm font-medium">{doc.author}</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {doc.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {doc.endpoints && (
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">API Endpoints</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              {doc.endpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">
                    <span className="font-mono text-blue-600">{endpoint.method}</span>
                    <span className="text-gray-600 ml-2">{endpoint.path}</span>
                  </span>
                  <span className="text-sm text-gray-500">{endpoint.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={() => onEdit(doc)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default DocumentView;