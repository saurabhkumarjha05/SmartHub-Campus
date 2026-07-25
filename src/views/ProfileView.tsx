import React, { useState } from 'react';
import { UserProfile, CourseGrade, SemesterHistory } from '../types';
import { motion } from 'motion/react';
import { useToast } from '../components/ToastContext';

interface ProfileViewProps {
  user: UserProfile;
  grades: CourseGrade[];
  semesterHistory: SemesterHistory[];
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  grades,
  semesterHistory,
  onUpdateUser,
}) => {
  const { showToast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editMajor, setEditMajor] = useState(user.major);
  const [editLocation, setEditLocation] = useState(user.location);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: editName,
      email: editEmail,
      major: editMajor,
      location: editLocation,
    });
    setIsEditModalOpen(false);
  };

  const progressPercent = Math.round((user.creditsEarned / user.totalCreditsRequired) * 100);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Banner & Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Profile Card Column (4 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-4 bg-white dark:bg-[#232330] p-6 sm:p-8 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-6"
        >
          {/* Avatar & Main Info */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 rounded-2xl object-cover ring-4 ring-[#3525cd]/20 shadow-lg"
              />
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-[#3525cd] text-white hover:bg-[#4648d4] shadow-md transition-transform hover:scale-110 cursor-pointer"
                title="Change Photo"
              >
                <span className="material-symbols-outlined text-base">photo_camera</span>
              </button>
            </div>

            <h2 className="text-xl font-black text-[#1b1b24] dark:text-white">
              {user.name}
            </h2>
            <p className="text-xs font-bold text-[#777587] dark:text-gray-400 mt-0.5">
              Entry No: {user.studentId}
            </p>

            <span className="mt-2.5 px-3 py-1 rounded-full bg-[#3525cd]/10 text-[#3525cd] dark:bg-indigo-900/40 dark:text-indigo-300 font-extrabold text-xs tracking-wider uppercase border border-[#3525cd]/20">
              {user.degree}
            </span>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 w-full mt-5">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-[#3525cd] hover:bg-[#4648d4] text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setIsCvModalOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 hover:bg-[#eae6f4] text-[#1b1b24] dark:text-white font-extrabold text-xs border border-[#c7c4d8]/50 transition-all cursor-pointer"
              >
                IITD CV
              </button>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Contact & Meta Details */}
          <div className="space-y-3 text-xs">
            <h3 className="font-extrabold text-[11px] text-[#777587] dark:text-gray-400 uppercase tracking-wider">
              Academic Record Details
            </h3>
            <div className="flex items-center gap-3 text-[#464555] dark:text-gray-300">
              <span className="material-symbols-outlined text-lg text-[#3525cd]">mail</span>
              <span className="font-medium truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-[#464555] dark:text-gray-300">
              <span className="material-symbols-outlined text-lg text-[#3525cd]">home</span>
              <span className="font-medium truncate">{user.location}</span>
            </div>
            <div className="flex items-center gap-3 text-[#464555] dark:text-gray-300">
              <span className="material-symbols-outlined text-lg text-[#3525cd]">calendar_today</span>
              <span className="font-medium">Joined {user.joinedYear} • {user.year}</span>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Technical Skills */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-[11px] text-[#777587] dark:text-gray-400 uppercase tracking-wider">
              Technical Core & Competencies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#f0ecf9] dark:bg-gray-800 text-[#1b1b24] dark:text-gray-200 text-xs font-bold border border-[#c7c4d8]/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Academic Bento & Performance Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Bento Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CGPA Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-[#3525cd] to-[#4648d4] text-white p-6 rounded-3xl shadow-lg shadow-[#3525cd]/20 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
                  <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-300 text-slate-900">
                  {user.topPercentile}
                </span>
              </div>
              <div>
                <p className="text-xs text-indigo-100 font-bold">IIT Delhi CGPA</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-4xl font-black tracking-tight">{user.gpa}</h3>
                  <span className="text-sm font-bold text-indigo-200">/ 10.00 Scale</span>
                </div>
              </div>
            </motion.div>

            {/* Credits Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 text-[#3525cd]">
                  <span className="material-symbols-outlined text-2xl">school</span>
                </span>
                <span className="text-xs font-bold text-[#3525cd] dark:text-indigo-400">
                  {progressPercent}% Complete
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold text-[#777587]">B.Tech Credits</p>
                  <p className="text-sm font-extrabold text-[#1b1b24] dark:text-white">
                    {user.creditsEarned} <span className="text-xs text-[#777587]">/ {user.totalCreditsRequired}</span>
                  </p>
                </div>
                <div className="w-full h-2.5 bg-[#f0ecf9] dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3525cd] to-[#4f46e5] rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Honors & Achievements */}
          <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">emoji_events</span>
              <span>IIT Delhi Honors & Awards</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {user.achievements.map((ach, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#f5f2ff]/60 dark:bg-gray-800/50 border border-[#c7c4d8]/30 space-y-2"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#3525cd] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">{ach.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1b1b24] dark:text-white">{ach.title}</h4>
                    <p className="text-[11px] text-[#777587] dark:text-gray-400 mt-0.5 leading-snug">{ach.subtitle}</p>
                    <span className="text-[10px] font-bold text-[#3525cd] dark:text-indigo-400 mt-2 block">{ach.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semester Grade History Table */}
          <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3525cd]">history_edu</span>
                <span>Semester History & SGPA Ledger</span>
              </h3>
              <span className="text-xs font-bold text-[#3525cd] dark:text-indigo-400">5 Semesters Completed</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f0ecf9] dark:bg-gray-800 text-[#464555] dark:text-gray-300 font-extrabold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Semester Term</th>
                    <th className="p-3.5">Semester SGPA</th>
                    <th className="p-3.5">Credits Completed</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                  {semesterHistory.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="p-3.5 font-bold text-[#1b1b24] dark:text-white">{s.term}</td>
                      <td className="p-3.5 font-extrabold text-[#3525cd] dark:text-indigo-400">{s.gpa.toFixed(2)}</td>
                      <td className="p-3.5 text-[#464555] dark:text-gray-300">{s.credits} Credits</td>
                      <td className="p-3.5 text-right">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            s.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#232330] rounded-3xl p-6 border border-[#c7c4d8]/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
                Edit Student Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                  Degree / Major
                </label>
                <input
                  type="text"
                  value={editMajor}
                  onChange={(e) => setEditMajor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                  Hostel / Location
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#3525cd] text-xs font-bold text-white shadow-md shadow-[#3525cd]/20 cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PUBLIC CV MODAL */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#232330] rounded-3xl p-8 border border-[#c7c4d8]/50 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-extrabold text-xl text-[#1b1b24] dark:text-white">{user.name} - Official IITD Portfolio</h3>
                <p className="text-xs text-[#3525cd] dark:text-indigo-300 font-bold">{user.degree} • CGPA {user.gpa} / 10.0</p>
              </div>
              <button onClick={() => setIsCvModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#464555] dark:text-gray-300 leading-relaxed font-medium">
              <p>
                <strong>Academic Specialization:</strong> Operating Systems, Distributed Algorithms, PyTorch Model Optimization, Data Structures.
              </p>
              <p>
                <strong>IIT Delhi Achievements:</strong> Tryst 2025 Algorithmic Coding Winner, Insti Merit Award (2024), Inter-IIT Tech Meet Bronze Medalist.
              </p>
              <p>
                <strong>Undergraduate Projects:</strong> Kernel Thread Scheduler in C++, B+ Tree Indexing Engine for Microservices, ResNet CIFAR Classifier.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  showToast('Portfolio link copied to clipboard!', 'success');
                  setIsCvModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#3525cd] text-white font-bold text-xs cursor-pointer shadow-md shadow-[#3525cd]/20"
              >
                Copy Shareable Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
