import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database,
  Code,
  Package,
  Users,
  Shield,
  Settings,
  Box,
  HardDrive,
  Server,
  Network
} from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();

  // Sidebar menu items
  const menuItems = [
    { icon: LayoutDashboard, text: 'Overview', path: '/dashboard' },
    { icon: Box, text: 'Components', path: '/components' },
    { icon: Code, text: 'APIs', path: '/apis' },
    { icon: Database, text: 'Resources', path: '/resources' },
    { icon: Package, text: 'Systems', path: '/systems' },
    { icon: Users, text: 'Teams', path: '/teams' },
    { icon: Shield, text: 'Security', path: '/security' },
    { icon: Settings, text: 'Settings', path: '/settings' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">OpsCanvas</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="py-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-6 py-2 text-sm font-medium ${
                location.pathname === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.text}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center px-8 py-4">
            <div className="flex space-x-6">
              <Link
                to="/dashboard"
                className={`px-3 py-2 text-sm font-medium ${
                  location.pathname === '/dashboard'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/resources"
                className={`px-3 py-2 text-sm font-medium ${
                  location.pathname === '/resources'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Resources
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin</span>
              <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

const ResourcesPage = () => {
  const resourceTypes = [
    {
      title: 'Databases',
      count: 2,
      icon: Database,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Storage',
      count: 1,
      icon: HardDrive,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Compute',
      count: 3,
      icon: Server,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Network',
      count: 1,
      icon: Network,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  const recentComponents = [
    { name: 'Auth Service', owner: 'team-a' },
    { name: 'User API', owner: 'team-b' },
    { name: 'Payment Gateway', owner: 'team-c' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Overview</h1>

      {/* Resource Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {resourceTypes.map((type) => (
          <div key={type.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${type.bgColor} rounded-lg`}>
                <type.icon className={`h-6 w-6 ${type.iconColor}`} />
              </div>
              <span className="text-2xl font-semibold text-gray-900">{type.count}</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">{type.title}</h3>
          </div>
        ))}
      </div>

      {/* Recent Components Section */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Components</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentComponents.map((component, index) => (
            <div key={index} className="px-6 py-4">
              <h3 className="text-sm font-medium text-gray-900">{component.name}</h3>
              <p className="text-sm text-gray-500">Owner: {component.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Wrap the ResourcesPage with the Layout
const ResourcesWithLayout = () => (
  <Layout>
    <ResourcesPage />
  </Layout>
);

export default ResourcesWithLayout;