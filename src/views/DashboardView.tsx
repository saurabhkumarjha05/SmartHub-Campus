import React, { useState, useEffect } from 'react';
import { NavigationTab, Task, UserProfile, CourseGrade } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';

interface DashboardViewProps {
  user: UserProfile;
  tasks: Task[];
  grades: CourseGrade[];
  onSelectTab: (tab: NavigationTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  tasks,
  grades,
  onSelectTab,
}) => {
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const activeTasks = tasks.filter((t) => t.status !== 'completed');
  const urgentTasks = activeTasks.slice(0, 3);

  const gradeChartData = grades.map((g) => ({
    course: g.code,
    score: g.score,
  }));

  const chartColors = ['#3525cd', '#4648d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Welcome Hero Banner with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#3525cd]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-amber-200">
              IIT Delhi Academic Session
            </span>
            <span className="text-xs text-indigo-200 font-semibold">{user.major} • {user.year}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {greeting}, {user.preferredName}! 🎓
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-lg leading-relaxed font-medium">
            You have {activeTasks.length} pending assignments and COL331 Operating Systems Lecture scheduled today at 11:00 AM in Bharti Building.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectTab('ai-tutor')}
            className="px-4 py-2.5 rounded-2xl bg-white text-[#3525cd] hover:bg-indigo-50 font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>Launch AI Tutor</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectTab('assignments')}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 transition-all cursor-pointer"
          >
            View Pipeline
          </motion.button>
        </div>
      </motion.div>

      {/* Metric Bento Cards with Hover Lift */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Assignments */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectTab('assignments')}
          className="bg-white dark:bg-[#232330] p-5 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-[#3525cd] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">assignment</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
              {activeTasks.length} Pending
            </span>
          </div>
          <p className="text-xs text-[#777587] dark:text-gray-400 font-bold">Assignment Pipeline</p>
          <h3 className="text-2xl font-black text-[#1b1b24] dark:text-white mt-1">
            {activeTasks.length} <span className="text-xs font-semibold text-[#777587] dark:text-gray-400">Tasks Due</span>
          </h3>
        </motion.div>

        {/* Cumulative GPA (IIT Delhi CGPA scale) */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectTab('grades')}
          className="bg-white dark:bg-[#232330] p-5 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">grade</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Top 3% CSE
            </span>
          </div>
          <p className="text-xs text-[#777587] dark:text-gray-400 font-bold">Cumulative CGPA</p>
          <h3 className="text-2xl font-black text-[#1b1b24] dark:text-white mt-1">
            {user.gpa} <span className="text-xs font-semibold text-[#777587] dark:text-gray-400">/ 10.00</span>
          </h3>
        </motion.div>

        {/* Class Attendance */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectTab('attendance')}
          className="bg-white dark:bg-[#232330] p-5 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">event_available</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              Compliant
            </span>
          </div>
          <p className="text-xs text-[#777587] dark:text-gray-400 font-bold">Class Attendance</p>
          <h3 className="text-2xl font-black text-[#1b1b24] dark:text-white mt-1">
            94.8% <span className="text-xs font-semibold text-[#777587] dark:text-gray-400">Overall</span>
          </h3>
        </motion.div>

        {/* Mess & Canteen Card Balance in ₹ */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectTab('canteen')}
          className="bg-white dark:bg-[#232330] p-5 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">restaurant</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Kerberos Pay
            </span>
          </div>
          <p className="text-xs text-[#777587] dark:text-gray-400 font-bold">Canteen Wallet</p>
          <h3 className="text-2xl font-black text-[#1b1b24] dark:text-white mt-1">
            ₹450.00 <span className="text-xs font-semibold text-[#777587] dark:text-gray-400">Balance</span>
          </h3>
        </motion.div>
      </div>

      {/* Main Grid: Today Schedule & Urgent Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Today's Schedule Timeline (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">schedule</span>
              <span>Today&apos;s IIT Delhi Lecture Schedule</span>
            </h3>
            <button
              onClick={() => onSelectTab('calendar')}
              className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer"
            >
              Full Academic Calendar
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                time: '11:00 AM - 12:30 PM',
                title: 'COL331 Operating Systems',
                room: 'Bharti Building • Room 301',
                type: 'Lecture',
                color: 'border-l-4 border-[#3525cd] bg-indigo-50/50 dark:bg-indigo-950/40'
              },
              {
                time: '02:00 PM - 04:00 PM',
                title: 'COL106 Data Structures Lab',
                room: 'Computer Centre Lab 2 (LH-121)',
                type: 'Practical Lab',
                color: 'border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40'
              },
              {
                time: '04:30 PM - 06:00 PM',
                title: 'Tryst 2025 Hackathon Brainstorming',
                room: 'Student Activity Centre (SAC) Pod 3',
                type: 'Group Activity',
                color: 'border-l-4 border-amber-500 bg-amber-50/50 dark:bg-amber-950/40'
              }
            ].map((slot, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 3 }}
                className={`p-4 rounded-2xl ${slot.color} space-y-1 transition-all`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#3525cd] dark:text-indigo-300">{slot.time}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 text-[10px] font-bold border border-gray-200 dark:border-gray-700">
                    {slot.type}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-[#1b1b24] dark:text-white">{slot.title}</h4>
                <p className="text-xs text-[#777587] dark:text-gray-400 font-medium">{slot.room}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Urgent Deadlines Widget (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-500">alarm</span>
              <span>Urgent Submissions</span>
            </h3>
            <button
              onClick={() => onSelectTab('assignments')}
              className="text-xs font-bold text-[#3525cd] hover:underline cursor-pointer"
            >
              All Tasks
            </button>
          </div>

          <div className="space-y-3">
            {urgentTasks.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ x: 3 }}
                className="p-3.5 rounded-2xl bg-[#f5f2ff]/60 dark:bg-gray-800/50 border border-[#c7c4d8]/30 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${t.courseColor}`}>
                    {t.courseCode}
                  </span>
                  <span className="text-[10px] font-bold text-rose-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    {t.dueDate}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs text-[#1b1b24] dark:text-white">{t.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade Performance Chart Section */}
      <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3525cd]">bar_chart</span>
            <span>Course Academic Score Distribution</span>
          </h3>
          <span className="text-xs font-bold text-[#3525cd]">Semester 5 Performance</span>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeChartData}>
              <XAxis dataKey="course" stroke="#777587" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#777587" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1b1b24', color: '#fff', borderRadius: '12px' }}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {gradeChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
