// src/pages/Documentation.jsx
import React, { useState } from 'react';
import { 
  Book, 
  Code, 
  FileText, 
  Search,
  Tag,
  Clock,
  GitBranch,
  BookOpen,
  Link as LinkIcon,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const docs = [
    {
      id: 1,
      title: 'Authentication API',
      type: 'API Reference',
      category: 'Backend',
      version: 'v2.1.0',
      lastUpdated: '2 days ago',
      status: 'up-to-date',
      author: 'Security Team',
      description: 'Complete authentication and authorization API documentation',
      tags: ['auth', 'security', 'api'],
      endpoints: [
        { method: 'POST', path: '/auth/login', description: 'User login endpoint' },
        { method: 'POST', path: '/auth/refresh', description: 'Token refresh endpoint' }
      ]
    },
    {
      id: 2,
      title: 'Frontend Component Library',
      type: 'Component Documentation',
      category: 'Frontend',
      version: 'v1.5.0',
      lastUpdated: '1 week ago',
      status: 'needs-update',
      author: 'Frontend Team',
      description: 'Documentation for shared React components',
      tags: ['react', 'ui', 'components'],
      components: [
        { name: 'Button', category: 'Core', status: 'stable' },
        { name: 'Modal', category: 'Overlay', status: 'beta' }
      ]
    },
    {
      id: 3,
      title: 'Database Schema',
      type: 'Technical Spec',
      category: 'Database',
      version: 'v3.0.0',
      lastUpdated: '3 days ago',
      status: 'up-to-date',
      author: 'Database Team',
      description: 'Complete database schema documentation',
      tags: ['database', 'schema', 'postgresql'],
      tables: [
        { name: 'users', description: 'User information' },
        { name: 'sessions', description: 'User sessions' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Documents', icon: Book },
    { id: 'api', name: 'API References', icon: Code },
    { id: 'frontend', name: 'Frontend', icon: FileText },
    { id: 'backend', name: 'Backend', icon: GitBranch }
  ];

  const getStatusIcon = (status) => {
    if (status === 'up-to-date') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
  };

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           doc.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Documentation
          </button>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex space-x-6">
        {/* Categories Sidebar */}
        <div className="w-64">
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <category.icon className="w-5 h-5 mr-3" />
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Documentation List */}
        <div className="flex-1">
          <div className="grid gap-6">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                {/* Document Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                      <p className="text-gray-600">{doc.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(doc.status)}
                    <span className="text-sm font-medium text-gray-500">{doc.version}</span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-4 grid grid-cols-3 gap-4">
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

                {/* Tags */}
                <div className="mt-4">
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

                {/* Content Preview */}
                {doc.endpoints && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">API Endpoints</h4>
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
                )}

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                    View Full Documentation
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;