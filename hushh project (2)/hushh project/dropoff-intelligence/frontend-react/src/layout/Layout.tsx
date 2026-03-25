import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full text-slate-800 font-sans overflow-hidden selection:bg-indigo-500/10">
      
      {/* Persistent Left Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Top Header */}
        <Topbar />
        
        {/* Route Injections go here */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
      </div>
      
    </div>
  );
};

export default Layout;
