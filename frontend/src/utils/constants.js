// src/utils/constants.js
import { 
    LayoutDashboard, 
    Package, 
    Code, 
    Database, 
    Users, 
    Shield, 
    Settings 
  } from 'lucide-react';
  
  export const MENU_ITEMS = [
    { icon: LayoutDashboard, text: 'Overview', path: '/dashboard' },
    { icon: Package, text: 'Components', path: '/components', count: '3' },
    { icon: Code, text: 'APIs', path: '/apis', count: '2' },
    { icon: Database, text: 'Resources', path: '/resources', count: '2' },
    { icon: Package, text: 'Systems', path: '/systems', count: '2' },
    { icon: Users, text: 'Teams', path: '/teams' },
    { icon: Shield, text: 'Security', path: '/security' },
    { icon: Settings, text: 'Settings', path: '/settings' }
  ];
  
  export const MOCK_NOTIFICATIONS = [
    {
      id: 1,
      title: 'Deployment Complete',
      message: 'Auth Service deployed successfully',
      time: '5m ago',
      type: 'success'
    },
    {
      id: 2,
      title: 'System Alert',
      message: 'High CPU usage detected',
      time: '10m ago',
      type: 'warning'
    },
    {
      id: 3,
      title: 'New Team Member',
      message: 'John Doe joined Team-A',
      time: '1h ago',
      type: 'info'
    }
  ];