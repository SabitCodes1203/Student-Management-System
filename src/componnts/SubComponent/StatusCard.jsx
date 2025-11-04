import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const StatusCard = () => {
  // Example data
  const cgpaData = [
    { name: "Achieved", value: 2.88 },
    { name: "Remaining", value: 4 - 2.88 },
  ];
  const creditData = [
    { name: "Completed", value: 90 },
    { name: "Remaining", value: 30 },
  ];
  const hourData = [
    { name: "Completed Hours", value: 110 },
    { name: "Pending Hours", value: 10 },
  ];
  const scholarshipData = [
    { name: "Received", value: 70 },
    { name: "Remaining", value: 30 },
  ];

  // Ice blue palette ❄️
  const ICE_COLORS = ["#60A5FA", "#E0F2FE"]; 

  return (
    <div className="w-full max-w-full h-auto mt-5 p-4 sm:p-5 rounded-xl border-3 border-gray-200">
      <h1 className="text-xl sm:text-2xl font-semibold mb-5">Student Status</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* CGPA */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">CGPA</h2>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={cgpaData}
                dataKey="value"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={3}
                startAngle={90}
                endAngle={450}
              >
                {cgpaData.map((_, i) => (
                  <Cell key={i} fill={ICE_COLORS[i % ICE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xl font-bold text-black">2.88 / 4.00</p>
        </div>

        {/* Credit Count */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Credit Count</h2>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={creditData}
                dataKey="value"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={5}
              >
                {creditData.map((_, i) => (
                  <Cell key={i} fill={ICE_COLORS[i % ICE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xl font-bold text-black">90 / 120</p>
        </div>

        {/* Completed Credit Hour */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Completed Credit
          </h2>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={hourData}
                dataKey="value"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={5}
              >
                {hourData.map((_, i) => (
                  <Cell key={i} fill={ICE_COLORS[i % ICE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xl font-bold text-black">110 hrs</p>
        </div>

        {/* Scholarship */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Scholarship</h2>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={scholarshipData}
                dataKey="value"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={5}
              >
                {scholarshipData.map((_, i) => (
                  <Cell key={i} fill={ICE_COLORS[i % ICE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xl font-bold text-black">70%</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
