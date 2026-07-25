import React, { useState } from 'react';
import { CampusNotification, NotificationCategory } from '../types';

interface NotificationsViewProps {
  notifications: CampusNotification[];
  onMarkAllAsRead: () => void;
  onDismissNotification: (id: string) => void;
  onNotificationAction: (id: string, actionKey: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllAsRead,
  onDismissNotification,
  onNotificationAction,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter((n) => {
    const matchesCategory = selectedCategory === 'all' || n.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesUnread = !showUnreadOnly || n.isUnread;
    return matchesCategory && matchesUnread;
  });

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const getCategoryBadge = (category: NotificationCategory) => {
    switch (category) {
      case 'Academic':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300';
      case 'Social':
        return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300';
      case 'Campus':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300';
      case 'System':
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const dateGroups: ('Today' | 'Yesterday' | 'Last Week')[] = ['Today', 'Yesterday', 'Last Week'];

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Action Header Card */}
      <div className="bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#3525cd]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider">
              {unreadCount} Unread Notifications
            </span>
            <span className="text-xs text-indigo-200">Real-time Campus Stream</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Stay updated with your academic hub
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-lg leading-relaxed">
            Grade announcements, library loan alerts, hackathon invitations, and campus food deals.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <button
            onClick={onMarkAllAsRead}
            className="px-4 py-2.5 rounded-xl bg-white text-[#3525cd] hover:bg-indigo-50 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">done_all</span>
            <span>Archive & Mark Read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#232330] p-3 rounded-2xl border border-[#c7c4d8]/40 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'Academic', 'Social', 'Campus', 'System'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-[#3525cd] text-white shadow-xs'
                  : 'text-[#464555] dark:text-gray-300 hover:bg-[#f0ecf9] dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-[#464555] dark:text-gray-300 cursor-pointer pr-2">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
            className="w-4 h-4 rounded text-[#3525cd]"
          />
          <span>Unread Only ({unreadCount})</span>
        </label>
      </div>

      {/* Grouped Notifications List */}
      <div className="space-y-8">
        {dateGroups.map((group) => {
          const groupNotifs = filteredNotifications.filter((n) => n.dateGroup === group);
          if (groupNotifs.length === 0) return null;

          return (
            <div key={group} className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-extrabold text-xs text-[#777587] dark:text-gray-400 uppercase tracking-wider">
                  {group}
                </h3>
                <div className="h-px flex-1 bg-[#c7c4d8]/40 dark:bg-gray-800" />
              </div>

              <div className="space-y-3">
                {groupNotifs.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#232330] border transition-all relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      notif.isUnread
                        ? 'border-[#3525cd]/40 dark:border-indigo-500/50 shadow-md shadow-[#3525cd]/5'
                        : 'border-[#c7c4d8]/30 dark:border-gray-800 opacity-90'
                    }`}
                  >
                    {/* Left Indicator Strip */}
                    {notif.isUnread && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#3525cd]" />
                    )}

                    <div className="flex items-start gap-3.5 flex-1 pl-1">
                      {/* Avatar or Icon */}
                      {notif.avatar ? (
                        <img
                          src={notif.avatar}
                          alt="Sender"
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#3525cd]/20 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 text-[#3525cd] dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-xl">
                            {notif.icon || 'notifications'}
                          </span>
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-sm text-[#1b1b24] dark:text-white">
                            {notif.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCategoryBadge(notif.category)}`}>
                            {notif.category}
                          </span>
                          <span className="text-[11px] text-[#777587] font-medium">
                            • {notif.timeAgo}
                          </span>
                        </div>
                        <p className="text-xs text-[#464555] dark:text-gray-300 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800">
                      {notif.actionButtons?.map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => onNotificationAction(notif.id, btn.action)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                            btn.primary
                              ? 'bg-[#3525cd] hover:bg-[#4648d4] text-white shadow-xs'
                              : 'bg-[#f0ecf9] dark:bg-gray-800 text-[#1b1b24] dark:text-white hover:bg-gray-200'
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
                      <button
                        onClick={() => onDismissNotification(notif.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Dismiss"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-[#232330] rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800">
            <span className="material-symbols-outlined text-4xl text-[#3525cd] mb-2">notifications_off</span>
            <h4 className="font-bold text-base text-[#1b1b24] dark:text-white">All caught up!</h4>
            <p className="text-xs text-[#777587] mt-1">No notifications match your current filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
