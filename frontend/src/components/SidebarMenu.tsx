import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
  Settings,
  ChevronDown,
  MonitorDot,
  Cloud,
  Activity
} from 'lucide-react';
import CloudEdgeLogo from './CloudEdgeLogo';

const SidebarMenu = () => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const menuItems = [
    { 
      name: 'Overview', 
      icon: LayoutGrid,
      path: '/dashboard',
    },
    { 
      name: 'Service Catalog', 
      icon: Box,
      path: '/catalog',
      subItems: [
        { name: 'Services', icon: MonitorDot, path: '/catalog/services' },
        { name: 'Metrics', icon: Activity, path: '/catalog/metrics' }
      ]
    },
    { 
      name: 'Components', 
      icon: Component,
      path: '/components',
      subItems: [
        { name: 'UI Components', icon: Box, path: '/components/ui' },
        { name: 'Backend Services', icon: Server, path: '/components/backend' }
      ]
    },
    { 
      name: 'APIs', 
      icon: Code2,
      path: '/apis' 
    },
    { 
      name: 'Resources', 
      icon: Database,
      path: '/resources',
      subItems: [
        { name: 'Cloud Resources', icon: Cloud, path: '/resources/cloud' },
        { name: 'On-Premise', icon: Server, path: '/resources/onprem' }
      ]
    },
    { 
      name: 'Infrastructure', 
      icon: Server,
      path: '/infrastructure' 
    },
    { 
      name: 'Teams', 
      icon: Users,
      path: '/teams' 
    },
    { 
      name: 'Security', 
      icon: Shield,
      path: '/security' 
    },
    { 
      name: 'Documentation', 
      icon: FileText,
      path: '/docs' 
    },
    { 
      name: 'Settings', 
      icon: Settings,
      path: '/settings' 
    }
  ];

  const isPathActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="w-56 min-h-screen bg-[#1a1f2a] border-r border-gray-800">
      {/* Logo */}
      <div className="h-14 flex items