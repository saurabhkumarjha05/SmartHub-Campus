import React, { useState } from 'react';
import { motion } from 'motion/react';

export const AttendanceView: React.FC = () => {
  const [checkedIn, setCheckedIn] = useState(false);

  const courses = [
    { code: 'COL331', name: 'Operating Systems & System Programming', attended: 26, total: 28, rate: 92.8, status: 'Compliant' },
    { code: 'COL106', name: 'Data Structures & Algorithms', attended: 31, total: 32, rate: 96.8, status: 'Compliant' },
    { code: 'COL334', name: 'Computer Networks', attended: 23, total: 25, rate: 92.0, status: 'Compliant' },
    { code: 'COL362', name: 'Database Management Systems', attended: 27, total: 28, rate: 96.4, status: 'Compliant' },
    { code: 'COL774', name: 'Machine Learning & Neural Nets', attended: 22, total: 23, rate: 95.6, status: 'Compliant' },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#3525cd]/20 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider text-amber-200">
            IIT Delhi Kerberos Attendance Registry
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            94.8% Overall Attendance Record
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 font-medium">
            Safely compliant above the 75% mandatory IIT Delhi Senate rule across all 5 courses.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setCheckedIn(true);
            alert('Checked in successfully for COL331 Lecture at Bharti Building via Kerberos Geofence!');
          }}
          className={`px-5 py-3 rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer ${
            checkedIn
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-[#3525cd] hover:bg-indigo-50'
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {checkedIn ? 'check_circle' : 'qr_code_scanner'}
          </span>
          <span>{checkedIn ? 'Checked In Today' : 'Scan LH Geofence QR / Check-In'}</span>
        </motion.button>
      </motion.div>

      {/* Course Attendance List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <motion.div
            key={c.code}
            whileHover={{ y: -3 }}
            className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-[#3525cd] font-black text-xs border border-indigo-200">
                  {c.code}
                </span>
                <h3 className="font-extrabold text-sm text-[#1b1b24] dark:text-white mt-1.5">{c.name}</h3>
              </div>
              <span className="text-2xl font-black text-[#3525cd] dark:text-indigo-400">{c.rate}%</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#777587] dark:text-gray-400 font-semibold">
                <span>Attended: {c.attended} / {c.total} Lectures</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{c.status} ✓</span>
              </div>
              <div className="w-full h-2.5 bg-[#f0ecf9] dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3525cd] to-[#10b981] rounded-full"
                  style={{ width: `${c.rate}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
