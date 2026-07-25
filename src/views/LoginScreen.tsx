import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('priya.sharma@iitd.ac.in');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f6ff] dark:bg-[#12111a] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans relative overflow-hidden">
      {/* Background Mesh Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#3525cd]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white/90 dark:bg-[#232330]/90 backdrop-blur-xl rounded-3xl border border-[#c7c4d8]/50 dark:border-gray-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] relative z-10"
      >
        {/* Left Form Section */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3525cd] to-[#4f46e5] flex items-center justify-center text-white shadow-lg shadow-[#3525cd]/25">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <div>
                <h1 className="font-extrabold text-lg text-[#1b1b24] dark:text-white leading-tight">
                  IIT Delhi Smart Campus
                </h1>
                <p className="text-[10px] font-bold text-[#3525cd] dark:text-indigo-400 uppercase tracking-widest">
                  Kerberos SSO Portal
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#1b1b24] dark:text-white tracking-tight mb-2">
                Welcome back, Priya! 👋
              </h2>
              <p className="text-sm text-[#777587] dark:text-gray-400">
                Access your COL331 course pipeline, Central Library archives, and Canteen wallet.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1.5">
                  IIT Delhi Email (priya.sharma@iitd.ac.in)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya.sharma@iitd.ac.in"
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#f0ecf9] dark:bg-gray-800/80 border border-[#c7c4d8] dark:border-gray-700 text-sm text-[#1b1b24] dark:text-white focus:outline-none focus:border-[#3525cd] focus:bg-white dark:focus:bg-gray-800 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#464555] dark:text-gray-300">
                    Kerberos Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Kerberos reset password instructions sent to your phone number +91 98765*****');
                    }}
                    className="text-xs font-bold text-[#3525cd] dark:text-indigo-400 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                    lock
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[#f0ecf9] dark:bg-gray-800/80 border border-[#c7c4d8] dark:border-gray-700 text-sm text-[#1b1b24] dark:text-white focus:outline-none focus:border-[#3525cd] focus:bg-white dark:focus:bg-gray-800 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#3525cd] focus:ring-[#3525cd]"
                  />
                  <span className="text-xs text-[#464555] dark:text-gray-300 font-semibold">
                    Remember this session
                  </span>
                </label>
              </div>

              {/* Submit Primary */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl bg-[#3525cd] hover:bg-[#4648d4] text-white font-extrabold text-sm shadow-lg shadow-[#3525cd]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Kerberos Key...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to IITD Hub</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </motion.button>

              {/* SSO Option */}
              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full py-3 px-6 rounded-2xl bg-[#f0ecf9] dark:bg-gray-800 hover:bg-[#eae6f4] dark:hover:bg-gray-700 text-[#1b1b24] dark:text-white font-bold text-xs border border-[#c7c4d8]/50 dark:border-gray-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-[#3525cd] dark:text-indigo-400">
                  domain_verification
                </span>
                <span>IIT Delhi Kerberos SSO Direct Pass</span>
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 mt-6 text-center text-xs text-[#777587] dark:text-gray-400">
            <span>New Student or Scholar? </span>
            <button
              onClick={onLoginSuccess}
              className="font-bold text-[#3525cd] dark:text-indigo-400 hover:underline"
            >
              Activate IIT Delhi Student Identity
            </button>
          </div>
        </div>

        {/* Right Hero Visual Section */}
        <div className="hidden lg:flex lg:col-span-6 relative bg-gradient-to-br from-[#3525cd] via-[#4648d4] to-[#1b1b24] p-12 text-white flex-col justify-between overflow-hidden">
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-extrabold tracking-wider uppercase border border-white/20">
              IIT Delhi Hub
            </span>
            <span className="text-xs text-white/90 font-mono">2025-2026 Academic Year</span>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300">
              <span className="material-symbols-outlined text-3xl">auto_awesome</span>
            </div>
            <h3 className="text-3xl font-black leading-tight tracking-tight">
              &quot;Empowering IIT Delhi scholars with AI-driven academic excellence.&quot;
            </h3>
            <p className="text-sm text-indigo-100 font-normal leading-relaxed max-w-md">
              Access real-time assignment pipelines, Central Library indexing, Canteen wallet orders, and T&P placement updates in one unified platform.
            </p>
          </div>

          {/* Student Proof */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full border-2 border-indigo-900 object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_-e6ftvVbBb1LJ2Nc_69K3miIYlza8bCuomaIJFRByqPYk5uET_OKC_wIHOJEFD7_TE4dT3jzS3dr07910ZSxHGruTot-4cGG0a775k8xkWvlaWheGRrmIPYxybS6f4WKGp4IgcIPkot2HAW6iQxxAvVgRekNqIm6irepWh3xmfasHNXb3GtWUYGxwxItHT5ealXv0_yrRKtTgTJmGualaKTHg1yftB4fWhR3s7AqTsEc2PKOk7xWDIVR3W0HkXDmAsvaJNhYKguE"
                  alt="Priya Sharma"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-indigo-900 object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Student"
                />
              </div>
              <span className="text-xs font-bold text-white/90">
                10,000+ IIT Delhi Students
              </span>
            </div>
            <span className="text-xs text-indigo-200">v4.2 Hub</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
