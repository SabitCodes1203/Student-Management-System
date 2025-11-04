import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

const AuthPage = ({ initialTab = 'signup' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    gender: '',
    dateOfBirth: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(loginData.email, loginData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registerData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const { password, confirmPassword, ...data } = registerData;
      const cleanedData = {
        fullName: data.fullName,
        email: data.email,
        password: password,
        ...(data.mobileNumber?.trim() && { mobileNumber: data.mobileNumber.trim() }),
        ...(data.gender?.trim() && { gender: data.gender }),
        ...(data.dateOfBirth && { dateOfBirth: data.dateOfBirth }),
      };

      await register(cleanedData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        setActiveTab('login');
        setSuccess('');
      }, 2000);
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      if (err.response?.data) {
        const data = err.response.data;
        if (Array.isArray(data.message)) {
          errorMessage = data.message.join(', ');
        } else if (data.message) {
          errorMessage = data.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Yellow Shapes */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>

      {/* Main Content Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 w-full max-w-6xl"
        >
          <div className="grid lg:grid-cols-2 min-h-[700px]">
            {/* Left Section - Illustration Area */}
            <div className="bg-gradient-to-br from-orange-50 to-blue-50 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden hidden lg:flex min-h-[700px]">
              {/* 3D Educational Illustration */}
              <div className="flex-1 flex items-center justify-center h-full">
                <motion.img
                  src="/auth img.png"
                  alt="Educational Learning Scene"
                  className="w-full h-full object-contain max-w-xl fixed-size"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{ width: '90%', maxWidth: '36rem', height: '90%', objectFit: 'contain' }}
                />
              </div>

              {/* Tagline */}
              <div className="text-center mt-8">
                <p className="text-xl font-semibold text-gray-800">Igniting the innovative self</p>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="p-8 lg:p-12 flex flex-col items-center justify-center min-h-[700px]">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 w-full max-w-md">
                <button
                  onClick={() => {
                    setActiveTab('signup');
                    setError('');
                    setSuccess('');
                  }}
                  className={`flex-1 px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'signup'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Signup
                </button>
                <button
                  onClick={() => {
                    setActiveTab('login');
                    setError('');
                    setSuccess('');
                  }}
                  className={`flex-1 px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'login'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Login
                </button>
              </div>

              {/* Error/Success Messages */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 w-full max-w-md"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 w-full max-w-md"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-600">{success}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forms */}
              <AnimatePresence mode="wait">
                {activeTab === 'signup' ? (
                  <motion.form
                    key="signup"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    onSubmit={handleRegister}
                    className="space-y-4 flex-1 w-full max-w-md"
                  >
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="fullName"
                          value={registerData.fullName}
                          onChange={handleRegisterChange}
                          placeholder="Full Name"
                          required
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          placeholder="E-mail"
                          required
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          placeholder="Password"
                          required
                          minLength={8}
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          placeholder="Confirm Password"
                          required
                          minLength={8}
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={registerData.mobileNumber}
                          onChange={handleRegisterChange}
                          placeholder="Mobile Number (Optional)"
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <select
                          name="gender"
                          value={registerData.gender}
                          onChange={handleRegisterChange}
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors bg-transparent"
                        >
                          <option value="">Gender (Optional)</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={registerData.dateOfBirth}
                          onChange={handleRegisterChange}
                          placeholder="Date of Birth (Optional)"
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-6">
                      By registering up, you agree with our{' '}
                      <Link to="#" className="text-blue-600 hover:underline">Terms & Conditions</Link>
                    </p>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        <>
                          Let's Start <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    onSubmit={handleLogin}
                    className="space-y-4 flex-1 w-full max-w-md"
                  >
                    <div className="space-y-4 mt-20">
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          placeholder="E-mail"
                          required
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          placeholder="Password"
                          required
                          minLength={8}
                          className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-20"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Let's Start <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;

