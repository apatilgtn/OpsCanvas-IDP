// src/components/Layout.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database,
  Code,
  Package,
  Users,
  Shield,
  Settings,
  Server,
  Book,
  ChevronDown,
  ChevronUp,
  GitBranch,
  Activity,
  Cloud,
  Box
} from 'lucide-react';
import Header from './header/Header';
import OceanWaveLogo from './OceanWaveLogo';

const Layout = ({ children }) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState(null);

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      text: 'Overview', 
      path: '/dashboard'
    },
    { 
      icon: Server, 
      text: 'Service Catalog', 
      path: '/catalog',
      subItems: [
        { text: 'Services List', path: '/catalog/services' },
        { text: 'Service Metrics', path: '/catalog/metrics' }
      ]
    },
    {
      icon: Cloud,
      text: 'Kubernetes',
      path: '/kubernetes',
      subItems: [
        { text: 'Clusters', path: '/kubernetes/clusters' },
        { text: 'Namespaces', path: '/kubernetes/namespaces' },
        { text: 'Workloads', path: '/kubernetes/workloads' },
        { text: 'Helm Charts', path: '/kubernetes/helm' },
        { text: 'RBAC', path: '/kubernetes/rbac' }
      ]
    },
    { 
      icon: Package, 
      text: 'Components', 
      path: '/components',
      subItems: [
        { text: 'UI Components', path: '/components/ui' },
        { text: 'Backend Components', path: '/components/backend' },
        { text: 'Infrastructure', path: '/components/infrastructure' }
      ]
    },
    { 
      icon: Code, 
      text: 'APIs', 
      path: '/apis',
      subItems: [
        { text: 'API Documentation', path: '/apis/docs' },
        { text: 'API Testing', path: '/apis/testing' }
      ]
    },
    { 
      icon: Database, 
      text: 'Resources', 
      path: '/resources',
      subItems: [
        { text: 'Cloud Resources', path: '/resources/cloud' },
        { text: 'On-Premise', path: '/resources/onprem' }
      ]
    },
    {
      icon: GitBranch,
      text: 'CI/CD Pipelines',
      path: '/pipelines',
      subItems: [
        { text: 'Pipeline Overview', path: '/pipelines' },
        { text: 'Build History', path: '/pipelines/history' },
        { text: 'Environments', path: '/pipelines/environments' }
      ]
    },
    { 
      icon: Package, 
      text: 'Systems', 
      path: '/systems',
      subItems: [
        { text: 'System Status', path: '/systems/status' },
        { text: 'System Metrics', path: '/systems/metrics' }
      ]
    },
    { icon: Users, text: 'Teams', path: '/teams' },
    { icon: Shield, text: 'Security', path: '/security' },
    { icon: Book, text: 'Documentation', path: '/docs' },
    { icon: Settings, text: 'Settings', path: '/settings' }
  ];

  // Get current page title based on path
  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(item => {
      if (item.path === currentPath) return true;
      if (item.subItems) {
        return item.subItems.some(subItem => subItem.path === currentPath);
      }
      return false;
    });
    return currentMenuItem ? currentMenuItem.text : 'Dashboard';
  };

  // Get current page description
  const getCurrentPageDescription = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Monitor and manage your platform resources';
      case '/resources':
        return 'Manage and monitor your infrastructure resources';
      case '/catalog':
        return 'Browse and manage all services and applications';
      case '/docs':
        return 'Access and manage platform documentation';
      case '/pipelines':
        return 'Monitor and manage CI/CD pipelines and deployments';
      case '/pipelines/history':
        return 'View build and deployment history';
      case '/pipelines/environments':
        return 'Manage deployment environments';
      case '/kubernetes':
      case '/kubernetes/clusters':
        return 'Manage and monitor Kubernetes clusters';
      case '/kubernetes/namespaces':
        return 'Configure and manage Kubernetes namespaces';
      case '/kubernetes/workloads':
        return 'Monitor and manage Kubernetes workloads';
      case '/kubernetes/helm':
        return 'Manage Helm charts and releases';
      case '/kubernetes/rbac':
        return 'Configure Kubernetes role-based access control';
      default:
        return 'Manage your platform components and services';
    }
  };

  const getEnvironmentStatus = () => {
    const environments = {
      production: { color: 'bg-green-500', text: 'Production Environment' },
      staging: { color: 'bg-yellow-500', text: 'Staging Environment' },
      development: { color: 'bg-blue-500', text: 'Development Environment' }
    };

    // You can add logic here to determine the current environment
    return environments.production;
  };

  const isPathActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const currentEnv = getEnvironmentStatus();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex items-center">
          <OceanWaveLogo className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold text-gray-900">OpsCanvas</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 flex flex-col">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              <button
                onClick={() => item.subItems && setExpandedSection(expandedSection === index ? null : index)}
                className={`flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors duration-150 ${
                  isPathActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.text}</span>
                </div>
                {item.subItems && (
                  expandedSection === index ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              {/* Submenu Items */}
              {item.subItems && expandedSection === index && (
                <div className="bg-gray-50 pl-14 py-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`block py-2 text-sm transition-colors duration-150 ${
                        location.pathname === subItem.path
                          ? 'text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {subItem.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Environment Indicator */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${currentEnv.color}`}></div>
            <span className="text-sm text-gray-600">{currentEnv.text}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Header Component */}
        <Header currentPage={getCurrentPageTitle()} />

        {/* Page Content */}
        <main className="flex-1 p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{getCurrentPageTitle()}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {getCurrentPageDescription()}
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              <p>© 2024 OpsCanvas. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;