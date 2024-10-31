import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const resourcesSubmenu = [
    { name: 'Databases', href: '/resources/databases' },
    { name: 'Storage', href: '/resources/storage' },
    { name: 'Compute', href: '/resources/compute' },
    { name: 'Network', href: '/resources/network' }
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left side - Navigation */}
          <div className="flex">
            <div className="flex space-x-8">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === '/dashboard'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>

              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    location.pathname.includes('/resources')
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Database className="w-4 h-4 mr-2" />
                  Resources
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {isResourcesOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                    {resourcesSubmenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Logo and User menu */}
          <div className="flex items-center space-x-6">
            {/* OpsCanvas Logo */}
            <span className="text-xl font-bold text-black">OpsCanvas</span>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">Admin</span>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;