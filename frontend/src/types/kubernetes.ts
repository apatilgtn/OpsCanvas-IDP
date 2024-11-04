export type ClusterProvider = 'AKS' | 'GKE' | 'EKS';
export type ClusterStatus = 'healthy' | 'warning' | 'error';

export interface ResourceMetrics {
  used: number;
  total: number;
}

export interface ClusterMetrics {
  nodes: number;
  pods: {
    running: number;
    total: number;
  };
  cpu: ResourceMetrics;
  memory: ResourceMetrics;
}

export interface HealthIssue {
  message: string;
  nodeId?: string;
}

export interface KubernetesCluster {
  id: string;
  name: string;
  provider: ClusterProvider;
  version: string;
  status: ClusterStatus;
  metrics: ClusterMetrics;
  healthIssues?: HealthIssue[];
}