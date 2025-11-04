import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

const Result = () => {
  const [activeTab, setActiveTab] = useState('recent');

  // Mock data for results
  const recentResults = [
    {
      id: 1,
      courseCode: 'CSE101',
      courseName: 'Introduction to Programming',
      exam: 'Midterm Exam',
      score: 85,
      grade: 'A',
      date: '2025-01-15',
      status: 'passed'
    },
    {
      id: 2,
      courseCode: 'CSE201',
      courseName: 'Data Structures & Algorithms',
      exam: 'Quiz 3',
      score: 92,
      grade: 'A+',
      date: '2025-01-12',
      status: 'passed'
    },
    {
      id: 3,
      courseCode: 'CSE301',
      courseName: 'Database Management Systems',
      exam: 'Assignment 2',
      score: 78,
      grade: 'B+',
      date: '2025-01-10',
      status: 'passed'
    }
  ];

  const allResults = [
    ...recentResults,
    {
      id: 4,
      courseCode: 'CSE202',
      courseName: 'Object-Oriented Programming',
      exam: 'Final Project',
      score: 65,
      grade: 'C+',
      date: '2024-12-20',
      status: 'passed'
    },
    {
      id: 5,
      courseCode: 'CSE302',
      courseName: 'Web Development',
      exam: 'Midterm Exam',
      score: 88,
      grade: 'A',
      date: '2024-12-15',
      status: 'passed'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'passed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-green-600';
    if (grade === 'B+' || grade === 'B') return 'text-blue-600';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-4 sm:p-6 rounded-2xl  bg-gradient-to-r from-sky-400 to-gray-900 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Results</h1>
        </div>
        <p className="text-sm sm:text-base text-white/90 mt-2">
          View your academic performance and exam results
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-md p-4"
      >
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'recent'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            Recent Results
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'all'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            All Results
          </button>
        </div>
      </motion.div>

      {/* Results List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {(activeTab === 'recent' ? recentResults : allResults).map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-3 border-gray-200"
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left Section */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {result.courseCode}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(result.status)}`}>
                      {result.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                    {result.courseName}
                  </h3>
                  <p className="text-gray-600 mb-2">{result.exam}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {result.date}
                    </div>
                  </div>
                </div>

                {/* Right Section - Score & Grade */}
                <div className="flex sm:flex-col items-center sm:items-end gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Score</p>
                    <p className="text-2xl font-bold text-gray-800">{result.score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Grade</p>
                    <p className={`text-3xl font-bold ${getGradeColor(result.grade)}`}>{result.grade}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Result;

