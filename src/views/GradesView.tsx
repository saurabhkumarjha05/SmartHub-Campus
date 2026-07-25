import React, { useState } from 'react';
import { CourseGrade } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';

interface GradesViewProps {
  grades: CourseGrade[];
}

export const GradesView: React.FC<GradesViewProps> = ({ grades }) => {
  const [simulatedScore, setSimulatedScore] = useState(95);

  const chartData = grades.map((g) => ({
    name: g.code,
    score: g.score,
  }));

  const estimatedCgpa = ((9.42 * 118 + (simulatedScore >= 90 ? 10.0 : 8.5) * 20) / 138).toFixed(2);

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#3525cd]/20 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider text-amber-200">
            IIT Delhi Academic Transcript
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            Cumulative CGPA: 9.42 / 10.00
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 font-medium">
            Dean&apos;s Honor List • Top 3% Rank in Computer Science & Engineering
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <p className="text-xs text-indigo-100 font-semibold">Degree Credits Completed</p>
          <p className="text-2xl font-black text-amber-300">118 / 145</p>
        </div>
      </motion.div>

      {/* Grade Chart */}
      <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#3525cd]">analytics</span>
          <span>Semester 5 Course Score Performance</span>
        </h3>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#777587" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#777587" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1b1b24', color: '#fff', borderRadius: '12px' }} />
              <Bar dataKey="score" fill="#3525cd" radius={[8, 8, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? '#3525cd' : '#4648d4'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Target CGPA Simulator */}
      <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500">tune</span>
            <span>IIT Delhi Target CGPA Simulator</span>
          </h3>
          <span className="text-xs font-extrabold text-[#3525cd] dark:text-indigo-300">Projected CGPA: {estimatedCgpa}</span>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#777587] dark:text-gray-300">
            Projected Major Exam Score Average: {simulatedScore}%
          </label>
          <input
            type="range"
            min="70"
            max="100"
            value={simulatedScore}
            onChange={(e) => setSimulatedScore(Number(e.target.value))}
            className="w-full accent-[#3525cd] cursor-pointer"
          />
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-[#232330] rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f0ecf9] dark:bg-gray-800 text-[#464555] dark:text-gray-300 font-extrabold uppercase tracking-wider">
            <tr>
              <th className="p-4">Course Code & Name</th>
              <th className="p-4">Instructor</th>
              <th className="p-4">Credits</th>
              <th className="p-4">Marks</th>
              <th className="p-4 text-right">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
            {grades.map((g, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="p-4 font-bold text-[#1b1b24] dark:text-white">
                  {g.code} - {g.name}
                </td>
                <td className="p-4 text-[#777587] dark:text-gray-400">{g.instructor}</td>
                <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">{g.credits}</td>
                <td className="p-4 font-extrabold text-[#3525cd] dark:text-indigo-400">{g.score}/100</td>
                <td className="p-4 text-right font-black text-sm text-emerald-600 dark:text-emerald-400">
                  {g.grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
