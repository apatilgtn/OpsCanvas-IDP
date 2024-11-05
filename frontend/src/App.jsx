import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import ServiceCatalog from './pages/ServiceCatalog';
import Documentation from './pages/Documentation';
import CICDDashboard from './components/pipelines/CICDDashboard';
import KubernetesDashboard from './components/kubernetes/KubernetesDashboard';
import DockerManagement from './components/docker/DockerManagement';
import APIManagementPage from './pages/api-management/APIManagementPage';
import APIDocumentation from './pages/api-management/components/APIDocumentation';
import APIPlayground from './pages/api-management/components/APIPlayground';
import APIMetrics from './pages/api-management/components/APIMetrics'; 
import APISettings from './pages/api-management/components/APISettings';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Default route redirects to login */}
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />
      
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />

      {/* Protected Routes */}
      <Route path="/*" element={<Navigate to="/login" replace />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/resources/*" 
        element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/catalog/*" 
        element={
          <ProtectedRoute>
            <ServiceCatalog />
          </ProtectedRoute>
        } 
      />

      <Route
        path="/docs"
        element={
          <ProtectedRoute>
            <Documentation />
          </ProtectedRoute>
        }
      />

      {/* API Management Routes */}
      <Route
        path="/apis"
        element={
          <ProtectedRoute>
            <APIManagementPage />
          </ProtectedRoute>
        }
      />

      {/* API Detail Routes */}
      <Route
        path="/apis/:apiId/docs"
        element={
          <ProtectedRoute>
            <APIDocumentation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apis/:apiId/playground"
        element={
          <ProtectedRoute>
            <APIPlayground />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apis/:apiId/metrics"
        element={
          <ProtectedRoute>
            <APIMetrics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apis/:apiId/settings"
        element={
          <ProtectedRoute>
            <APISettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pipelines/*"
        element={
          <ProtectedRoute>
            <CICDDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kubernetes/*"
        element={
          <ProtectedRoute>
            <KubernetesDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/docker/*"
        element={
          <ProtectedRoute>
            <DockerManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;