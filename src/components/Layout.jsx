import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 w-full">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-30 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>

          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;


