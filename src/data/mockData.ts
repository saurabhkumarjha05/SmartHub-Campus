import { Task, CampusNotification, UserProfile, CourseGrade, SemesterHistory, ThemeSettings, StudyMilestone } from '../types';

export const initialTasks: Task[] = [
  // TO DO
  {
    id: 'task-1',
    title: 'COL331 Operating Systems Process Scheduler',
    courseCode: 'COL331',
    courseColor: 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-300',
    description: 'Implement a multi-level feedback queue CPU scheduler in C++ with kernel context switching benchmarks.',
    dueDate: 'Tomorrow, 11:59 PM',
    dueTimestamp: Date.now() + 86400000,
    priority: 'High',
    status: 'todo',
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
      { name: 'Ananya Gupta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 3,
    commentsCount: 5,
  },
  {
    id: 'task-2',
    title: 'COL106 Data Structures & Algorithms Lab 4',
    courseCode: 'COL106',
    courseColor: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300',
    description: 'Complete AVL Tree self-balancing implementation and amortized complexity analysis.',
    dueDate: 'Oct 28, 5:00 PM',
    dueTimestamp: Date.now() + 172800000,
    priority: 'Medium',
    status: 'todo',
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 1,
    commentsCount: 2,
  },
  {
    id: 'task-3',
    title: 'COL334 Computer Networks Socket Programming',
    courseCode: 'COL334',
    courseColor: 'bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-950/50 dark:text-teal-300',
    description: 'Build a multi-client TCP chat server with custom packet parsing and drop rate simulation.',
    dueDate: 'Oct 29, 11:59 PM',
    dueTimestamp: Date.now() + 259200000,
    priority: 'Low',
    status: 'todo',
    assignees: [
      { name: 'Rohan Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 4,
    commentsCount: 1,
  },
  {
    id: 'task-4',
    title: 'COL362 DBMS Query Optimization Assignment',
    courseCode: 'COL362',
    courseColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300',
    description: 'B+ Tree indexing benchmarking and relational algebra query tree optimization.',
    dueDate: 'Nov 02, 11:59 PM',
    dueTimestamp: Date.now() + 518400000,
    priority: 'Medium',
    status: 'todo',
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
      { name: 'Ananya Gupta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' }
    ],
    attachmentsCount: 2,
    commentsCount: 0,
  },

  // IN PROGRESS
  {
    id: 'task-5',
    title: 'COL774 Machine Learning PyTorch ResNet Milestone',
    courseCode: 'COL774',
    courseColor: 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-300',
    description: 'Train PyTorch residual network on CIFAR-100 dataset using IIT Delhi High Performance Computing cluster.',
    dueDate: 'Today, 8:00 PM',
    dueTimestamp: Date.now() + 18000000,
    priority: 'High',
    status: 'in_progress',
    progress: 82,
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
      { name: 'Aditya Roy', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    statusNote: 'HPC Epoch 24/30 Running',
    attachmentsCount: 5,
    commentsCount: 8,
  },
  {
    id: 'task-6',
    title: 'COL190 Discrete Mathematics Graph Theory Problem Set',
    courseCode: 'COL190',
    courseColor: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300',
    description: 'Eulerian and Hamiltonian cycle proofs and planar graph chromatic polynomial evaluations.',
    dueDate: 'Oct 30, 2:00 PM',
    dueTimestamp: Date.now() + 345600000,
    priority: 'Medium',
    status: 'in_progress',
    progress: 55,
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    statusNote: '4 of 7 Proofs Completed',
    attachmentsCount: 2,
    commentsCount: 3,
  },

  // REVIEW
  {
    id: 'task-7',
    title: 'COL351 Algorithms Dynamic Programming Project',
    courseCode: 'COL351',
    courseColor: 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-300',
    description: 'Shortest path algorithm efficiency benchmarks on Delhi Metro network graph dataset.',
    dueDate: 'Submitted Oct 24',
    dueTimestamp: Date.now() - 86400000,
    priority: 'High',
    status: 'review',
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    statusNote: 'Awaiting TA Evaluation',
    attachmentsCount: 6,
    commentsCount: 12,
  },
  {
    id: 'task-8',
    title: 'Compiler Design Syntax Tree Generator',
    courseCode: 'COL728',
    courseColor: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300',
    description: 'Flex and Bison scanner-parser generator for C-subset language grammar.',
    dueDate: 'Submitted Oct 23',
    dueTimestamp: Date.now() - 172800000,
    priority: 'Low',
    status: 'review',
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
      { name: 'Rohan Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    statusNote: 'Under Professor Audit',
    attachmentsCount: 2,
    commentsCount: 4,
  },

  // COMPLETED
  {
    id: 'task-9',
    title: 'B.Tech Project (BTP) Proposal - GenAI for Healthcare',
    courseCode: 'COD485',
    courseColor: 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-300',
    description: 'Literature review & architecture proposal submitted to Innovation Centre Committee.',
    dueDate: 'Oct 20, 2024',
    dueTimestamp: Date.now() - 432000000,
    priority: 'High',
    status: 'completed',
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    statusNote: 'Approved (Grade: A)',
    attachmentsCount: 3,
    commentsCount: 2,
  },
  {
    id: 'task-10',
    title: 'Computer Centre Orientation & HPC Access Quiz',
    courseCode: 'COL100',
    courseColor: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300',
    description: 'Cluster submission rules & SSH key authentication setup quiz.',
    dueDate: 'Oct 18, 2024',
    dueTimestamp: Date.now() - 604800000,
    priority: 'Medium',
    status: 'completed',
    assignees: [
      { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    statusNote: 'Graded: 100/100',
    attachmentsCount: 1,
    commentsCount: 1,
  }
];

export const initialNotifications: CampusNotification[] = [
  {
    id: 'notif-1',
    title: 'Grade Posted: COL331 Operating Systems',
    message: 'Prof. Sorav Bansal published the grades for Process Scheduler Assignment. You scored 98/100 (A Grade).',
    timeAgo: '10 mins ago',
    dateGroup: 'Today',
    category: 'Academic',
    isUnread: true,
    icon: 'grade',
    actionButtons: [
      { label: 'View Grade', primary: true, action: 'view_grade' },
      { label: 'Dismiss', primary: false, action: 'dismiss' }
    ]
  },
  {
    id: 'notif-2',
    title: 'Tryst IIT Delhi Hackathon Invite',
    message: 'Ananya Gupta invited you to join team "IndusCoders" for Tryst 2025 GenAI Hackathon.',
    timeAgo: '2 hours ago',
    dateGroup: 'Today',
    category: 'Social',
    isUnread: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    actionButtons: [
      { label: 'Accept Invite', primary: true, action: 'accept' },
      { label: 'Decline', primary: false, action: 'decline' }
    ]
  },
  {
    id: 'notif-3',
    title: 'Central Library Pod Reserved',
    message: 'Study Pod 4B in Central Library Reading Hall is reserved today from 4:00 PM to 7:00 PM.',
    timeAgo: '4 hours ago',
    dateGroup: 'Today',
    category: 'Campus',
    isUnread: true,
    icon: 'local_library',
    actionButtons: [
      { label: 'View Pass', primary: true, action: 'view_pass' }
    ]
  },
  {
    id: 'notif-4',
    title: 'Staff Canteen Combo Offer',
    message: 'Staff Canteen is offering Masala Dosa + Filter Coffee combo at ₹80 with Student ID 2024CS1025.',
    timeAgo: '6 hours ago',
    dateGroup: 'Today',
    category: 'Campus',
    isUnread: true,
    icon: 'restaurant',
    actionButtons: [
      { label: 'Order Canteen', primary: true, action: 'view_menu' }
    ]
  },
  {
    id: 'notif-5',
    title: 'T&P Placement Cell Update',
    message: 'Training & Placement Cell (T&P) opened registration for Summer Internship 2025 Drives.',
    timeAgo: 'Yesterday, 6:30 PM',
    dateGroup: 'Yesterday',
    category: 'Campus',
    isUnread: false,
    icon: 'work',
    actionButtons: [
      { label: 'Apply Now', primary: true, action: 'register' }
    ]
  },
  {
    id: 'notif-6',
    title: 'Central Library Book Due Notice',
    message: '"Introduction to Algorithms by Cormen" is due in 2 days. Renew online via Digital Library.',
    timeAgo: 'Yesterday, 2:15 PM',
    dateGroup: 'Yesterday',
    category: 'Academic',
    isUnread: false,
    icon: 'auto_stories',
    actionButtons: [
      { label: 'Renew Book', primary: true, action: 'renew' }
    ]
  }
];

export const initialUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Priya Sharma',
  preferredName: 'Priya',
  email: 'priya.sharma@iitd.ac.in',
  studentId: '2024CS1025',
  major: 'Computer Science & Engineering',
  degree: 'B.Tech Computer Science & Engineering',
  year: '5th Semester (3rd Year)',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_-e6ftvVbBb1LJ2Nc_69K3miIYlza8bCuomaIJFRByqPYk5uET_OKC_wIHOJEFD7_TE4dT3jzS3dr07910ZSxHGruTot-4cGG0a775k8xkWvlaWheGRrmIPYxybS6f4WKGp4IgcIPkot2HAW6iQxxAvVgRekNqIm6irepWh3xmfasHNXb3GtWUYGxwxItHT5ealXv0_yrRKtTgTJmGualaKTHg1yftB4fWhR3s7AqTsEc2PKOk7xWDIVR3W0HkXDmAsvaJNhYKguE',
  gpa: 9.42,
  topPercentile: 'Top 3% in CSE Dept',
  creditsEarned: 118,
  totalCreditsRequired: 145,
  location: 'New Delhi, India • Karakoram Hostel, Room 302',
  joinedYear: 'July 2023',
  skills: [
    'Data Structures & Algo',
    'C++',
    'Python',
    'PyTorch & GenAI',
    'Operating Systems',
    'DBMS & SQL',
    'System Design',
    'React & TypeScript'
  ],
  achievements: [
    {
      title: "Dean's List of Academic Excellence",
      subtitle: 'Maintained CGPA > 9.25 across all 4 previous semesters at IIT Delhi',
      date: 'Spring 2024',
      icon: 'workspace_premium'
    },
    {
      title: 'Tryst IIT Delhi Hackathon Winner',
      subtitle: '1st Place in GenAI Track for building Indic multi-lingual study assistant',
      date: 'March 2024',
      icon: 'emoji_events'
    },
    {
      title: 'ACM ICPC Regional Candidate',
      subtitle: 'Ranked in top 15 teams at IIT Delhi Competitive Programming League',
      date: 'Winter 2023',
      icon: 'psychology'
    }
  ]
};

export const initialGrades: CourseGrade[] = [
  { code: 'COL331', name: 'Operating Systems & System Programming', credits: 4, grade: 'A', score: 95, instructor: 'Prof. Sorav Bansal', semester: '5th Sem (2025-26)', status: 'In Progress' },
  { code: 'COL106', name: 'Data Structures & Algorithms', credits: 5, grade: 'A', score: 98, instructor: 'Prof. Subodh Kumar', semester: '4th Sem (2024-25)', status: 'Completed' },
  { code: 'COL334', name: 'Computer Networks', credits: 4, grade: 'A-', score: 91, instructor: 'Prof. Huzur Saran', semester: '5th Sem (2025-26)', status: 'In Progress' },
  { code: 'COL362', name: 'Database Management Systems', credits: 4, grade: 'A', score: 97, instructor: 'Prof. Maya Ramanath', semester: '4th Sem (2024-25)', status: 'Completed' },
  { code: 'COL774', name: 'Machine Learning & Neural Nets', credits: 4, grade: 'A+', score: 99, instructor: 'Prof. Mausam', semester: '5th Sem (2025-26)', status: 'In Progress' },
  { code: 'COL351', name: 'Analysis & Design of Algorithms', credits: 4, grade: 'A', score: 96, instructor: 'Prof. Sandeep Sen', semester: '3rd Sem (2023-24)', status: 'Completed' }
];

export const initialSemesterHistory: SemesterHistory[] = [
  { term: 'Semester 4 (Spring 2025)', gpa: 9.60, credits: 20, status: 'Completed' },
  { term: 'Semester 3 (Fall 2024)', gpa: 9.40, credits: 22, status: 'Completed' },
  { term: 'Semester 2 (Spring 2024)', gpa: 9.35, credits: 21, status: 'Completed' },
  { term: 'Semester 1 (Fall 2023)', gpa: 9.30, credits: 19, status: 'Completed' },
  { term: 'Semester 5 (Fall 2025)', gpa: 9.42, credits: 20, status: 'In Progress' }
];

export const initialThemeSettings: ThemeSettings = {
  themeMode: 'light',
  accentColor: '#3525cd',
  fontSizeScale: 100,
  widgets: {
    classSchedule: true,
    canteenMenu: true,
    gradeAnalytics: true,
    recentMessages: true
  }
};

export const initialMilestones: StudyMilestone[] = [
  { id: 'm-1', title: 'Review COL331 Operating Systems context switching logic', completed: true, dueDate: 'Today' },
  { id: 'm-2', title: 'Solve 5 Dynamic Programming problems on CodeChef / LeetCode', completed: true, dueDate: 'Today' },
  { id: 'm-3', title: 'Complete COL774 Machine Learning PyTorch ResNet training', completed: false, dueDate: 'Tomorrow' },
  { id: 'm-4', title: 'Read Chapter 6 on B+ Tree Indexing for COL362 DBMS', completed: false, dueDate: 'Oct 29' },
  { id: 'm-5', title: 'Solve COL106 Data Structures Minor 2 past year paper', completed: false, dueDate: 'Oct 31' }
];
