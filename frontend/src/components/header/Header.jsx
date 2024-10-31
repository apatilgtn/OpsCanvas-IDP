import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, HelpCircle } from 'lucide-react';
import UserProfileDropdown from '../profile/UserProfileDropdown';

const Header = () => {
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Search Bar */}
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <HelpCircle className="w-5 h-5" />
          </button>
          <UserProfileDropdown />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-8 -mb-px flex space-x-6">
        <Link
          to="/dashboard"
          className={`px-3 py-4 text-sm font-medium border-b-2 ${
            location.pathname === '/dashboard'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/resources"
          className={`px-3 py-4 text-sm font-medium border-b-2 ${
            location.pathname === '/resources'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Resources
        </Link>
      </div>
    </header>
  );
};

export default Header;