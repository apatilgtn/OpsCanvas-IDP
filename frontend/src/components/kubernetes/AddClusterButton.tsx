import React from 'react';
import { Plus } from 'lucide-react';
import type { KubernetesCluster } from '@/types/kubernetes';

interface AddClusterButtonProps {
  onAdd: (cluster: KubernetesCluster) => void;
}

export function AddClusterButton({ onAdd }: AddClusterButtonProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddCluster = () => {
    // This is a mock implementation. In a real app, you would have a form
    // and proper validation before creating a new cluster
    const newCluster: KubernetesCluster = {
      id: `cluster-${Date.now()}`,
      name: 'new-cluster',
      provider: 'AKS',
      version: '1.25.6',
      status: 'healthy',
      metrics: {
        cpu: { used: 0, total: 100 },
        memory: { used: 0, total: 128 },
        nodes: 3,
        pods: { running: 0, total: 50 }
      },
      healthIssues: []
    };

    onAdd(newCluster);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Cluster
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Cluster</h2>
            <p className="text-gray-500 mb-4">
              This is a placeholder for the cluster creation form.
              In a real application, you would have fields for:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-600">
              <li>Cluster name</li>
              <li>Provider selection</li>
              <li>Version selection</li>
              <li>Node pool configuration</li>
              <li>Network settings</li>
            </ul>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCluster}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Cluster
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}