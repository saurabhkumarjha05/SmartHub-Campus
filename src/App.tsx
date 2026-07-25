import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavigationTab,
  Task,
  CampusNotification,
  UserProfile,
  CourseGrade,
  SemesterHistory,
  ThemeSettings,
  StudyMilestone,
  TaskStatus,
} from './types';
import {
  initialTasks,
  initialNotifications,
  initialUserProfile,
  initialGrades,
  initialSemesterHistory,
  initialThemeSettings,
  initialMilestones,
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastProvider, useToast } from './components/ToastContext';

// Dynamic lazy loaded view modules for optimal chunk splitting
const SplashScreen = lazy(() => import('./views/SplashScreen').then((m) => ({ default: m.SplashScreen })));
const LoginScreen = lazy(() => import('./views/LoginScreen').then((m) => ({ default: m.LoginScreen })));
const DashboardView = lazy(() => import('./views/DashboardView').then((m) => ({ default: m.DashboardView })));
const AssignmentsView = lazy(() => import('./views/AssignmentsView').then((m) => ({ default: m.AssignmentsView })));
const NotificationsView = lazy(() => import('./views/NotificationsView').then((m) => ({ default: m.NotificationsView })));
const ProfileView = lazy(() => import('./views/ProfileView').then((m) => ({ default: m.ProfileView })));
const SettingsView = lazy(() => import('./views/SettingsView').then((m) => ({ default: m.SettingsView })));
const AiStudyView = lazy(() => import('./views/AiStudyView').then((m) => ({ default: m.AiStudyView })));
const AttendanceView = lazy(() => import('./views/AttendanceView').then((m) => ({ default: m.AttendanceView })));
const GradesView = lazy(() => import('./views/GradesView').then((m) => ({ default: m.GradesView })));
const LibraryView = lazy(() => import('./views/LibraryView').then((m) => ({ default: m.LibraryView })));
const CanteenView = lazy(() => import('./views/CanteenView').then((m) => ({ default: m.CanteenView })));
const CalendarView = lazy(() => import('./views/CalendarView').then((m) => ({ default: m.CalendarView })));
const EventsView = lazy(() => import('./views/EventsView').then((m) => ({ default: m.EventsView })));

const ViewLoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <div className="w-10 h-10 border-4 border-[#3525cd] border-t-transparent rounded-full animate-spin"></div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading module...</p>
  </div>
);

function AppContent() {
  const { showToast } = useToast();
  const [currentTab, setCurrentTab] = useState<NavigationTab>('splash');
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [notifications, setNotifications] = useState<CampusNotification[]>(initialNotifications);
  const [grades] = useState<CourseGrade[]>(initialGrades);
  const [semesterHistory] = useState<SemesterHistory[]>(initialSemesterHistory);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(initialThemeSettings);
  const [milestones, setMilestones] = useState<StudyMilestone[]>(initialMilestones);

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    if (themeSettings.themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (themeSettings.themeMode === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }, [themeSettings.themeMode]);

  // Handlers
  const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" created successfully!`, 'success');
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Task status updated to ${newStatus.replace('_', ' ')}`, 'info');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast('Task removed from queue.', 'warning');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    showToast('All notifications marked as read', 'success');
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast('Notification dismissed', 'info');
  };

  const handleNotificationAction = (id: string, actionKey: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );

    if (actionKey === 'view_grade') setCurrentTab('grades');
    else if (actionKey === 'view_menu') setCurrentTab('canteen');
    else if (actionKey === 'view_pass' || actionKey === 'renew') setCurrentTab('library');
    else if (actionKey === 'accept' || actionKey === 'decline') showToast(`Invitation (${actionKey}) updated!`, 'info');
    else if (actionKey === 'dismiss') handleDismissNotification(id);
    else showToast(`Action "${actionKey}" processed.`, 'info');
  };

  const handleToggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleAddMilestone = (title: string) => {
    setMilestones((prev) => [
      ...prev,
      { id: `m-${Date.now()}`, title, completed: false, dueDate: 'Soon' },
    ]);
    showToast(`Study milestone "${title}" added!`, 'success');
  };

  const unreadNotificationsCount = notifications.filter((n) => n.isUnread).length;
  const activeTasksCount = tasks.filter((t) => t.status !== 'completed').length;

  const handleToggleTheme = () => {
    const nextMode = themeSettings.themeMode === 'dark' ? 'light' : 'dark';
    setThemeSettings((prev) => ({ ...prev, themeMode: nextMode }));
  };

  if (currentTab === 'splash') {
    return (
      <Suspense fallback={<ViewLoadingFallback />}>
        <SplashScreen onComplete={() => setCurrentTab('login')} />
      </Suspense>
    );
  }

  if (currentTab === 'login') {
    return (
      <Suspense fallback={<ViewLoadingFallback />}>
        <LoginScreen onLoginSuccess={() => setCurrentTab('dashboard')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf8ff] dark:bg-[#1b1b24] text-[#1b1b24] dark:text-gray-100 flex flex-col lg:flex-row antialiased font-['Inter',sans-serif]">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        unreadNotificationsCount={unreadNotificationsCount}
        activeTasksCount={activeTasksCount}
        onLogout={() => setCurrentTab('login')}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <Header
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          user={user}
          unreadNotificationsCount={unreadNotificationsCount}
          themeMode={themeSettings.themeMode}
          onToggleTheme={handleToggleTheme}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<ViewLoadingFallback />}>
            {currentTab === 'dashboard' && (
              <DashboardView
                user={user}
                tasks={tasks}
                grades={grades}
                onSelectTab={setCurrentTab}
              />
            )}

            {currentTab === 'assignments' && (
              <AssignmentsView
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateTaskStatus={handleUpdateTaskStatus}
                onDeleteTask={handleDeleteTask}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'notifications' && (
              <NotificationsView
                notifications={notifications}
                onMarkAllAsRead={handleMarkAllNotificationsRead}
                onDismissNotification={handleDismissNotification}
                onNotificationAction={handleNotificationAction}
              />
            )}

            {currentTab === 'profile' && (
              <ProfileView
                user={user}
                grades={grades}
                semesterHistory={semesterHistory}
                onUpdateUser={(updated) => setUser({ ...user, ...updated })}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsView
                settings={themeSettings}
                user={user}
                onUpdateSettings={setThemeSettings}
                onUpdateUser={(updated) => setUser({ ...user, ...updated })}
              />
            )}

            {currentTab === 'ai-tutor' && (
              <AiStudyView
                milestones={milestones}
                onToggleMilestone={handleToggleMilestone}
                onAddMilestone={handleAddMilestone}
              />
            )}

            {currentTab === 'attendance' && <AttendanceView />}

            {currentTab === 'grades' && <GradesView grades={grades} />}

            {currentTab === 'library' && <LibraryView />}

            {currentTab === 'canteen' && <CanteenView />}

            {currentTab === 'calendar' && <CalendarView />}

            {currentTab === 'events' && <EventsView />}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
