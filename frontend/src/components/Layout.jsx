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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 fixed inset-y-0 border-r border-gray-200 bg-white z-30">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <CloudEdgeLogo className="h-8 w-8 text-blue-600" />
          <div className="ml-3">
            <h1 className="text-lg font-bold text-gray-900">CloudEdgeOps</h1>
            <span className="text-xs text-gray-500">Enterprise Edition</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => item.subItems && setExpandedSection(expandedSection === index ? null : index)}
                className={`
                  w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium
                  rounded-lg transition-all duration-200 ease-out
                  group hover:bg-gray-50
                  ${isPathActive(item.path)
                    ? 'text-blue-600 bg-blue-50/80'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center">
                  {item.CustomIcon ? (
                    <item.CustomIcon 
                      className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                        isPathActive(item.path) 
                          ? item.iconClassName 
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                  ) : (
                    <item.icon 
                      className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                        isPathActive(item.path) 
                          ? item.iconClassName 
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    />
                  )}
                  <span>{item.text}</span>
                </div>
                {item.subItems && (
                  <ChevronDown 
                    className={`
                      w-4 h-4 text-gray-400 transition-transform duration-200
                      ${expandedSection === index ? 'rotate-180' : ''}
                    `}
                  />
                )}
              </button>
              
              {item.subItems && expandedSection === index && (
                <div className="mt-1 ml-4 pl-4 border-l border-gray-200 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subItem.path}
                      className={`
                        flex items-center px-4 py-2 text-sm rounded-lg
                        transition-colors duration-150
                        ${location.pathname === subItem.path
                          ? 'text-blue-600 bg-blue-50/60'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      {subItem.icon && 
                        <subItem.icon 
                          className={`
                            w-4 h-4 mr-2
                            ${location.pathname === subItem.path
                              ? 'text-blue-500'
                              : 'text-gray-400'
                            }
                          `}
                        />
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
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${currentEnv.color}`}></div>
            <span className="text-sm text-gray-600">{currentEnv.text}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <Header currentPage={getCurrentPageTitle()} />

        {/* Page Content */}
        <main className="p-8 bg-gray-50 min-h-[calc(100vh-4rem)]">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{getCurrentPageTitle()}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {getCurrentPageDescription()}
            </p>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-lg border border-gray-200">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;