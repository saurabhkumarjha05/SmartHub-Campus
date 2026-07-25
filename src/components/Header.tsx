import React from 'react';
import { NavigationTab, UserProfile } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  user: UserProfile;
  unreadNotificationsCount: number;
  themeMode: 'light' | 'dark' | 'system';
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  user,
  unreadNotificationsCount,
  themeMode,
  onToggleTheme,
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Dashboard';
      case 'assignments': return 'Assignments';
      case 'notifications': return 'Notifications';
      case 'profile': return 'Student Profile';
      case 'settings': return 'Settings';
      case 'ai-tutor': return 'AI Study Assistant';
      case 'attendance': return 'Attendance';
      case 'grades': return 'Grades';
      case 'library': return 'Library';
      case 'canteen': return 'Canteen';
      case 'calendar': return 'Calendar';
      case 'events': return 'Events';
      default: return 'Smart Campus';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#fcf8ff]/90 dark:bg-[#1b1b24]/90 backdrop-blur-md border-b border-[#c7c4d8]/40 dark:border-gray-800 px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#f0ecf9] dark:hover:bg-gray-800"
          aria-label="Open sidebar menu"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <div>
          <h2 className="font-bold text-lg lg:text-xl text-[#1b1b24] dark:text-white tracking-tight flex items-center gap-2">
            {getTabTitle()}
            {currentTab === 'ai-tutor' && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                Gemini Powered
              </span>
            )}
          </h2>
          <p className="text-xs text-[#777587] dark:text-gray-400 hidden sm:block">
            {user.degree} • Semester Fall 2024
          </p>
        </div>
      </div>

      {/* Center: Universal Search Input */}
      <div className="hidden md:flex items-center flex-1 max-w-md relative">
        <span className="material-symbols-outlined absolute left-3.5 text-[#777587] text-lg pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search assignments, courses, library books, notifications..."
          className="w-full pl-10 pr-4 py-2 text-xs lg:text-sm rounded-xl bg-[#f0ecf9] dark:bg-gray-800/80 border border-[#c7c4d8]/50 dark:border-gray-700 text-[#1b1b24] dark:text-white focus:outline-none focus:border-[#3525cd] transition-all placeholder-[#777587]"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 text-xs text-gray-400 hover:text-gray-600"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Tutor Quick Shortcut */}
        <button
          onClick={() => onSelectTab('ai-tutor')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white text-xs font-semibold shadow-xs hover:opacity-95 transition-all"
        >
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          <span>Ask AI</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-[#464555] dark:text-gray-300 hover:bg-[#f0ecf9] dark:hover:bg-gray-800 transition-colors"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined text-xl">
            {themeMode === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => onSelectTab('notifications')}
          className="relative p-2 rounded-xl text-[#464555] dark:text-gray-300 hover:bg-[#f0ecf9] dark:hover:bg-gray-800 transition-colors"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#fcf8ff] dark:ring-[#1b1b24] animate-pulse" />
          )}
        </button>

        {/* User Profile Pill */}
        <div
          onClick={() => onSelectTab('profile')}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 hover:bg-[#eae6f4] dark:hover:bg-gray-700 cursor-pointer transition-colors border border-[#c7c4d8]/40 dark:border-gray-700"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#3525cd]/20"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-[#1b1b24] dark:text-white leading-none">
              {user.name}
            </p>
            <p className="text-[10px] text-[#777587] dark:text-gray-400 mt-0.5">
              {user.major}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
