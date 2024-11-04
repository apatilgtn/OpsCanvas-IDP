import React, { useState } from 'react';
import { 
  LayoutGrid,
  Box,
  Component,
  Code2,
  Database,
  Server,
  Users,
  Shield,
  FileText,
  Settings
} from 'lucide-react';

const SidebarMenu = () => {
  const [activeItem, setActiveItem] = useState('Overview');
  
  const menuItems = [
    { name: 'Overview', icon: LayoutGrid },
    { name: 'Service Catalog', icon: Box },
    { name: 'Components', icon: Component },
    { name: 'APIs', icon: Code2 },
    { name: 'Resources', icon: Database },
    { name: 'Systems', icon: Server },
    { name: 'Teams', icon: Users },
    { name: 'Security', icon: Shield },
    { name: 'Documentation', icon: FileText },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-50 border-r border-gray-200">
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center px-4 py-2 my-1 rounded-lg text-sm transition-colors duration-150 ${
                activeItem === item.name
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} className="mr-3" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarMenu;