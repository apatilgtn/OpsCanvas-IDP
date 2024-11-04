// src/components/Layout.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database,
  Code,
  Package,
  Users,
  Shield,
  Settings,
  Server,
  Book,
  ChevronDown,
  ChevronUp,
  GitBranch,
  Activity,
  Cloud,
  Box,
  Container,
  Image,
  Network,
  Cpu,
  FileText,
  Boxes,
  FolderOpen,
  MonitorDot,
  BarChart3,
  GitPullRequest,
  MessageSquare,
  Bell,
  HelpCircle
} from 'lucide-react';
import { 
  KubernetesIcon, 
  DockerIcon, 
  CICDIcon, 
  APIIcon 
} from './icons/TechIcons';
import Header from './header/Header';
import CloudEdgeLogo from './CloudEdgeLogo';

const Layout = ({ children }) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState(null);

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      text: 'Overview', 
      path: '/dashboard',
      iconClassName: 'text-indigo-500'
    },
    { 
      icon: BarChart3, 
      text: 'Service Catalog', 
      path: '/catalog',
      iconClassName: 'text-blue-500',
      subItems: [
        { text: 'Services List', path: '/catalog/services', icon: FolderOpen },
        { text: 'Service Metrics', path: '/catalog/metrics', icon: Activity }
      ]
    },
    {
      CustomIcon: KubernetesIcon,
      text: 'Kubernetes',
      path: '/kubernetes',
      iconClassName: 'text-[#326CE5]',
      subItems: [
        { text: 'Clusters', path: '/kubernetes/clusters', icon: Network },
        { text: 'Namespaces', path: '/kubernetes/namespaces', icon: Box },
        { text: 'Workloads', path: '/kubernetes/workloads', icon: Cpu },
        { text: 'Helm Charts', path: '/kubernetes/helm', icon: Package },
        { text: 'RBAC', path: '/kubernetes/rbac', icon: Shield }
      ]
    },
    {
      CustomIcon: DockerIcon,
      text: 'Docker',
      path: '/docker',
      iconClassName: 'text-[#2496ED]',
      subItems: [
        { text: 'Containers', path: '/docker/containers', icon: Container },
        { text: 'Images', path: '/docker/images', icon: Image },
        { text: 'Security', path: '/docker/security', icon: Shield },
        { text: 'Registry', path: '/docker/registry', icon: Database }
      ]
    },
    { 
      icon: Package, 
      text: 'Components', 
      path: '/components',
      iconClassName: 'text-violet-500',
      subItems: [
        { text: 'UI Components', path: '/components/ui', icon: MonitorDot },
        { text: 'Backend Components', path: '/components/backend', icon: Server },
        { text: 'Infrastructure', path: '/components/infrastructure', icon: Network }
      ]
    },
    {
      CustomIcon: APIIcon,
      text: 'APIs',
      path: '/apis',
      iconClassName: 'text-purple-500',
      subItems: [
        { text: 'API Documentation', path: '/apis/docs', icon: FileText },
        { text: 'API Testing', path: '/apis/testing', icon: Activity }
      ]
    },
    { 
      icon: Database, 
      text: 'Resources', 
      path: '/resources',
      iconClassName: 'text-emerald-500',
      subItems: [
        { text: 'Cloud Resources', path: '/resources/cloud', icon: Cloud },
        { text: 'On-Premise', path: '/resources/onprem', icon: Server }
      ]
    },
    {
      CustomIcon: CICDIcon,
      text: 'CI/CD Pipelines',
      path: '/pipelines',
      iconClassName: 'text-green-500',
      subItems: [
        { text: 'Pipeline Overview', path: '/pipelines', icon: GitPullRequest },
        { text: 'Build History', path: '/pipelines/history', icon: FileText },
        { text: 'Environments', path: '/pipelines/environments', icon: Cloud }
      ]
    },
    { 
      icon: Users, 
      text: 'Teams', 
      path: '/teams',
      iconClassName: 'text-orange-500' 
    },
    { 
      icon: Shield, 
      text: 'Security', 
      path: '/security',
      iconClassName: 'text-red-500'
    },
    { 
      icon: MessageSquare, 
      text: 'Documentation', 
      path: '/docs',
      iconClassName: 'text-sky-500'
    },
    { 
      icon: Settings, 
      text: 'Settings', 
      path: '/settings',
      iconClassName: 'text-gray-500'
    }
  ];

  const isPathActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getEnvironmentStatus = () => {
    const environments = {
      production: { color: 'bg-green-500', text: 'Production Environment' },
      staging: { color: 'bg-yellow-500', text: 'Staging Environment' },
      development: { color: 'bg-blue-500', text: 'Development Environment' }
    };
    return environments.production;
  };

  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(item => {
      if (item.path === currentPath) return true;
      if (item.subItems) {
        return item.subItems.some(subItem => subItem.path === currentPath);
      }
      return false;
    });
    return currentMenuItem ? currentMenuItem.text : 'Dashboard';
  };

  const getCurrentPageDescription = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Monitor and manage your platform resources';
      case '/resources':
        return 'Manage and monitor your infrastructure resources';
      case '/catalog':
        return 'Browse and manage all services and applications';
      case '/docs':
        return 'Access and manage platform documentation';
      case '/pipelines':
        return 'Monitor and manage CI/CD pipelines and deployments';
      case '/pipelines/history':
        return 'View build and deployment history';
      case '/pipelines/environments':
        return 'Manage deployment environments';
      case '/kubernetes':
      case '/kubernetes/clusters':
        return 'Manage and monitor Kubernetes clusters';
      case '/kubernetes/namespaces':
        return 'Configure and manage Kubernetes namespaces';
      case '/kubernetes/workloads':
        return 'Monitor and manage Kubernetes workloads';
      case '/kubernetes/helm':
        return 'Manage Helm charts and releases';
      case '/kubernetes/rbac':
        return 'Configure Kubernetes role-based access control';
      case '/docker':
      case '/docker/containers':
        return 'Manage and monitor Docker containers';
      case '/docker/images':
        return 'Manage Docker images and repositories';
      case '/docker/security':
        return 'Monitor container security and vulnerabilities';
      case '/docker/registry':
        return 'Manage container registries and image distribution';
      default:
        return 'Manage your platform components and services';
    }
  };

  const currentEnv = getEnvironmentStatus();

  return (
    <div className="min-h-screen flex bg-[#f0f2f5]">
      {/* Sidebar */}
      <div className="w-56 fixed inset-y-0 bg-[#1a1f2a] z-30">
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-[#2a3241]">
          <CloudEdgeLogo className="h-6 w-6 text-blue-500" />
          <div className="ml-2">
            <h1 className="text-sm font-semibold text-white">CloudEdgeOps</h1>
            <span className="text-[10px] text-gray-400">Enterprise Edition</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => item.subItems && setExpandedSection(expandedSection === index ? null : index)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-xs font-medium
                  rounded-md transition-all duration-200 ease-out
                  group hover:bg-[#2a3241]
                  ${isPathActive(item.path)
                    ? 'text-blue-400 bg-[#2a3241]'
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                <div className="flex items-center">
                  {item.CustomIcon ? (
                    <item.CustomIcon className="w-4 h-4 mr-2" />
                  ) : (
                    <item.icon className="w-4 h-4 mr-2" />
                  )}
                  <span>{item.text}</span>
                </div>
                {item.subItems && (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
              
              {item.subItems && expandedSection === index && (
                <div className="mt-0.5 ml-3 pl-3 border-l border-[#2a3241] space-y-0.5">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`
                        flex items-center px-3 py-1.5 text-xs rounded-md
                        transition-colors duration-150
                        ${location.pathname === subItem.path
                          ? 'text-blue-400 bg-[#2a3241]'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a3241]'
                        }
                      `}
                    >
                      {subItem.icon && 
                        <subItem.icon className="w-3.5 h-3.5 mr-2" />
                      }
                      <span>{subItem.text}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Environment Selector */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#2a3241] bg-[#1e2330] p-3">
          <div className="flex items-center space-x-2">
            <div className={`w-1.5 h-1.5 rounded-full ${currentEnv.color}`}></div>
            <span className="text-xs text-gray-400">{currentEnv.text}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-56">
        {/* Header */}
        <Header currentPage={getCurrentPageTitle()} />

        {/* Page Content */}
        <main className="p-6 bg-[#f0f2f5] min-h-[calc(100vh-3.5rem)]">
          {/* Page Title */}
          <div className="mb-4">
            <h1 className="text-base font-semibold text-gray-900">{getCurrentPageTitle()}</h1>
            <p className="mt-1 text-xs text-gray-500">
              {getCurrentPageDescription()}
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;