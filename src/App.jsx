import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import MainDash from './componnts/MainDash';
import MainReg from './Registration/MainReg';
import MainCourse from './Courses/MainCourse';
import MainAssingment from './assingment/MainAssingment';
import MainResult from './result/MainResult';
import MainApplication from './application/MainApplication';
import MainFinance from './finance/MainFinance';
import AuthPage from './components/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CourseProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<AuthPage initialTab="login" />} />
            <Route path="/register" element={<AuthPage initialTab="signup" />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<MainDash />} />
              <Route path="courses" element={<MainCourse />} />
              <Route path="registration" element={<MainReg />} />
              <Route path="assignment" element={<MainAssingment />} />
              <Route path="result" element={<MainResult />} />
              <Route path="application" element={<MainApplication />} />
              <Route path="finance" element={<MainFinance />} />
            </Route>
          </Routes>
        </CourseProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;