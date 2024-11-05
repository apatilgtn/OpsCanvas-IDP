import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Play, 
  Send, 
  Code, 
  Copy, 
  Check,
  ChevronDown 
} from 'lucide-react';

const APIPlayground = () => {
  const { apiId } = useParams();
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState(null);
  const [copied, setCopied] = useState(false);

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  const handleSendRequest = async () => {
    // Simulated API call
    setResponse({
      status: 200,
      data: {
        message: "Success",
        timestamp: new Date().toISOString()
      }
    });
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900">API Playground</h1>
        <p className="text-sm text-gray-500">Test API endpoints and explore responses</p>
      </div>

      {/* Request Builder */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {/* Method & Endpoint */}
          <div className="flex space-x-4">
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Method
              </label>
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md"
              >
                {methods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endpoint
              </label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="/api/v1/resource"
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Request Body */}
          {selectedMethod !== 'GET' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Request Body
              </label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={5}
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md font-mono"
                placeholder="{\n  'key': 'value'\n}"
              />
            </div>
          )}

          {/* Send Button */}
          <div>
            <button
              onClick={handleSendRequest}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Request
            </button>
          </div>
        </div>
      </div>

      {/* Response Section */}
      {response && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-900">Response</h2>
            <button
              onClick={handleCopyResponse}
              className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              {copied ? (
                <Check className="h-4 w-4 mr-1" />
              ) : (
                <Copy className="h-4 w-4 mr-1" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
            <code className="text-sm text-gray-800">
              {JSON.stringify(response, null, 2)}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default APIPlayground;