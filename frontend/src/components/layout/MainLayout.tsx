import React from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-[#f8f9fa]">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#f0f2f5]">
        <div className="min-h-screen bg-[#1e2636] p-6">
          {children}
        </div>
      </main>
    </div>
  );
}