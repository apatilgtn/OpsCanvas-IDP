import React from 'react';
import { 
  Boxes, 
  Network, 
  Package, 
  Lock,
  Layers,
  LayoutDashboard,
  List,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  isExpandable?: boolean;
}

const mainNavItems: SidebarItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <LayoutDashboard className="w-4 h-4" />,
    href: '/overview'
  },
  {
    id: 'service-catalog',
    label: 'Service Catalog',
    icon: <List className="w-4 h-4" />,
    href: '/service-catalog',
    isExpandable: true
  }
];

const kubernetesItems: SidebarItem[] = [
  {
    id: 'clusters',
    label: 'Clusters',
    icon: <Network className="w-4 h-4" />,
    href: '/kubernetes/clusters'
  },
  {
    id: 'namespaces',
    label: 'Namespaces',
    icon: <Layers className="w-4 h-4" />,
    href: '/kubernetes/namespaces'
  },
  {
    id: 'workloads',
    label: 'Workloads',
    icon: <Boxes className="w-4 h-4" />,
    href: '/kubernetes/workloads'
  },
  {
    id: 'helm',
    label: 'Helm Charts',
    icon: <Package className="w-4 h-4" />,
    href: '/kubernetes/helm'
  },
  {
    id: 'rbac',
    label: 'RBAC',
    icon: <Lock className="w-4 h-4" />,
    href: '/kubernetes/rbac'
  }
];

const bottomNavItems: SidebarItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
    href: '/settings'
  }
];

export function Sidebar() {
  return (
    <div className="w-56 bg-[#1a1f2a] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#2a3241]">
        <h1 className="text-sm font-semibold text-white">CloudEdgeOps</h1>
        <span className="text-xs text-gray-400">Enterprise Edition</span>
      </div>
      
      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4">
        {/* Main Nav Section */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        {/* Kubernetes Section */}
        <div className="mt-6">
          <div className="flex items-center">
            <span className="text-xs font-medium text-[#4e5669] uppercase tracking-wider">
              Kubernetes
            </span>
          </div>
          <div className="mt-2 space-y-1">
            {kubernetesItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-2 border-t border-[#2a3241]">
        {bottomNavItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function NavItem({ item }: { item: SidebarItem }) {
  return (
    <Link
      href={item.href}
      className="flex items-center gap-2 px-3 py-2 text-xs rounded-md text-gray-300 hover:bg-[#2a3241] hover:text-white transition-colors"
    >
      {item.icon}
      <span>{item.label}</span>
      {item.isExpandable && (
        <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </Link>
  );
}