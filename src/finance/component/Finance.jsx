import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, CreditCard, Calendar, AlertCircle, CheckCircle2, Clock, Receipt, Download, X } from 'lucide-react';

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

const Finance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Mock financial data - replace with actual API calls
  const financeData = {
    totalPaid: 12500,
    totalPayable: 15000,
    installments: 4500,
    pending: 2500,
    paidPercentage: (12500 / 15000) * 100,
    remainingPercentage: (2500 / 15000) * 100
  };

  const paymentMethodOptions = ['Credit Card', 'Bank Transfer', 'Debit Card'];

  // Mock transaction history
  const [transactions, setTransactions] = useState(() => [
    {
      id: 1,
      type: 'payment',
      amount: 2500,
      date: '2025-01-15',
      description: 'Tuition Fee - Spring 2025',
      status: 'completed',
      method: 'Credit Card',
      studentId: 'STU-1001'
    },
    {
      id: 2,
      type: 'payment',
      amount: 3000,
      date: '2024-12-10',
      description: 'Tuition Fee - Fall 2024',
      status: 'completed',
      method: 'Bank Transfer',
      studentId: 'STU-1001'
    },
    {
      id: 3,
      type: 'installment',
      amount: 1500,
      date: '2025-02-01',
      description: 'Installment Payment Due',
      status: 'pending',
      method: 'Pending',
      studentId: 'STU-1001'
    },
    {
      id: 4,
      type: 'payment',
      amount: 2000,
      date: '2024-11-05',
      description: 'Tuition Fee - Fall 2024',
      status: 'completed',
      method: 'Credit Card',
      studentId: 'STU-1002'
    },
    {
      id: 5,
      type: 'installment',
      amount: 1500,
      date: '2025-03-01',
      description: 'Installment Payment Due',
      status: 'upcoming',
      method: 'Scheduled',
      studentId: 'STU-1001'
    }
  ]);

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    id: null,
    studentId: '',
    amount: '',
    method: paymentMethodOptions[0]
  });

  const openPaymentModal = (transaction) => {
    setPaymentForm({
      id: transaction.id,
      studentId: transaction.studentId || '',
      amount: transaction.amount ? transaction.amount.toString() : '',
      method:
        transaction.method && transaction.method !== 'Pending' && transaction.method !== 'Scheduled'
          ? transaction.method
          : paymentMethodOptions[0]
    });
    setPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
    setPaymentForm({
      id: null,
      studentId: '',
      amount: '',
      method: paymentMethodOptions[0]
    });
  };

  const handlePaymentInputChange = (field, value) => {
    setPaymentForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    if (!paymentForm.id) return;

    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === paymentForm.id
          ? {
              ...transaction,
              status: 'completed',
              method: paymentForm.method,
              studentId: paymentForm.studentId,
              amount: Number(paymentForm.amount) || transaction.amount,
              date: new Date().toISOString().split('T')[0],
              type: 'payment'
            }
          : transaction
      )
    );
    closePaymentModal();
  };

  // Summary cards data
  const summaryCards = [
    {
      title: 'Total Paid',
      amount: `$${financeData.totalPaid.toLocaleString()}`,
      description: 'Total amount paid',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      trend: '+12%'
    },
    {
      title: 'Total Payable',
      amount: `$${financeData.totalPayable.toLocaleString()}`,
      description: 'Total amount due',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      trend: null
    },
    {
      title: 'Installments',
      amount: `$${financeData.installments.toLocaleString()}`,
      description: 'Remaining installments',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      trend: '3 left'
    },
    {
      title: 'Pending',
      amount: `$${financeData.pending.toLocaleString()}`,
      description: 'Amount pending',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      trend: 'Due soon'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2, label: 'Completed' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'Pending' },
      upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Calendar, label: 'Upcoming' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-400 to-gray-900 shadow-lg"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Finance Dashboard</h1>
            </div>
            <p className="text-sm sm:text-base text-white/90">
              Track your payments, installments, and financial history
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-all backdrop-blur-sm">
              <Download size={16} className="inline mr-2" />
              Export
            </button>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVar}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              variants={cardVar}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 ${card.borderColor}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                {card.trend && (
                  <span className="text-xs font-medium text-gray-500">{card.trend}</span>
                )}
              </div>
              <h3 className="text-sm sm:text-base text-gray-600 mb-1">{card.title}</h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{card.amount}</p>
              <p className="text-xs sm:text-sm text-gray-500">{card.description}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border-2 border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Payment Progress</h2>
            <span className="text-sm text-gray-600">
              {Math.round(financeData.paidPercentage)}% Complete
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Paid</span>
                <span className="font-semibold text-green-600">
                  ${financeData.totalPaid.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${financeData.paidPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Remaining</span>
                <span className="font-semibold text-orange-600">
                  ${financeData.pending.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${financeData.remainingPercentage}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border-2 border-gray-200"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Transaction History</h2>
            <div className="flex gap-2">
              {['all', 'completed', 'pending'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {transactions
              .filter(t => selectedPeriod === 'all' || t.status === selectedPeriod)
              .map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-gray-50"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${
                      transaction.status === 'completed' ? 'bg-green-100' :
                      transaction.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      {transaction.status === 'completed' ? (
                        <Receipt className="w-5 h-5 text-green-600" />
                      ) : (
                        <Calendar className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{transaction.description}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(transaction.date)}
                        </span>
                        {transaction.method && (
                          <span className="flex items-center gap-1">
                            <CreditCard size={14} />
                            {transaction.method}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        transaction.status === 'completed' ? 'text-green-600' : 'text-gray-800'
                      }`}>
                        ${transaction.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {getStatusBadge(transaction.status)}
                      {transaction.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => openPaymentModal(transaction)}
                          className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {transactions.filter(t => selectedPeriod === 'all' || t.status === selectedPeriod).length === 0 && (
            <div className="text-center py-12">
              <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Transactions Found</h3>
              <p className="text-gray-500">No transactions match your selected filter.</p>
            </div>
          )}
        </motion.div>
      </div>
      <AnimatePresence>
        {isPaymentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Complete Payment</h3>
                  <p className="text-sm text-gray-500">
                    Provide the details below to mark this installment as paid.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closePaymentModal}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close payment form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={paymentForm.studentId}
                    onChange={(event) => handlePaymentInputChange('studentId', event.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter student ID"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Payment Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={paymentForm.amount}
                    onChange={(event) => handlePaymentInputChange('amount', event.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    value={paymentForm.method}
                    onChange={(event) => handlePaymentInputChange('method', event.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    {paymentMethodOptions.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closePaymentModal}
                    className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Payment
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Finance;
