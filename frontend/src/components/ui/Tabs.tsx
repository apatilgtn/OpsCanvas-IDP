import React from 'react';
import { Icon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px space-x-8">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center gap-2 px-1 py-4 border-b-2 text-sm font-medium
                ${isActive 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <div className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                {/* Icon would be rendered here based on the icon name */}
              </div>
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}