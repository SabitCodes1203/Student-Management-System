import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, CheckCircle, AlertCircle, Download, Plus, X } from 'lucide-react';

const Application = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    course: '',
    courseCode: '',
    priority: 'medium'
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-blue-100 text-blue-700'
    };
    return `px-2 py-1 rounded-full text-xs font-semibold ${colors[priority]}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      id: Date.now(),
      type: formData.type,
      course: formData.course || 'N/A',
      courseCode: formData.courseCode || 'N/A',
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      priority: formData.priority
    };

    setApplications([...applications, newApplication]);
    setFormData({
      type: '',
      course: '',
      courseCode: '',
      priority: 'medium'
    });
    setIsModalOpen(false);
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const processedApplications = applications.filter(app => app.status !== 'pending');

  const displayApplications = activeTab === 'all' 
    ? applications 
    : activeTab === 'pending' 
    ? pendingApplications 
    : processedApplications;

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // header section banner color
        className="w-full p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-400 to-gray-900 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Applications</h1>
        </div>
        <p className="text-sm sm:text-base text-white/90 mt-2">
          Track your submitted applications and requests
        </p>
      </motion.div>

      {/* Create Application Button and Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-md p-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            Create New Application
          </motion.button>

          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'pending'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Pending ({pendingApplications.length})
            </button>
            <button
              onClick={() => setActiveTab('processed')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'processed'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Processed ({processedApplications.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'all'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              All ({applications.length})
            </button>
          </div>
        </div>
      </motion.div>

      {/* Applications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {displayApplications.length > 0 ? (
          displayApplications.map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border-3 border-gray-200"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-4">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                        {application.type}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border flex items-center gap-1 ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                        <span className={getPriorityBadge(application.priority)}>
                          {application.priority} Priority
                        </span>
                      </div>
                    </div>
                    {application.status === 'approved' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Download size={18} />
                        Download
                      </motion.button>
                    )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Course</p>
                      <p className="font-medium text-gray-800">
                        {application.courseCode !== 'N/A' ? `${application.courseCode}: ${application.course}` : application.course}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Submitted Date</p>
                      <p className="font-medium text-gray-800">{application.submittedDate}</p>
                    </div>
                    {application.processedDate && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Processed Date</p>
                        <p className="font-medium text-gray-800">{application.processedDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-12 text-center"
          >
            <FileText className="w-20 h-20 mx-auto mb-4 text-gray-300" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No {activeTab !== 'all' ? activeTab : ''} Applications Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {activeTab === 'pending' 
                ? 'Create your first application and track its progress here.'
                : activeTab === 'processed'
                ? 'Processed applications will appear here once they are reviewed.'
                : 'Get started by creating your first application.'
              }
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              Create Application
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Create Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Create New Application</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="e.g., Course Add Request, Grade Appeal, Transcript Request"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Code
                      </label>
                      <input
                        type="text"
                        value={formData.courseCode}
                        onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                        placeholder="e.g., CSE401"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name
                      </label>
                      <input
                        type="text"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        placeholder="e.g., Artificial Intelligence"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
                    >
                      Submit Application
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Application;
