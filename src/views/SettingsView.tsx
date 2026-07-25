import React, { useState } from 'react';
import { ThemeSettings, UserProfile } from '../types';

interface SettingsViewProps {
  settings: ThemeSettings;
  user: UserProfile;
  onUpdateSettings: (newSettings: ThemeSettings) => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  user,
  onUpdateSettings,
  onUpdateUser,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'appearance' | 'account' | 'notifications' | 'widgets'>('appearance');

  const [themeMode, setThemeMode] = useState(settings.themeMode);
  const [accentColor, setAccentColor] = useState(settings.accentColor);
  const [fontSizeScale, setFontSizeScale] = useState(settings.fontSizeScale);
  const [widgets, setWidgets] = useState(settings.widgets);

  const [prefName, setPrefName] = useState(user.preferredName);
  const [prefEmail, setPrefEmail] = useState(user.email);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const accentOptions = [
    { color: '#3525cd', label: 'Royal Indigo' },
    { color: '#4648d4', label: 'Electric Blue' },
    { color: '#7e3000', label: 'Amber Flame' },
    { color: '#ba1a1a', label: 'Crimson' },
    { color: '#006a6a', label: 'Deep Teal' },
  ];

  const handleSaveAll = () => {
    onUpdateSettings({
      themeMode,
      accentColor,
      fontSizeScale,
      widgets,
    });
    onUpdateUser({
      preferredName: prefName,
      email: prefEmail,
    });
    setHasUnsavedChanges(false);
    alert('Settings & Personalization saved successfully!');
  };

  const handleDiscard = () => {
    setThemeMode(settings.themeMode);
    setAccentColor(settings.accentColor);
    setFontSizeScale(settings.fontSizeScale);
    setWidgets(settings.widgets);
    setPrefName(user.preferredName);
    setPrefEmail(user.email);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6 pb-24">
      {/* View Header */}
      <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-2">
        <h2 className="text-xl font-extrabold text-[#1b1b24] dark:text-white">
          Settings & Personalization
        </h2>
        <p className="text-xs text-[#777587] dark:text-gray-400">
          Configure your academic environment, visual themes, dashboard widgets, and privacy settings.
        </p>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto custom-scrollbar">
          {[
            { id: 'appearance', label: 'Appearance & Theme', icon: 'palette' },
            { id: 'account', label: 'Account & Security', icon: 'person' },
            { id: 'widgets', label: 'Dashboard Widgets', icon: 'widgets' },
            { id: 'notifications', label: 'Alert Preferences', icon: 'notifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'bg-[#f0ecf9] dark:bg-gray-800 text-[#464555] dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* APPEARANCE SECTION */}
      {activeSubTab === 'appearance' && (
        <div className="space-y-6">
          {/* Theme Selector */}
          <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#1b1b24] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">dark_mode</span>
              <span>Color Theme Mode</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'light', label: 'Light Mode', icon: 'light_mode', desc: 'Clean high contrast light' },
                { id: 'dark', label: 'Dark Mode', icon: 'dark_mode', desc: 'Eye-safe twilight dark' },
                { id: 'system', label: 'System Auto', icon: 'desktop_windows', desc: 'Match OS schedule' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setThemeMode(m.id as any);
                    setHasUnsavedChanges(true);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    themeMode === m.id
                      ? 'bg-[#3525cd]/10 border-[#3525cd] text-[#3525cd] dark:text-indigo-300 font-bold'
                      : 'bg-[#f5f2ff]/50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 text-[#464555] dark:text-gray-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl mb-2">{m.icon}</span>
                  <h4 className="font-bold text-xs">{m.label}</h4>
                  <p className="text-[10px] opacity-75 mt-0.5">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color Picker */}
          <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#1b1b24] dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3525cd]">palette</span>
              <span>Primary Brand Accent Color</span>
            </h3>

            <div className="flex flex-wrap items-center gap-4">
              {accentOptions.map((opt) => (
                <button
                  key={opt.color}
                  onClick={() => {
                    setAccentColor(opt.color);
                    setHasUnsavedChanges(true);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                    accentColor === opt.color
                      ? 'border-[#3525cd] bg-indigo-50 dark:bg-indigo-950 font-bold'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full accent-dot"
                    style={{ backgroundColor: opt.color }}
                  />
                  <span className="text-xs text-[#1b1b24] dark:text-white">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Scale Slider */}
          <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#1b1b24] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3525cd]">text_fields</span>
                <span>Typography Scaling</span>
              </h3>
              <span className="text-xs font-bold text-[#3525cd]">{fontSizeScale}% Default</span>
            </div>

            <input
              type="range"
              min="90"
              max="120"
              step="5"
              value={fontSizeScale}
              onChange={(e) => {
                setFontSizeScale(Number(e.target.value));
                setHasUnsavedChanges(true);
              }}
              className="w-full accent-[#3525cd]"
            />
          </div>
        </div>
      )}

      {/* ACCOUNT SECTION */}
      {activeSubTab === 'account' && (
        <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-[#1b1b24] dark:text-white">
            Account Preferences & Preferred Name
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#464555] dark:text-gray-300 mb-1">
                Preferred First Name
              </label>
              <input
                type="text"
                value={prefName}
                onChange={(e) => {
                  setPrefName(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                className="w-full max-w-md px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#464555] dark:text-gray-300 mb-1">
                Academic Email
              </label>
              <input
                type="email"
                value={prefEmail}
                onChange={(e) => {
                  setPrefEmail(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                className="w-full max-w-md px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* WIDGETS SECTION */}
      {activeSubTab === 'widgets' && (
        <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-[#1b1b24] dark:text-white">
            Dashboard Widget Visibility
          </h3>

          <div className="space-y-3">
            {[
              { key: 'classSchedule', label: 'Class Schedule & Lecture Times', desc: 'Show today upcoming lectures on home dashboard' },
              { key: 'canteenMenu', label: 'Campus Canteen Menu Specials', desc: 'Show cafeteria daily deals and coffee rewards' },
              { key: 'gradeAnalytics', label: 'GPA Grade Analytics Chart', desc: 'Display semester GPA projection bar graphs' },
              { key: 'recentMessages', label: 'Recent Academic Messages', desc: 'Display quick announcements in top panel' },
            ].map((w) => (
              <label
                key={w.key}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#f5f2ff]/60 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-xs text-[#1b1b24] dark:text-white">{w.label}</h4>
                  <p className="text-[11px] text-[#777587] dark:text-gray-400">{w.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={(widgets as any)[w.key]}
                  onChange={(e) => {
                    setWidgets({ ...widgets, [w.key]: e.target.checked });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-5 h-5 rounded text-[#3525cd]"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* SYSTEM HEALTH & CACHE */}
      <div className="bg-white dark:bg-[#232330] p-6 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-xs text-[#1b1b24] dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>System Health: Good (Database Latency 12ms)</span>
          </h4>
          <p className="text-[11px] text-[#777587] dark:text-gray-400 mt-0.5">
            Local offline cache: 14.2 MB stored safely.
          </p>
        </div>

        <button
          onClick={() => alert('Local cache cleared successfully.')}
          className="px-4 py-2 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 hover:bg-gray-200 text-xs font-bold text-[#1b1b24] dark:text-white border border-[#c7c4d8]/40"
        >
          Clear System Cache
        </button>
      </div>

      {/* Sticky Unsaved Changes Bar */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1b1b24] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 animate-bounce">
          <span className="text-xs font-semibold">You have unsaved changes!</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDiscard}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
            >
              Discard
            </button>
            <button
              onClick={handleSaveAll}
              className="px-4 py-1.5 rounded-lg bg-[#3525cd] hover:bg-[#4648d4] text-xs font-bold text-white shadow-md"
            >
              Save All Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
