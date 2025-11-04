import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600">
              Student Dashboard
            </Link>
          </div>

          {/* Desktop User Section */}
          <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-1 md:space-x-2 text-gray-700 px-2 md:px-3 py-2">
                  <User size={20} />
                  <span className="text-sm font-medium">{user?.fullName || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 md:space-x-2 text-red-600 hover:text-red-700 px-2 md:px-3 py-2 rounded-md transition-colors"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 md:space-x-2 text-gray-700 hover:text-blue-600 px-2 md:px-3 py-2 rounded-md transition-colors"
              >
                <LogIn size={20} />
                <span className="text-sm font-medium">Log In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                <div className="w-full flex items-center space-x-3 text-gray-700 px-4 py-3">
                  <User size={20} />
                  <span className="text-base font-medium">{user?.fullName || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-3 rounded-md transition-colors"
                >
                  <LogOut size={20} />
                  <span className="text-base font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-md transition-colors"
              >
                <LogIn size={20} />
                <span className="text-base font-medium">Log In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

