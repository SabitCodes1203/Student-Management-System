import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';

const Assignment = () => {
  const MotionDiv = motion.div;
  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-r from-sky-400 to-gray-900 shadow-lg"
      >
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <ClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Assignments</h1>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-white/90 mt-2">
          View and submit your course assignments
        </p>
      </MotionDiv>

      {/* Content will go here */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 text-center border-3 border-gray-200 "
      >
        <ClipboardCheck className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
          No Assignments Available
        </h3>
        <p className="text-sm sm:text-base text-gray-500 mb-4">
          Assignments will appear here once you enroll in courses.
        </p>
      </MotionDiv>
    </div>
  );
};

export default Assignment;

