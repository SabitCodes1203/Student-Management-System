import React, { createContext, useContext, useState } from 'react';

const CourseContext = createContext();

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within CourseProvider');
  }
  return context;
};

export const CourseProvider = ({ children }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const toggleCourseSelection = (course) => {
    setSelectedCourses((prev) =>
      prev.some((c) => c.id === course.id)
        ? prev.filter((c) => c.id !== course.id)
        : [...prev, course]
    );
  };

  const enrollInCourses = () => {
    setEnrolledCourses([...selectedCourses]);
    setSelectedCourses([]);
  };

  const clearEnrolledCourses = () => {
    setEnrolledCourses([]);
  };

  const value = {
    selectedCourses,
    enrolledCourses,
    toggleCourseSelection,
    enrollInCourses,
    clearEnrolledCourses,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};

