import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import { useCourseContext } from "../../context/CourseContext";

const spring = { type: "spring", stiffness: 220, damping: 24, mass: 0.7 };

const pageVar = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
};

const cardVar = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring },
};

const rowVar = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring, delay: 0.02 * i },
  }),
};

const pillVar = {
  initial: { opacity: 0, y: 6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: spring },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.18 } },
};

const HeroDash = () => {
  const { selectedCourses, toggleCourseSelection, enrollInCourses } = useCourseContext();

  const mandatoryCourses = [
    { id: "CSE101", name: "Intro to Programming", credit: 3 },
    { id: "MAT101", name: "Calculus I", credit: 3 },
  ];

  const availableCourses = [
    { id: "CSE201", name: "Data Structures", credit: 3 },
    { id: "CSE202", name: "Algorithms", credit: 3 },
    { id: "CSE203", name: "Database Systems", credit: 3 },
    { id: "CSE204", name: "Operating Systems", credit: 3 },
    { id: "CSE205", name: "Computer Networks", credit: 3 },
    { id: "CSE206", name: "Artificial Intelligence", credit: 3 },
    { id: "CSE207", name: "Machine Learning", credit: 3 },
  ];

  const toggleCourse = (course) => {
    toggleCourseSelection(course);
  };

  const totalCredits = useMemo(
    () => selectedCourses.reduce((acc, c) => acc + c.credit, 0),
    [selectedCourses]
  );

  const handlePrintBill = () => {
    alert(
      `Bill Printed!\n\nSelected Courses:\n${selectedCourses
        .map((c) => `${c.id} - ${c.name}`)
        .join("\n")}\n\nTotal Credits: ${totalCredits}`
    );
  };

  const handleDone = () => {
    enrollInCourses();
    alert('Registration completed successfully!');
  };

  return (
    <motion.div
      className="w-full space-y-6"
      variants={pageVar}
      initial="hidden"
      animate="show"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-400 to-gray-900 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Course Registration</h1>
        </div>
        <p className="text-sm sm:text-base text-white/90 mt-2">
          Select your courses for the upcoming semester
        </p>
      </motion.div>

      {/* Registration Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-4 sm:space-y-5">
          {/* Mandatory */}
          <motion.div
            variants={cardVar}
            layout
            className="p-4 sm:p-5 rounded-2xl bg-white border-3 border-gray-200 shadow-sm"
          >
            <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">
              Suggested Courses
            </h2>
            <ul className="space-y-2">
              {mandatoryCourses.map((course, i) => (
                <motion.li
                  key={course.id}
                  custom={i}
                  variants={rowVar}
                  className="p-2 bg-blue-50 border border-blue-100 rounded-lg text-sm"
                >
                  <span className="font-medium">{course.id}</span> — {course.name}{" "}
                  <span className="text-gray-500">({course.credit} cr)</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Available */}
          <motion.div
            variants={cardVar}
            layout
            className="p-4 sm:p-5 rounded-2xl bg-white border-3 border-gray-200 shadow-sm"
          >
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-900">
              Available Courses
            </h2>

            <div className="max-h-64 overflow-y-auto overflow-x-auto rounded-xl ring-1 ring-gray-100">
              <table className="table-auto w-full border-collapse text-sm sm:text-base">
                <thead className="sticky top-0 bg-blue-100/70 text-gray-700 z-10 backdrop-blur">
                  <tr>
                    <th className="border px-2 sm:px-4 py-2 text-left">Select</th>
                    <th className="border px-2 sm:px-4 py-2 text-left">Course ID</th>
                    <th className="border px-2 sm:px-4 py-2 text-left">Course Name</th>
                    <th className="border px-2 sm:px-4 py-2 text-center">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {availableCourses.map((course, i) => {
                    const checked = selectedCourses.some((c) => c.id === course.id);
                    return (
                      <motion.tr
                        key={course.id}
                        custom={i}
                        variants={rowVar}
                        initial="hidden"
                        animate="show"
                        layout
                        className={`${
                          i % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } transition-colors`}
                      >
                        <td className="border px-2 sm:px-4 py-2 text-center">
                          <motion.input
                            type="checkbox"
                            className="w-4 h-4 accent-purple-600 cursor-pointer"
                            checked={checked}
                            onChange={() => toggleCourse(course)}
                            whileTap={{ scale: 0.92 }}
                          />
                        </td>
                        <td className="border px-2 sm:px-4 py-2">{course.id}</td>
                        <td className="border px-2 sm:px-4 py-2">{course.name}</td>
                        <td className="border px-2 sm:px-4 py-2 text-center">
                          {course.credit}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <motion.div
          variants={cardVar}
          layout
          className="w-full lg:w-1/3 p-4 sm:p-5 rounded-2xl border-3 border-gray-200 bg-white h-fit shadow-sm"
        >
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">
            Selected Courses
          </h2>

          <AnimatePresence initial={false} mode="popLayout">
            {selectedCourses.length > 0 ? (
              <ul className="space-y-2" key="list">
                {selectedCourses.map((course) => (
                  <motion.li
                    key={course.id}
                    variants={pillVar}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                    className="p-2 bg-green-50 rounded-lg border border-green-100 text-sm flex items-start justify-between gap-2"
                  >
                    <div>
                      <span className="font-medium">{course.id}</span> —{" "}
                      {course.name}{" "}
                      <span className="text-gray-500">({course.credit} cr)</span>
                    </div>
                    <motion.button
                      onClick={() => toggleCourse(course)}
                      className="px-2 py-1 rounded-md bg-white/60 ring-1 ring-green-200 text-xs"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Remove
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-400 italic"
              >
                No courses selected
              </motion.p>
            )}
          </AnimatePresence>

          {/* Total */}
          <motion.div
            layout
            className="mt-4 flex justify-between items-center p-3 bg-gray-100 rounded-lg"
          >
            <span className="font-semibold text-gray-700">Total Credits</span>
            <motion.span
              key={totalCredits}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
              className="font-bold text-xl text-green-600"
            >
              {totalCredits}
            </motion.span>
          </motion.div>

          <div className="flex gap-3 mt-4">
            <motion.button
              onClick={handlePrintBill}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-blue-400 to-indigo-700 text-white py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Print Bill
            </motion.button>
            <motion.button
              onClick={handleDone}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Done
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroDash;
