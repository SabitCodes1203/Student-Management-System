import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, Clock, Award } from 'lucide-react';
import { useCourseContext } from '../../context/CourseContext';

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

// Course data and mapping (moved outside component to avoid dependency issues)
const allCoursesData = [
    {
      id: 1,
      courseCode: "CSE101",
      courseName: "Introduction to Programming",
      faculty: "Dr. Sarah Johnson",
      credits: 3,
      schedule: "Mon, Wed 10:00 AM",
      semester: "Spring 2025"
    },
    {
      id: 2,
      courseCode: "CSE201",
      courseName: "Data Structures & Algorithms",
      faculty: "Prof. Michael Chen",
      credits: 4,
      schedule: "Tue, Thu 2:00 PM",
      semester: "Spring 2025"
    },
    {
      id: 3,
      courseCode: "CSE301",
      courseName: "Database Management Systems",
      faculty: "Dr. Emily Rodriguez",
      credits: 3,
      schedule: "Mon, Wed 1:00 PM",
      semester: "Spring 2025"
    },
    {
      id: 4,
      courseCode: "CSE202",
      courseName: "Object-Oriented Programming",
      faculty: "Prof. David Kim",
      credits: 3,
      schedule: "Tue, Thu 10:00 AM",
      semester: "Spring 2025"
    },
    {
      id: 5,
      courseCode: "CSE302",
      courseName: "Web Development",
      faculty: "Dr. Lisa Anderson",
      credits: 3,
      schedule: "Fri 9:00 AM",
      semester: "Spring 2025"
    },
    {
      id: 6,
      courseCode: "CSE401",
      courseName: "Artificial Intelligence",
      faculty: "Prof. James Wilson",
      credits: 4,
      schedule: "Mon, Wed 3:00 PM",
      semester: "Spring 2025"
    },
    {
      id: 7,
      courseCode: "CSE303",
      courseName: "Computer Networks",
      faculty: "Dr. Maria Garcia",
      credits: 3,
      schedule: "Tue, Thu 11:00 AM",
      semester: "Spring 2025"
    },
    {
      id: 8,
      courseCode: "CSE402",
      courseName: "Machine Learning",
      faculty: "Prof. Robert Brown",
      credits: 4,
      schedule: "Mon, Wed 4:00 PM",
      semester: "Spring 2025"
    }
];

// Map course codes from registration to course data
const courseCodeMap = {
  "CSE201": "CSE201", // Data Structures
  "CSE202": "CSE202", // Algorithms
  "CSE203": "CSE301", // Database Systems
  "CSE204": "CSE303", // Computer Networks
  "CSE205": "CSE303", // Computer Networks (alternate)
  "CSE206": "CSE401", // Artificial Intelligence
  "CSE207": "CSE402", // Machine Learning
};

const Courses = () => {
  const { enrolledCourses } = useCourseContext();

  // Filter courses based on enrolled courses
  const coursesData = useMemo(() => {
    if (enrolledCourses.length === 0) {
      return [];
    }
    
    const enrolledCourseCodes = enrolledCourses.map(c => c.id);
    return allCoursesData.filter(course => {
      // Check if the enrolled course ID matches this course's code or any mapped code
      return enrolledCourseCodes.some(enrolledId => {
        // Direct match
        if (enrolledId === course.courseCode) return true;
        // Reverse lookup in map
        return Object.values(courseCodeMap).includes(course.courseCode) && 
               Object.keys(courseCodeMap).find(key => courseCodeMap[key] === course.courseCode) === enrolledId;
      });
    });
  }, [enrolledCourses]);

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-400 to-gray-900 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">All Courses</h1>
        </div>
        <p className="text-sm sm:text-base text-white/90 mt-2">
          {enrolledCourses.length > 0 
            ? `Viewing ${coursesData.length} enrolled courses` 
            : "Browse all available courses and their instructors"}
        </p>
      </motion.div>

      {/* Courses Grid */}
      {coursesData.length > 0 ? (
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {coursesData.map((course) => (
          <motion.div
            key={course.id}
            variants={cardVar}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-3 border-gray-200"
          >
            {/* Course Header */}
            <div className="bg-white p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                    {course.courseCode}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">{course.semester}</p>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Award size={14} />
                    {course.credits} cr
                  </span>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="p-4 sm:p-5 space-y-3">
              {/* Course Name */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
                  {course.courseName}
                </h4>
              </div>

              {/* Faculty Info */}
              <div className="flex items-center gap-2 text-gray-600">
                <User size={18} className="text-cyan-500 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">{course.faculty}</span>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm">{course.schedule}</span>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-3 py-2 sm:py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center border-3 border-gray-200 "
        >
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Courses Enrolled Yet
          </h3>
          <p className="text-gray-500 mb-4">
            Go to the Registration page to select courses first.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Courses;