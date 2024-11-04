import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ClusterList } from '@/components/kubernetes/ClusterList';

export default function KubernetesPage() {
  return (
    <MainLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Kubernetes</h1>
          <p className="text-gray-500">Manage and monitor Kubernetes clusters</p>
        </div>
        <ClusterList />
      </div>
    </MainLayout>
  );
}