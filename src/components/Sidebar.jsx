import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserPlus, BookOpen, ClipboardCheck, Trophy, FileText, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Registration',
      path: '/registration',
      icon: UserPlus,
    },
    {
      name: 'Courses',
      path: '/courses',
      icon: BookOpen,
    },
    {
      name: 'Assignment',
      path: '/assignment',
      icon: ClipboardCheck,
    },
    {
      name: 'Result',
      path: '/result',
      icon: Trophy,
    },
    {
      name: 'Application',
      path: '/application',
      icon: FileText,
    },
    {
      name: 'Finance',
      path: '/finance',
      icon: Wallet,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-gray-50 border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                {/* Student Picture - Replace with actual image */}
                <span className="text-gray-500 text-2xl">👤</span>
              </div>
              <p className="text-sm font-medium text-gray-800 text-center">
                {user?.fullName || 'Student Name'}
              </p>
              <p className="text-xs text-gray-500 text-center mt-1 truncate w-full">
                {user?.email || 'student@example.com'}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-2">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
            <div className="text-xs text-gray-500 text-center">
              <p>© 2025 Student Dashboard</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


