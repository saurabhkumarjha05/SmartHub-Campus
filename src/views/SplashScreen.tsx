import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingFooter } from '../components/LandingFooter';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    'Establishing secure IIT Delhi Campus network connection...',
    'Syncing COL331 & COL106 assignment pipelines...',
    'Loading Central Library digital archives & AI tutor engine...',
    'Optimizing academic workspace for Priya Sharma (2024CS1025)...',
    'IIT Delhi Academic Hub Ready!'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 9) + 5;
        return next > 100 ? 100 : next;
      });
    }, 110);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 25) setStatusIndex(0);
    else if (progress < 50) setStatusIndex(1);
    else if (progress < 75) setStatusIndex(2);
    else if (progress < 100) setStatusIndex(3);
    else setStatusIndex(4);
  }, [progress]);

  const handleScrollDown = () => {
    const elem = document.getElementById('features-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f6ff] dark:bg-[#12111a] text-[#1b1b24] dark:text-gray-100 font-sans relative overflow-y-auto overflow-x-hidden scroll-smooth">
      {/* Background Ambient Mesh */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#3525cd]/15 via-purple-500/10 to-[#4f46e5]/15 dark:from-[#3525cd]/25 dark:via-purple-900/15 dark:to-indigo-950/30 pointer-events-none animate-pulse" />

      {/* Floating particles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 20, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3525cd]/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Hero Section (First Screen) */}
      <div className="min-h-screen w-full flex flex-col justify-between items-center p-6 sm:p-10 relative z-10">
        {/* Top Header info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg flex items-center justify-between text-xs text-[#777587] dark:text-gray-400 font-medium bg-white/50 dark:bg-gray-900/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/60 dark:border-gray-800 shadow-xs"
        >
          <span className="flex items-center gap-2 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[#3525cd] dark:text-indigo-300 font-bold">IIT Delhi</span> Campus Grid
          </span>
          <span className="font-semibold text-gray-600 dark:text-gray-300">New Delhi, India</span>
        </motion.div>

        {/* Main Center Content */}
        <div className="flex flex-col items-center max-w-lg w-full my-auto py-8">
          {/* Animated Brand Logo Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
            className="relative mb-6"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#3525cd] via-[#4648d4] to-[#4f46e5] flex items-center justify-center text-white shadow-2xl shadow-[#3525cd]/40 transform hover:scale-105 transition-all duration-300 border border-white/20">
              <span className="material-symbols-outlined text-5xl sm:text-6xl">school</span>
            </div>
            <div className="absolute -inset-3 rounded-3xl bg-[#3525cd]/25 blur-2xl -z-10 animate-pulse" />
          </motion.div>

          {/* Brand Name & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-1 text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-black text-[#1b1b24] dark:text-white tracking-tight">
              Indian Institute of Technology Delhi
            </h1>
            <p className="text-xs font-extrabold text-[#3525cd] dark:text-indigo-400 uppercase tracking-widest pt-1">
              Smart Campus Academic Engine • B.Tech CSE
            </p>
          </motion.div>

          {/* Progress Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full mt-6 bg-white/70 dark:bg-[#232330]/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/80 dark:border-gray-800 shadow-xl"
          >
            <div className="flex items-center justify-between text-xs font-bold mb-2.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#3525cd] dark:text-indigo-300 font-semibold truncate max-w-[80%]"
                >
                  {statusMessages[statusIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="text-[#3525cd] dark:text-indigo-400 font-extrabold font-mono">
                {progress}%
              </span>
            </div>

            {/* Progress Bar Rail */}
            <div className="relative w-full h-3 rounded-full bg-[#c7c4d8]/30 dark:bg-gray-800 overflow-hidden p-0.5 border border-[#c7c4d8]/40 dark:border-gray-700">
              <motion.div
                className="h-full bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer" />
              </motion.div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-[#777587] dark:text-gray-400 text-left">
              <div className="flex items-center gap-1.5 font-medium">
                <span className={`material-symbols-outlined text-sm ${progress > 20 ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-700'}`}>
                  {progress > 20 ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span>Kerberos SSO Sync</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className={`material-symbols-outlined text-sm ${progress > 50 ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-700'}`}>
                  {progress > 50 ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span>CSE ERP Pipeline</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className={`material-symbols-outlined text-sm ${progress > 75 ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-700'}`}>
                  {progress > 75 ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span>Central Library AI</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <span className={`material-symbols-outlined text-sm ${progress === 100 ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-700'}`}>
                  {progress === 100 ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span>Hostel Mess Wallet</span>
              </div>
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3 mt-5">
            <motion.button
              whileHover={{ scale: progress === 100 ? 1.02 : 1 }}
              whileTap={{ scale: progress === 100 ? 0.98 : 1 }}
              onClick={onComplete}
              disabled={progress < 100}
              className={`flex-1 py-3.5 px-5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                progress === 100
                  ? 'bg-[#3525cd] hover:bg-[#4648d4] text-white shadow-[#3525cd]/35'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
            >
              <span>{progress === 100 ? 'Enter IITD Workspace' : 'Initializing...'}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </motion.button>

            <button
              onClick={handleScrollDown}
              className="py-3.5 px-5 rounded-2xl bg-white/70 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-[#3525cd] dark:text-indigo-300 font-extrabold text-xs border border-[#c7c4d8]/50 dark:border-gray-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Explore Features</span>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </button>
          </div>
        </div>

        {/* Scroll Down Bouncing Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-2 text-xs font-bold text-[#3525cd] dark:text-indigo-400 py-2 cursor-pointer group"
          onClick={handleScrollDown}
        >
          <span className="text-[11px] uppercase tracking-wider font-extrabold bg-white/60 dark:bg-gray-900/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-gray-800 shadow-xs group-hover:bg-[#3525cd] group-hover:text-white transition-all">
            Scroll Down to Explore ↓
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-[#c7c4d8]/40 dark:border-gray-700 flex items-center justify-center text-[#3525cd] dark:text-indigo-400"
          >
            <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Showcase Section (Scroll Target) */}
      <div id="features-section" className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 relative z-10 space-y-12">
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-[#3525cd]/10 text-[#3525cd] dark:bg-indigo-900/40 dark:text-indigo-300 text-xs font-extrabold uppercase tracking-widest">
            Integrated Campus Grid
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1b1b24] dark:text-white tracking-tight">
            Designed for IIT Delhi Scholars
          </h2>
          <p className="text-sm text-[#777587] dark:text-gray-400 leading-relaxed font-medium">
            Everything you need for academic success, course management, research archives, and campus lifestyle in one unified smart hub.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: AI Study Assistant */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-[#232330]/90 backdrop-blur-xl p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-lg space-y-3 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-[#3525cd] dark:text-indigo-400 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
              AI Academic Tutor
            </h3>
            <p className="text-xs text-[#777587] dark:text-gray-400 leading-relaxed">
              24/7 intelligent course companion loaded with COL331 Operating Systems, COL106 Data Structures, and COL774 Machine Learning syllabi.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#3525cd] dark:text-indigo-400">
              <span>Try Course Prompts</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </motion.div>

          {/* Card 2: Assignment Pipeline */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-[#232330]/90 backdrop-blur-xl p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-lg space-y-3 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">assignment</span>
            </div>
            <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
              Assignment Pipeline
            </h3>
            <p className="text-xs text-[#777587] dark:text-gray-400 leading-relaxed">
              Real-time Kanban tracking for lab reports, theory problem sets, deadlines, and group collaborator assignees with automated priority alerts.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>View Active Deadlines</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </motion.div>

          {/* Card 3: Central Library Digital Vault */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-[#232330]/90 backdrop-blur-xl p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-lg space-y-3 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">local_library</span>
            </div>
            <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
              Central Library Archives
            </h3>
            <p className="text-xs text-[#777587] dark:text-gray-400 leading-relaxed">
              Instant digital access to over 500,000+ IEEE journals, e-books, research publications, library pass renewal, and quiet seat reservations.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400">
              <span>Browse Digital Vault</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </motion.div>

          {/* Card 4: Kerberos Canteen Wallet */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-[#232330]/90 backdrop-blur-xl p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-lg space-y-3 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">restaurant</span>
            </div>
            <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
              Canteen & Mess Wallet
            </h3>
            <p className="text-xs text-[#777587] dark:text-gray-400 leading-relaxed">
              Order meals in advance from Nescafe, Amul, Shiraz, and Hostel Messes with contactless Kerberos QR wallet payments.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>View Today Menu</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </motion.div>

          {/* Card 5: Attendance Compliance */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-[#232330]/90 backdrop-blur-xl p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-lg space-y-3 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">event_available</span>
            </div>
            <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
              Attendance Analytics
            </h3>
            <p className="text-xs text-[#777587] dark:text-gray-400 leading-relaxed">
              Track course-by-course attendance logs with automated 75% rule warnings and buffer calculation before mid-sem / end-sem exams.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
              <span>Check Attendance Log</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </motion.div>

          {/* Card 6: T&P Placement Hub */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-[#232330]/90 backdrop-blur-xl p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-lg space-y-3 relative overflow-hidden group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">work</span>
            </div>
            <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
              T&P Career Placement
            </h3>
            <p className="text-xs text-[#777587] dark:text-gray-400 leading-relaxed">
              Direct updates from Training & Placement Cell, interview schedules, campus recruitment drives, and resume review tools.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>Explore Career Drive</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </div>
          </motion.div>
        </div>

        {/* IIT Delhi Platform Stats Section */}
        <div className="bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-8 relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
            <div>
              <h4 className="text-3xl sm:text-4xl font-black">10,000+</h4>
              <p className="text-xs font-bold text-indigo-200 mt-1 uppercase tracking-wider">IITD Students</p>
            </div>
            <div>
              <h4 className="text-3xl sm:text-4xl font-black">99.8%</h4>
              <p className="text-xs font-bold text-indigo-200 mt-1 uppercase tracking-wider">On-Time Submissions</p>
            </div>
            <div>
              <h4 className="text-3xl sm:text-4xl font-black">500k+</h4>
              <p className="text-xs font-bold text-indigo-200 mt-1 uppercase tracking-wider">Library Digital Papers</p>
            </div>
            <div>
              <h4 className="text-3xl sm:text-4xl font-black">9.6 CGPA</h4>
              <p className="text-xs font-bold text-indigo-200 mt-1 uppercase tracking-wider">Average CSE Batch Score</p>
            </div>
          </div>
        </div>

        {/* Student Testimonial Highlight */}
        <div className="bg-white/80 dark:bg-[#232330]/90 backdrop-blur-xl p-8 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-md flex flex-col sm:flex-row items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
            alt="Priya Sharma"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-[#3525cd] shadow-md shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
            </div>
            <p className="text-sm font-medium italic text-[#1b1b24] dark:text-gray-200">
              &quot;The smart campus hub has transformed my academic routine at IIT Delhi. Having my COL331 assignments, library archives, and canteen payments synced seamlessly saves me hours every week!&quot;
            </p>
            <div className="text-xs font-bold text-[#3525cd] dark:text-indigo-400">
              Priya Sharma • B.Tech Computer Science & Engineering (2024CS1025)
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="text-center bg-white/70 dark:bg-gray-900/70 p-8 sm:p-10 rounded-3xl border border-[#c7c4d8]/50 dark:border-gray-800 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-[#1b1b24] dark:text-white">
            Ready to Enter Your Academic Workspace?
          </h3>
          <p className="text-xs sm:text-sm text-[#777587] dark:text-gray-400 max-w-lg mx-auto font-medium">
            Access your personalized student portal, COL331 pipelines, and Kerberos SSO authentication now.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#3525cd] hover:bg-[#4648d4] text-white font-extrabold text-sm shadow-xl shadow-[#3525cd]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter IITD Academic Workspace</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </motion.button>

            <button
              onClick={handleScrollToTop}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#1b1b24] dark:text-white font-bold text-xs border border-[#c7c4d8]/50 dark:border-gray-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">arrow_upward</span>
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium SaaS Landing Footer */}
      <LandingFooter onEnterWorkspace={onComplete} />
    </div>
  );
};
