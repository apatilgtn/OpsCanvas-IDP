// src/components/kubernetes/RBACManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Users,
  Key,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

const RBACManager = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [bindings, setBindings] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data
  const mockRoles = [
    {
      name: 'pod-reader',
      namespace: 'default',
      rules: [
        {
          apiGroups: [''],
          resources: ['pods'],
          verbs: ['get', 'list', 'watch']
        }
      ]
    },
    {
      name: 'deployment-manager',
      namespace: 'applications',
      rules: [
        {
          apiGroups: ['apps'],
          resources: ['deployments'],
          verbs: ['get', 'list', 'watch', 'create', 'update', 'patch', 'delete']
        }
      ]
    }
  ];

  const mockBindings = [
    {
      name: 'dev-pod-readers',
      namespace: 'default',
      roleRef: {
        name: 'pod-reader',
        kind: 'Role'
      },
      subjects: [
        {
          kind: 'Group',
          name: 'developers'
        }
      ]
    },
    {
      name: 'ops-deployment-managers',
      namespace: 'applications',
      roleRef: {
        name: 'deployment-manager',
        kind: 'Role'
      },
      subjects: [
        {
          kind: 'Group',
          name: 'operations'
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRoles(mockRoles);
        setBindings(mockBindings);
      } catch (error) {
        console.error('Failed to fetch RBAC data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTabs = () => (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab('roles')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'roles'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Roles
        </button>
        <button
          onClick={() => setActiveTab('bindings')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'bindings'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Role Bindings
        </button>
      </nav>
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Roles</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </button>
      </div>

      {roles.map((role) => (
        <div
          key={role.name}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">{role.name}</h4>
                <p className="text-sm text-gray-500">Namespace: {role.namespace}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 text-red-400 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-500 mb-2">Rules</h5>
            {role.rules.map((rule, index) => (
              <div key={index} className="bg-gray-50 rounded-md p-4 mb-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">API Groups</p>
                    <p className="text-sm text-gray-900">
                      {rule.apiGroups.length ? rule.apiGroups.join(', ') : '""'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Resources</p>
                    <p className="text-sm text-gray-900">{rule.resources.join(', ')}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-500">Verbs</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {rule.verbs.map((verb) => (
                      <span
                        key={verb}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {verb}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderBindings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Role Bindings</h3>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Binding
        </button>
      </div>

      {bindings.map((binding) => (
        <div
          key={binding.name}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Key className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">{binding.name}</h4>
                <p className="text-sm text-gray-500">Namespace: {binding.namespace}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 text-red-400 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h5 className="text-sm font-medium text-gray-500 mb-2">Role Reference</h5>
              <div className="bg-gray-50 rounded-md p-4">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Name:</span> {binding.roleRef.name}
                </p>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Kind:</span> {binding.roleRef.kind}
                </p>
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-500 mb-2">Subjects</h5>
              <div className="space-y-2">
                {binding.subjects.map((subject, index) => (
                  <div key={index} className="bg-gray-50 rounded-md p-4">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Kind:</span> {subject.kind}
                    </p>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Name:</span> {subject.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">RBAC Management</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage Kubernetes Role-Based Access Control
        </p>
      </div>

      {renderTabs()}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        activeTab === 'roles' ? renderRoles() : renderBindings()
      )}
    </div>
  );
};

export default RBACManager;