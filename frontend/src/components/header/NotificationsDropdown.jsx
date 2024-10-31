// src/components/header/NotificationsDropdown.jsx
import React, { useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import useClickOutside from '../../hooks/useClickOutside';

const notifications = [
  { id: 1, title: 'Deployment Complete', message: 'Auth Service deployed successfully', time: '5m ago', type: 'success' },
  { id: 2, title: 'System Alert', message: 'High CPU usage detected', time: '10m ago', type: 'warning' },
  { id: 3, title: 'New Team Member', message: 'John Doe joined Team-A', time: '1h ago', type: 'info' }
];

const NotificationsDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setShowNotifications(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          {notifications.map((notification) => (
            <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
          ))}
          <div className="px-4 py-2 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;