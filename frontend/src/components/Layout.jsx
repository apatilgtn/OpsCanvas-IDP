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
  Server
} from 'lucide-react';
import Header from './header/Header';

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, text: 'Overview', path: '/dashboard' },
    { icon: Server, text: 'Service Catalog', path: '/catalog', count: '2' },  // Add this item
    { icon: Package, text: 'Components', path: '/components', count: '3' },
    { icon: Code, text: 'APIs', path: '/apis', count: '2' },
    { icon: Database, text: 'Resources', path: '/resources', count: '2' },
    { icon: Package, text: 'Systems', path: '/systems', count: '2' },
    { icon: Users, text: 'Teams', path: '/teams' },
    { icon: Shield, text: 'Security', path: '/security' },
    { icon: Settings, text: 'Settings', path: '/settings' }
  ];

  // Get current page title based on path
  const getCurrentPageTitle = () => {
    const currentMenuItem = menuItems.find(item => item.path === location.pathname);
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
      default:
        return 'Manage your platform components and services';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">OpsCanvas</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 flex flex-col">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center justify-between px-6 py-2 text-sm font-medium transition-colors duration-150 ${
                location.pathname === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.text}</span>
              </div>
              {item.count && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Environment Indicator */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Production Environment</span>
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