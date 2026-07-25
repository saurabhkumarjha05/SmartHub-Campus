export type NavigationTab = 
  | 'splash'
  | 'login'
  | 'dashboard'
  | 'assignments'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'ai-tutor'
  | 'attendance'
  | 'grades'
  | 'library'
  | 'canteen'
  | 'calendar'
  | 'events';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  courseCode: string; // e.g. CS402, MATH201
  courseColor: string; // Tailwind color class or hex
  description: string;
  dueDate: string;
  dueTimestamp: number;
  priority: TaskPriority;
  status: TaskStatus;
  progress?: number; // percentage 0-100 for in_progress
  assignees: { name: string; avatar: string }[];
  statusNote?: string; // e.g. "Awaiting Peer Review", "Graded: 98/100"
  attachmentsCount?: number;
  commentsCount?: number;
}

export type NotificationCategory = 'Academic' | 'Social' | 'Campus' | 'System';

export interface CampusNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  dateGroup: 'Today' | 'Yesterday' | 'Last Week';
  category: NotificationCategory;
  isUnread: boolean;
  avatar?: string;
  icon?: string;
  actionButtons?: { label: string; primary?: boolean; action: string }[];
}

export interface CourseGrade {
  code: string;
  name: string;
  credits: number;
  grade: string;
  score: number;
  instructor: string;
  semester: string;
  status: 'Completed' | 'In Progress';
}

export interface SemesterHistory {
  term: string;
  gpa: number;
  credits: number;
  status: 'Completed' | 'In Progress';
}

export interface UserProfile {
  id: string;
  name: string;
  preferredName: string;
  email: string;
  studentId: string;
  major: string;
  degree: string;
  year: string;
  avatar: string;
  gpa: number;
  topPercentile: string;
  creditsEarned: number;
  totalCreditsRequired: number;
  location: string;
  joinedYear: string;
  skills: string[];
  achievements: { title: string; subtitle: string; date: string; icon: string }[];
}

export interface ThemeSettings {
  themeMode: 'light' | 'dark' | 'system';
  accentColor: string; // hex
  fontSizeScale: number; // percentage 90 - 120
  widgets: {
    classSchedule: boolean;
    canteenMenu: boolean;
    gradeAnalytics: boolean;
    recentMessages: boolean;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: string;
}

export interface StudyMilestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}
