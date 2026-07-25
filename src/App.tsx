import { useState, useEffect } from 'react';
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

import { SplashScreen } from './views/SplashScreen';
import { LoginScreen } from './views/LoginScreen';
import { DashboardView } from './views/DashboardView';
import { AssignmentsView } from './views/AssignmentsView';
import { NotificationsView } from './views/NotificationsView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { AiStudyView } from './views/AiStudyView';
import { AttendanceView } from './views/AttendanceView';
import { GradesView } from './views/GradesView';
import { LibraryView } from './views/LibraryView';
import { CanteenView } from './views/CanteenView';
import { CalendarView } from './views/CalendarView';
import { EventsView } from './views/EventsView';

export default function App() {
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
      // system
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
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationAction = (id: string, actionKey: string) => {
    // Mark read
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );

    if (actionKey === 'view_grade') setCurrentTab('grades');
    else if (actionKey === 'view_menu') setCurrentTab('canteen');
    else if (actionKey === 'view_pass' || actionKey === 'renew') setCurrentTab('library');
    else if (actionKey === 'accept' || actionKey === 'decline') alert(`Invitation action (${actionKey}) updated!`);
    else if (actionKey === 'dismiss') handleDismissNotification(id);
    else alert(`Action "${actionKey}" processed.`);
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
  };

  const unreadNotificationsCount = notifications.filter((n) => n.isUnread).length;
  const activeTasksCount = tasks.filter((t) => t.status !== 'completed').length;

  const handleToggleTheme = () => {
    const nextMode = themeSettings.themeMode === 'dark' ? 'light' : 'dark';
    setThemeSettings((prev) => ({ ...prev, themeMode: nextMode }));
  };

  // Render Full Screen Views (Splash & Login) without standard sidebar layout
  if (currentTab === 'splash') {
    return <SplashScreen onComplete={() => setCurrentTab('login')} />;
  }

  if (currentTab === 'login') {
    return <LoginScreen onLoginSuccess={() => setCurrentTab('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#fcf8ff] dark:bg-[#1b1b24] text-[#1b1b24] dark:text-gray-100 flex flex-col lg:flex-row antialiased font-['Inter',sans-serif]">
      {/* Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        unreadNotificationsCount={unreadNotificationsCount}
        activeTasksCount={activeTasksCount}
        onLogout={() => setCurrentTab('login')}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header Appbar */}
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

        {/* View Router */}
        <main className="flex-1 overflow-y-auto">
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
        </main>
      </div>
    </div>
  );
}
