import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get current date
  const currentDate = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
  // Determine which icon to show based on gender
  const getIconPath = () => {
    const gender = user?.gender?.toLowerCase();
    if (gender === 'female') {
      return '/female.png';
    } else if (gender === 'male') {
      return '/male.png';
    }
    // Default to male icon if gender is not specified or is 'other'
    return '/male.png';
  };

  return (
    <div className="border-1 border-gray-300 w-full max-w-full mt-5 h-auto rounded-2xl bg-gradient-to-r from-sky-400 to-gray-900 flex flex-col sm:flex-row justify-between shadow-xl overflow-hidden">
      
      {/* ==== Left Section (Text) ==== */}
      <div className="flex p-4 sm:p-6 flex-col gap-8 sm:gap-20 flex-1">
        <div>
          <h1 className="text-sm sm:text-lg font-semibold text-white">{formattedDate}</h1>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Welcome back, {user?.fullName || 'Student'}
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-2 text-white">Student dashboard updated!</p>
        </div>
      </div>

      {/* ==== Right Section (Animated Icon) ==== */}
      <div className="flex-shrink-0 relative flex items-end justify-center sm:justify-end h-40 sm:h-full">
        <motion.img
          src={getIconPath()}
          alt="Student Icon"
          className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain"
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16, mass: 0.6 }}
          whileHover={{ y: -4, rotate: -1 }}
          whileTap={{ scale: 0.98 }}
          key={getIconPath()} // Force re-render when icon changes
        />
      </div>
    </div>
  );
};

export default Dashboard;
