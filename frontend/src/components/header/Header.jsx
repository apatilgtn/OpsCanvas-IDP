import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  LogOut, 
  UserCircle, 
  Settings,
  Mail,
  LifeBuoy,
  AlertCircle,
  FileText,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

const Header = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  // Close dropdown when clicking outside
  const closeUserMenu = useCallback(() => {
    setShowUserMenu(false);
  }, []);

  const closeNotifications = useCallback(() => {
    setShowNotifications(false);
  }, []);

  const closeHelp = useCallback(() => {
    setShowHelp(false);
  }, []);

  const userMenuRef = useClickOutside(closeUserMenu);
  const notificationsRef = useClickOutside(closeNotifications);
  const helpRef = useClickOutside(closeHelp);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login', { replace: true });
  };

  const mockNotifications = [
    {
      id: 1,
      type: 'alert',
      message: 'High CPU usage detected in production cluster',
      time: '5m ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'Deployment completed successfully',
      time: '15m ago'
    },
    {
      id: 3,
      type: 'warning',
      message: 'Memory usage approaching limit',
      time: '1h ago'
    }
  ];

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 relative z-50">
      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources, docs, and more..."
            className="w-full pl-10 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md 
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                     placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-2">
        {/* Help Menu */}
        <div className="relative" ref={helpRef}>
          <button 
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md"
            onClick={() => setShowHelp(!showHelp)}
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {showHelp && (
            <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1">
              <button className="w-full flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <LifeBuoy className="h-4 w-4 mr-2 text-gray-500" />
                Help Center
              </button>
              <button className="w-full flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                Contact Support
              </button>
              <div className="border-t border-gray-200 my-1"></div>
              <button className="w-full flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                <FileText className="h-4 w-4 mr-2 text-gray-500" />
                Documentation
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button 
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-1 w-80 bg-white rounded-md shadow-lg border border-gray-200 py-1">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-xs font-medium text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-start">
                      <span className="flex-shrink-0 mt-0.5">
                        {notification.type === 'alert' && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        {notification.type === 'warning' && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        {notification.type === 'info' && (
                          <Info className="h-4 w-4 text-blue-500" />
                        )}
                      </span>
                      <div className="ml-3 flex-1">
                        <p className="text-xs text-gray-900">{notification.message}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-xs text-blue-600 hover:text-blue-700">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-md p-1.5 transition-colors duration-150"
          >
            <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xs font-medium text-white">A</span>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-gray-900">Admin</div>
              <div className="text-[10px] text-gray-500">admin@cloudedge.dev</div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-xs font-medium text-gray-900">Signed in as</p>
                <p className="text-xs text-gray-600">admin@cloudedge.dev</p>
              </div>

              <button 
                className="w-full flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
              >
                <UserCircle className="h-4 w-4 mr-2 text-gray-500" />
                Your Profile
              </button>
              
              <button 
                className="w-full flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
              >
                <Settings className="h-4 w-4 mr-2 text-gray-500" />
                Settings
              </button>
              
              <div className="border-t border-gray-200 my-1"></div>
              
              <button 
                className="w-full flex items-center px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;