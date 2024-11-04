// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import ServiceCatalog from './pages/ServiceCatalog';
import Documentation from './pages/Documentation';
import CICDDashboard from './components/pipelines/CICDDashboard';
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
      
      {/* Login Route */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />

      {/* Protected Routes */}
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
      <Route
        path="/pipelines/*"
        element={
          <ProtectedRoute>
            <CICDDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all unmatched routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;