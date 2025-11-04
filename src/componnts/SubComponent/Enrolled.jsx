import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCourseContext } from "../../context/CourseContext";

// motion variants
const sectionVar = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 16 } }
};

const gridVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
};

const cardVar = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 18, mass: 0.6 }
  }
};

// Course icon mapping
const courseIconMap = {
  "CSE201": "/public/3d Icon/fundemental.png",
  "CSE202": "/public/3d Icon/algo.png",
  "CSE203": "/public/3d Icon/database.png",
  "CSE204": "/public/3d Icon/web-dev.png",
  "CSE205": "/public/3d Icon/web-dev.png",
  "CSE206": "/public/3d Icon/fundemental.png",
  "CSE207": "/public/3d Icon/fundemental.png",
};

const Enrolled = () => {
  const navigate = useNavigate();
  const { enrolledCourses } = useCourseContext();

  const courses = useMemo(() => {
    return enrolledCourses.map(course => ({
      title: course.name,
      description: `Course ID: ${course.id} - ${course.credit} credits`,
      icon: courseIconMap[course.id] || "/public/3d Icon/algo.png"
    }));
  }, [enrolledCourses]);

  const handleSeeAll = () => {
    navigate('/courses');
  };

  return (
    <motion.div
      className="w-full max-w-full h-auto mt-5 p-4 sm:p-5 rounded-xl border-3 border-gray-200"
      variants={sectionVar}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl sm:text-2xl font-semibold">Enrolled Courses</h1>
        <p 
          onClick={handleSeeAll}
          className="text-sm sm:text-base font-medium cursor-pointer hover:underline hover:text-blue-600 transition-colors"
        >
          See All
        </p>
      </div>

      {/* Cards */}
      {courses.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={gridVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courses.map((c, i) => (
            <motion.div
              key={i}
              variants={cardVar}
              whileHover={{ y: -4 }}
              className="w-full h-auto min-h-[150px] rounded-2xl p-3 flex flex-col justify-between
                         shadow-md hover:shadow-2xl
                         border border-transparent hover:border-blue-300 hover:ring-2 hover:ring-blue-300
                         transition duration-200 ease-in-out bg-white"
            >
              {/* Title + Image icon (right) */}
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-purple-900 line-clamp-2">{c.title}</h3>
                <img
                  src={c.icon}
                  alt={`${c.title} icon`}
                  className="w-15 h-15 shrink-0 object-contain rounded-md"
                  onError={(e) => { e.currentTarget.style.display = "none"; }} // ✅ fixed for JSX
                />
              </div>

              <p className="text-sm line-clamp-2">{c.description}</p>

              <motion.button
                whileTap={{ scale: 0.97 }}
                className="mt-2 self-start px-5 py-1.5 text-sm font-medium text-white rounded-full bg-blue-600 shadow-md"
              >
                View
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-8 text-center"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Courses Enrolled Yet
          </h3>
          <p className="text-gray-500 mb-4">
            Go to the Registration page to select and enroll in courses.
          </p>
          <motion.button
            onClick={() => navigate('/registration')}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Register Now
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Enrolled;
