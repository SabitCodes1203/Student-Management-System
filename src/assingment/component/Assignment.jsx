import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Calendar, Clock, FileText, Upload, CheckCircle2, AlertCircle, BookOpen, User, Award } from 'lucide-react';

// Animation variants
const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const cardVar = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.7 }
  }
};

const Assignment = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedAssignment, setExpandedAssignment] = useState(null);

  // Mock assignment data - replace with actual API calls
  const assignments = [
    {
      id: 1,
      courseCode: 'CSE201',
      courseName: 'Data Structures & Algorithms',
      title: 'Binary Search Tree Implementation',
      description: 'Implement a complete Binary Search Tree (BST) with insert, delete, search, and traversal operations. Include proper error handling and test cases.',
      dueDate: '2025-01-25',
      dueTime: '11:59 PM',
      status: 'pending',
      points: 100,
      submitted: false,
      submittedDate: null,
      faculty: 'Prof. Michael Chen',
      attachments: ['assignment_1.pdf', 'rubric.pdf']
    },
    {
      id: 2,
      courseCode: 'CSE301',
      courseName: 'Database Management Systems',
      title: 'SQL Query Optimization',
      description: 'Analyze and optimize 5 complex SQL queries. Provide before/after execution plans and explain your optimization strategies.',
      dueDate: '2025-01-20',
      dueTime: '11:59 PM',
      status: 'overdue',
      points: 150,
      submitted: false,
      submittedDate: null,
      faculty: 'Dr. Emily Rodriguez',
      attachments: ['assignment_2.pdf']
    },
    {
      id: 3,
      courseCode: 'CSE202',
      courseName: 'Object-Oriented Programming',
      title: 'Design Patterns Project',
      description: 'Implement three design patterns (Observer, Factory, Singleton) in a real-world application scenario. Provide UML diagrams and code documentation.',
      dueDate: '2025-02-01',
      dueTime: '11:59 PM',
      status: 'pending',
      points: 200,
      submitted: false,
      submittedDate: null,
      faculty: 'Prof. David Kim',
      attachments: ['assignment_3.pdf', 'requirements.docx']
    },
    {
      id: 4,
      courseCode: 'CSE302',
      courseName: 'Web Development',
      title: 'React Portfolio Website',
      description: 'Build a responsive portfolio website using React with at least 5 sections. Include animations, responsive design, and deploy to a hosting platform.',
      dueDate: '2025-01-15',
      dueTime: '11:59 PM',
      status: 'submitted',
      points: 150,
      submitted: true,
      submittedDate: '2025-01-14',
      faculty: 'Dr. Lisa Anderson',
      attachments: ['assignment_4.pdf'],
      grade: 95
    },
    {
      id: 5,
      courseCode: 'CSE401',
      courseName: 'Artificial Intelligence',
      title: 'Neural Network Implementation',
      description: 'Implement a neural network from scratch using Python to classify images. Compare performance with different architectures.',
      dueDate: '2025-02-10',
      dueTime: '11:59 PM',
      status: 'pending',
      points: 250,
      submitted: false,
      submittedDate: null,
      faculty: 'Prof. James Wilson',
      attachments: ['assignment_5.pdf', 'dataset.zip']
    },
    {
      id: 6,
      courseCode: 'CSE303',
      courseName: 'Computer Networks',
      title: 'TCP/IP Protocol Analysis',
      description: 'Analyze network packets using Wireshark. Identify and explain TCP/IP protocols, including handshakes and data flow.',
      dueDate: '2025-01-18',
      dueTime: '11:59 PM',
      status: 'submitted',
      points: 120,
      submitted: true,
      submittedDate: '2025-01-17',
      faculty: 'Dr. Maria Garcia',
      attachments: ['assignment_6.pdf'],
      grade: 88
    }
  ];

  const getStatusBadge = (status, submitted) => {
    if (submitted) {
      return {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle2,
        label: 'Submitted'
      };
    }

    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
      overdue: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle, label: 'Overdue' },
      submitted: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Submitted' }
    };

    return statusConfig[status] || statusConfig.pending;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return assignment.status === 'pending' && !assignment.submitted;
    if (selectedFilter === 'submitted') return assignment.submitted;
    if (selectedFilter === 'overdue') return assignment.status === 'overdue';
    return true;
  });

  const getStatusCount = () => {
    return {
      all: assignments.length,
      pending: assignments.filter(a => a.status === 'pending' && !a.submitted).length,
      submitted: assignments.filter(a => a.submitted).length,
      overdue: assignments.filter(a => a.status === 'overdue').length
    };
  };

  const statusCounts = getStatusCount();

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-r from-sky-400 to-gray-900 shadow-lg"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <ClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Assignments</h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mt-2">
              View and submit your course assignments
            </p>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold">{statusCounts.pending}</p>
              <p className="text-xs sm:text-sm opacity-90">Pending</p>
            </div>
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-bold">{statusCounts.submitted}</p>
              <p className="text-xs sm:text-sm opacity-90">Submitted</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {[
          { key: 'all', label: 'All', count: statusCounts.all },
          { key: 'pending', label: 'Pending', count: statusCounts.pending },
          { key: 'submitted', label: 'Submitted', count: statusCounts.submitted },
          { key: 'overdue', label: 'Overdue', count: statusCounts.overdue }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === filter.key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </motion.div>

      {/* Assignments Grid */}
      {filteredAssignments.length > 0 ? (
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {filteredAssignments.map((assignment) => {
            const statusConfig = getStatusBadge(assignment.status, assignment.submitted);
            const StatusIcon = statusConfig.icon;
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);

            return (
              <motion.div
                key={assignment.id}
                variants={cardVar}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-200"
              >
                {/* Assignment Header */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span className="text-xs sm:text-sm font-semibold text-blue-600">
                          {assignment.courseCode}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600">{assignment.courseName}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                      <StatusIcon size={12} />
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                {/* Assignment Details */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {assignment.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-xs text-gray-500">Due Date</p>
                        <p className="text-sm font-semibold">{formatDate(assignment.dueDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="text-xs text-gray-500">Points</p>
                        <p className="text-sm font-semibold">{assignment.points}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-500">Faculty</p>
                        <p className="text-sm font-semibold line-clamp-1">{assignment.faculty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <div>
                        <p className="text-xs text-gray-500">Time Left</p>
                        <p className={`text-sm font-semibold ${
                          daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 3 ? 'text-orange-600' : 'text-gray-800'
                        }`}>
                          {daysUntilDue < 0 ? 'Overdue' : daysUntilDue === 0 ? 'Due Today' : `${daysUntilDue} days`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submitted Info */}
                  {assignment.submitted && assignment.grade !== undefined && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-700">Grade: {assignment.grade}%</span>
                        <span className="text-xs text-green-600">
                          Submitted on {formatDate(assignment.submittedDate)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedAssignment(expandedAssignment === assignment.id ? null : assignment.id)}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      <FileText className="w-4 h-4 inline mr-2" />
                      {expandedAssignment === assignment.id ? 'Hide Details' : 'View Details'}
                    </motion.button>
                    {!assignment.submitted && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-green-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
                      >
                        <Upload className="w-4 h-4 inline mr-2" />
                        Submit
                      </motion.button>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {expandedAssignment === assignment.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t-2 border-gray-200 space-y-3"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Full Description</h4>
                        <p className="text-sm text-gray-600">{assignment.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Attachments</h4>
                        <div className="space-y-1">
                          {assignment.attachments.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                              <FileText className="w-4 h-4" />
                              <span className="cursor-pointer hover:underline">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Due Time: {assignment.dueTime}</p>
                        <p className="text-xs text-gray-500">Faculty: {assignment.faculty}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 text-center border-2 border-gray-200"
        >
          <ClipboardCheck className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
            No Assignments Found
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4">
            {selectedFilter === 'all' 
              ? 'Assignments will appear here once you enroll in courses.'
              : `No ${selectedFilter} assignments at the moment.`
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Assignment;

