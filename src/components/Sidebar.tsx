import React from 'react';
import { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  unreadNotificationsCount: number;
  activeTasksCount: number;
  onLogout: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  unreadNotificationsCount,
  activeTasksCount,
  onLogout,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const menuItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: 'dashboard' },
    { id: 'attendance' as NavigationTab, label: 'Attendance', icon: 'calendar_month' },
    { id: 'grades' as NavigationTab, label: 'Grades', icon: 'school' },
    { id: 'library' as NavigationTab, label: 'Library', icon: 'local_library' },
    { id: 'canteen' as NavigationTab, label: 'Canteen', icon: 'restaurant' },
    { id: 'calendar' as NavigationTab, label: 'Calendar', icon: 'event' },
    { id: 'assignments' as NavigationTab, label: 'Assignments', icon: 'assignment', badge: activeTasksCount },
    { id: 'events' as NavigationTab, label: 'Events', icon: 'celebration' },
    { id: 'notifications' as NavigationTab, label: 'Notifications', icon: 'notifications', badge: unreadNotificationsCount },
    { id: 'ai-tutor' as NavigationTab, label: 'AI Study Assistant', icon: 'auto_awesome', highlight: true },
    { id: 'profile' as NavigationTab, label: 'Profile', icon: 'person' },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-[#fcf8ff] dark:bg-[#1b1b24] border-r border-[#c7c4d8]/40 dark:border-gray-800 flex flex-col justify-between p-4 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo Header */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                onSelectTab('dashboard');
                onCloseMobile?.();
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#4f46e5] flex items-center justify-center text-white shadow-md shadow-[#3525cd]/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <div>
                <h1 className="font-bold text-base text-[#1b1b24] dark:text-white leading-tight tracking-tight">
                  Smart Campus
                </h1>
                <p className="text-[10px] font-semibold text-[#3525cd] dark:text-[#818cf8] uppercase tracking-wider">
                  Academic Hub
                </p>
              </div>
            </div>

            {/* Close Mobile Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-320px)] custom-scrollbar pr-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile?.();
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#3525cd] text-white shadow-sm shadow-[#3525cd]/30 font-semibold'
                      : 'text-[#464555] dark:text-gray-300 hover:bg-[#f0ecf9] dark:hover:bg-gray-800 hover:text-[#1b1b24]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        isActive ? 'text-white' : item.highlight ? 'text-[#3525cd] dark:text-[#818cf8]' : 'text-[#777587]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {/* Badge */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.id === 'notifications'
                          ? 'bg-rose-500 text-white'
                          : 'bg-[#3525cd]/10 text-[#3525cd] dark:bg-indigo-900/40 dark:text-indigo-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.highlight && !isActive && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500 to-indigo-600 text-white animate-pulse">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-3 pt-2 border-t border-[#c7c4d8]/30 dark:border-gray-800">
          {/* Upgrade Banner */}
          <div className="p-4 rounded-xl bg-[#4f46e5] text-white shadow-sm relative overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 mb-1">
              PREMIUM ACCESS
            </p>
            <h4 className="font-bold text-sm mb-1">Unlock Journals</h4>
            <p className="text-xs text-indigo-100 mb-3 font-normal leading-tight">
              Get full access to IEEE, ACM, and Nature journals.
            </p>
            <button
              onClick={() => {
                onSelectTab('settings');
                onCloseMobile?.();
              }}
              className="w-full py-1.5 px-3 rounded-lg bg-white text-[#3525cd] font-bold text-xs hover:bg-surface transition-colors cursor-pointer"
            >
              Upgrade to Premium
            </button>
          </div>

          {/* Log Out */}
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
