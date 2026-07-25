import React, { useState } from 'react';
import { motion } from 'motion/react';

export const CalendarView: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const events = [
    { date: 'Oct 28, 2025', title: 'COL331 Operating Systems Minor 2 Exam', venue: 'Bharti Building Hall 102', type: 'Exam', color: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300' },
    { date: 'Oct 30, 2025', title: 'COL106 Data Structures Lab 4 Submission', venue: 'Computer Centre Upload Portal', type: 'Assignment', color: 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-300' },
    { date: 'Nov 02, 2025', title: 'Tryst 2025 Annual Tech Fest Opening', venue: 'Dogra Hall & SAC Lawns', type: 'Event', color: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300' },
    { date: 'Nov 08, 2025', title: 'Diwali Festival Break - Campus Closed', venue: 'IIT Delhi Campus', type: 'Holiday', color: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300' },
    { date: 'Nov 15, 2025', title: 'T&P Summer Internship Placement Drive Phase 1', venue: 'T&P Cell, Main Building', type: 'Placement', color: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300' },
    { date: 'Nov 22, 2025', title: 'COL774 Machine Learning Project Presentation', venue: 'Department of CSE Seminar Room', type: 'Academic', color: 'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-950/50 dark:text-teal-300' },
    { date: 'Dec 01, 2025', title: 'Major Semester End Examinations Begin', venue: 'Lecture Hall Complex (LHC)', type: 'Exam', color: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300' },
  ];

  const filteredEvents = filter === 'All' ? events : events.filter(e => e.type === filter);

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#3525cd]/20 flex items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider text-amber-200">
            IIT Delhi Academic Calendar
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">2025–2026 Semester Schedule</h2>
          <p className="text-xs text-indigo-100 font-medium">Synced with Kerberos ERP & Central Academic Timetable</p>
        </div>
        <span className="material-symbols-outlined text-5xl text-indigo-200 hidden sm:block">calendar_month</span>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {['All', 'Exam', 'Assignment', 'Event', 'Placement', 'Holiday'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
              filter === type
                ? 'bg-[#3525cd] text-white shadow-md'
                : 'bg-white dark:bg-[#232330] text-[#777587] dark:text-gray-300 border border-[#c7c4d8]/40 dark:border-gray-800 hover:bg-[#f0ecf9]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Calendar Items List */}
      <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm text-[#1b1b24] dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#3525cd]">event</span>
          <span>Key Dates & Academic Deadlines</span>
        </h3>

        <div className="space-y-3">
          {filteredEvents.map((e, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              className="p-4 rounded-2xl bg-[#f5f2ff]/60 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="px-3.5 py-2 rounded-xl bg-[#3525cd] text-white font-black text-xs shrink-0 text-center shadow-sm">
                  {e.date.split(',')[0]}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#1b1b24] dark:text-white">{e.title}</h4>
                  <p className="text-[11px] text-[#777587] dark:text-gray-400 font-medium">{e.venue}</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold border shrink-0 ${e.color}`}>
                {e.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
