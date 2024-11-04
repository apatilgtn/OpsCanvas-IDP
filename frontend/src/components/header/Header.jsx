import React from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Help */}
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
          <Bell className="h-4 w-4" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-xs font-medium text-white">A</span>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-gray-900">Admin</div>
            <div className="text-[10px] text-gray-500">admin@cloudedge.dev</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;