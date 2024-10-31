import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { 
  Settings, 
  Users, 
  BookOpen, 
  LayoutDashboard, 
  Package, 
  BarChart2, 
  Workflow, 
  Server,
  GitBranch,
  Database,
  Cog,
  Activity
} from 'lucide-react';

// Updated color scheme
const colors = {
  primary: '#0F172A',    // Slate 900
  secondary: '#3B82F6',  // Blue 500
  accent: '#6366F1',     // Indigo 500
  success: '#22C55E',    // Green 500
  warning: '#F59E0B',    // Amber 500
  error: '#EF4444',      // Red 500
  bronze: '#92400E',     // Amber 800
  silver: '#94A3B8',     // Slate 400
  gold: '#CA8A04',       // Yellow 700
  platinum: '#1E293B'    // Slate 800
};

// Updated deployment data with new color
const deployData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 65 },
  { name: 'Aug', value: 75 },
  { name: 'Sep', value: 80 },
  { name: 'Oct', value: 90 },
  { name: 'Nov', value: 100 },
  { name: 'Dec', value: 147 }
];

// Updated maturity data with new colors
const maturityData = [
  { name: 'Basic', value: 30, color: colors.error },
  { name: 'Bronze', value: 15, color: colors.bronze },
  { name: 'Silver', value: 25, color: colors.silver },
  { name: 'Gold', value: 20, color: colors.gold },
  { name: 'Platinum', value: 10, color: colors.platinum }
];

const Dashboard = () => {
  // Updated menu items with supported icons
  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', badge: null },
    { icon: Server, text: 'Services', badge: '237' },
    { icon: Package, text: 'Resources', badge: null },
    { icon: GitBranch, text: 'Development', badge: null },
    { icon: Database, text: 'Infrastructure', badge: null },
    { icon: Workflow, text: 'Deployments', badge: null },
    { icon: Cog, text: 'Tools', badge: null },
    { icon: Users, text: 'Teams', badge: null },
    { icon: BookOpen, text: 'Documentation', badge: null },
    { icon: BarChart2, text: 'Analytics', badge: null },
    { icon: Settings, text: 'Settings', badge: null }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Updated Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold mb-4">OpsCanvas IDP</h1>
          <p className="text-slate-400">Welcome, Admin!</p>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">{item.text}</span>
              </div>
              {item.badge && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Updated Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Platform Overview</h2>
          <p className="text-slate-600">Monitor your services and deployments</p>
        </div>

        {/* Updated Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Services', value: '237', change: '+12%', icon: Server },
            { title: 'Active Deployments', value: '147', change: '+8%', icon: Activity },
            { title: 'Team Members', value: '45', change: '+5%', icon: Users },
            { title: 'Success Rate', value: '99.9%', change: '+0.5%', icon: BarChart2 }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-600 text-sm font-medium">{stat.title}</h3>
                <stat.icon className="w-5 h-5 text-slate-400" />
              </div>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Service Maturity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Maturity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={maturityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                  >
                    {maturityData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Deployment Trends */}
          <div className="col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Deployment Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deployData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Bar dataKey="value" fill={colors.secondary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
            <button className="text-blue-500 hover:text-blue-600">View all</button>
          </div>
          <div className="space-y-4">
            {[
              { service: 'API Gateway', type: 'Deployment', time: '5 minutes ago', status: 'success' },
              { service: 'Auth Service', type: 'Config Change', time: '1 hour ago', status: 'warning' },
              { service: 'Database', type: 'Backup', time: '3 hours ago', status: 'success' },
              { service: 'Frontend', type: 'Deployment', time: '5 hours ago', status: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-amber-500'
                  }`} />
                  <div>
                    <p className="font-medium text-slate-900">{activity.service}</p>
                    <p className="text-sm text-slate-600">{activity.type}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-600">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;