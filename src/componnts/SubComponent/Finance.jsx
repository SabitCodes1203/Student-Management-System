import React from "react";
import { motion } from "framer-motion";

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
      iconSrc: "/3d%20Icon/ChatGPT%20Image%20Sep%203,%202025,%2004_07_46%20PM.png",
      title: "Total Paid",
      description: "Track total income and growth",
    },
    {
      iconSrc: "/3d%20Icon/ChatGPT%20Image%20Sep%203,%202025,%2004_09_25%20PM.png",
      title: "Total Payable",
      description: "Analyze market performance",
    },
    {
      iconSrc: "/3d%20Icon/ChatGPT%20Image%20Sep%203,%202025,%2004_28_20%20PM.png",
      title: "Installments",
      description: "Plan expenses and savings",
    },
    {
      iconSrc: "/3d%20Icon/ChatGPT%20Image%20Sep%203,%202025,%2004_37_12%20PM.png",
      title: "Pending",
      description: "Monitor and manage spending",
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
        {cards.map((c, i) => (
          <motion.div
            key={i}
            variants={card}
            className="flex flex-col items-center justify-center rounded-xl p-6 shadow-md hover:shadow-2xl bg-white transition border-2 border-transparent hover:border-blue-400"
          >
            <motion.img
              src={c.iconSrc}
              alt={c.title}
              className="w-20 h-20"
              whileHover={{ y: -4, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            />
            <h2 className="mt-3 text-lg font-semibold">{c.title}</h2>
            <p className="mt-2 text-sm text-gray-600 text-center">{c.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Finance;
