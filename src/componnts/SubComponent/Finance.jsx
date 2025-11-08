import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, DollarSign, Calendar, AlertCircle } from "lucide-react";

// Framer Motion variants
const container = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 }
  }
};

const gridStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const card = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 18, mass: 0.7 }
  }
};

const Finance = () => {
  const cards = [
    {
      icon: CheckCircle2,
      title: "Total Paid",
      description: "Track total income and growth",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: DollarSign,
      title: "Total Payable",
      description: "Analyze market performance",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Calendar,
      title: "Installments",
      description: "Plan expenses and savings",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: AlertCircle,
      title: "Pending",
      description: "Monitor and manage spending",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <motion.div
      className="w-full max-w-full h-auto mt-5 p-4 sm:p-5 rounded-xl border-3 border-gray-200 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">Finance</h1>
      </div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-5"
        variants={gridStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={i}
              variants={card}
              className="flex flex-col items-center justify-center rounded-xl p-6 shadow-md hover:shadow-2xl bg-white transition border-2 border-transparent hover:border-blue-400"
            >
              <motion.div
                className={`p-4 rounded-xl ${c.bgColor}`}
                whileHover={{ y: -4, rotate: -1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <Icon className={`w-8 h-8 ${c.color}`} />
              </motion.div>
              <h2 className="mt-3 text-lg font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-gray-600 text-center">{c.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Finance;
