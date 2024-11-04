// src/components/header/Header.jsx
import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';

const Header = ({ currentPage }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            <Bell className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
              <span className="text-sm font-medium text-gray-200">Admin</span>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 
                  ${showUserMenu ? 'rotate-180' : ''}`} 
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg bg-gray-800 shadow-lg border border-gray-700 py-1">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm font-medium text-gray-200">Admin User</p>
                  <p className="text-sm text-gray-400">admin@example.com</p>
                </div>

                <div className="py-1">
                  <button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;