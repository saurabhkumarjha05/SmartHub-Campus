import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';
import { motion } from 'motion/react';

interface AssignmentsViewProps {
  tasks: Task[];
  onAddTask: (newTask: Omit<Task, 'id'>) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  searchQuery: string;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  tasks,
  onAddTask,
  onUpdateTaskStatus,
  onDeleteTask,
  searchQuery,
}) => {
  const [viewMode, setViewMode] = useState<'board' | 'list' | 'calendar'>('board');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('COL331');
  const [newPriority, setNewPriority] = useState<TaskPriority>('High');
  const [newDueDate, setNewDueDate] = useState('Tomorrow, 11:59 PM');
  const [newDescription, setNewDescription] = useState('');

  // Filter tasks based on searchQuery & priority
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || t.priority.toLowerCase() === filterPriority.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  const columns: { id: TaskStatus; label: string; icon: string; headerColor: string }[] = [
    { id: 'todo', label: 'TO DO', icon: 'pending_actions', headerColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10' },
    { id: 'in_progress', label: 'IN PROGRESS', icon: 'hourglass_top', headerColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10' },
    { id: 'review', label: 'REVIEW', icon: 'rate_review', headerColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10' },
    { id: 'completed', label: 'COMPLETED', icon: 'check_circle', headerColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle,
      courseCode: newCourseCode,
      courseColor:
        newCourseCode === 'COL331'
          ? 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-300'
          : newCourseCode === 'COL106'
          ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300'
          : 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300',
      description: newDescription || 'Standard academic assignment requirement for IIT Delhi.',
      dueDate: newDueDate,
      dueTimestamp: Date.now() + 86400000,
      priority: newPriority,
      status: 'todo',
      assignees: [
        { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
      ],
      attachmentsCount: 1,
      commentsCount: 0,
    });

    setNewTitle('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300';
      case 'Low':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* View Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#232330] p-4 rounded-2xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-xs">
        {/* Left: View Mode Toggles */}
        <div className="flex items-center gap-1.5 bg-[#f0ecf9] dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('board')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'board'
                ? 'bg-white dark:bg-[#1b1b24] text-[#3525cd] dark:text-indigo-400 shadow-xs'
                : 'text-[#777587] hover:text-[#1b1b24] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">view_kanban</span>
            <span>Board View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white dark:bg-[#1b1b24] text-[#3525cd] dark:text-indigo-400 shadow-xs'
                : 'text-[#777587] hover:text-[#1b1b24] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">format_list_bulleted</span>
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'calendar'
                ? 'bg-white dark:bg-[#1b1b24] text-[#3525cd] dark:text-indigo-400 shadow-xs'
                : 'text-[#777587] hover:text-[#1b1b24] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Calendar</span>
          </button>
        </div>

        {/* Right: Priority Filters & Add Task */}
        <div className="flex items-center gap-3">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8]/50 text-xs text-[#1b1b24] dark:text-white focus:outline-none font-semibold"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#4648d4] text-white font-extrabold text-xs shadow-md shadow-[#3525cd]/20 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* BOARD VIEW */}
      {viewMode === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="bg-[#f5f2ff]/60 dark:bg-[#232330]/60 p-3.5 rounded-2xl border border-[#c7c4d8]/30 dark:border-gray-800 flex flex-col gap-3 min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-1 pb-2 border-b border-[#c7c4d8]/30 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className={`p-1.5 rounded-lg ${col.headerColor}`}>
                      <span className="material-symbols-outlined text-base">{col.icon}</span>
                    </span>
                    <h3 className="text-xs font-extrabold text-[#1b1b24] dark:text-white tracking-wider">
                      {col.label}
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 text-[#3525cd] dark:text-indigo-300 border border-[#c7c4d8]/30">
                    {colTasks.length}
                  </span>
                </div>

                {/* Task Cards List */}
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar pr-1">
                  {colTasks.length === 0 ? (
                    <div className="p-6 text-center border-2 border-dashed border-[#c7c4d8]/40 dark:border-gray-800 rounded-xl my-auto">
                      <p className="text-xs text-[#777587] dark:text-gray-500 font-medium">
                        No tasks in {col.label.toLowerCase()}
                      </p>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        whileHover={{ y: -2 }}
                        className="p-4 rounded-xl bg-white dark:bg-[#1b1b24] border border-[#c7c4d8]/40 dark:border-gray-800 shadow-xs hover:shadow-md transition-all group relative"
                      >
                        {/* Course & Priority Header */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${task.courseColor}`}>
                            {task.courseCode}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityBadge(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h4 className="font-extrabold text-sm text-[#1b1b24] dark:text-white mb-1.5 group-hover:text-[#3525cd] dark:group-hover:text-indigo-400 transition-colors leading-snug">
                          {task.title}
                        </h4>
                        <p className="text-xs text-[#777587] dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>

                        {/* Special Status Notes or Progress */}
                        {task.progress !== undefined && (
                          <div className="mb-3 space-y-1">
                            <div className="flex justify-between text-[10px] font-semibold text-[#464555] dark:text-gray-300">
                              <span>{task.statusNote || 'Progress'}</span>
                              <span>{task.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#3525cd] rounded-full"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {task.statusNote && task.progress === undefined && (
                          <div className="mb-3 px-2.5 py-1 rounded-md bg-[#f0ecf9] dark:bg-gray-800 text-[11px] font-semibold text-[#3525cd] dark:text-indigo-300 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">info</span>
                            <span>{task.statusNote}</span>
                          </div>
                        )}

                        {/* Footer Info: Assignees, Attachments, Due Date */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800/80 text-[11px] text-[#777587] dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                              {task.assignees.map((a, i) => (
                                <img
                                  key={i}
                                  src={a.avatar}
                                  alt={a.name}
                                  className="w-5 h-5 rounded-full object-cover border border-white dark:border-gray-800"
                                />
                              ))}
                            </div>
                            {task.attachmentsCount && task.attachmentsCount > 0 && (
                              <span className="flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-xs">attach_file</span>
                                <span>{task.attachmentsCount}</span>
                              </span>
                            )}
                          </div>

                          <span className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                            <span className="material-symbols-outlined text-xs">schedule</span>
                            <span>{task.dueDate}</span>
                          </span>
                        </div>

                        {/* Status Change Quick Selector Menu */}
                        <div className="mt-3 pt-2 border-t border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px]">
                          <span className="text-gray-400 font-medium">Move to:</span>
                          <div className="flex gap-1">
                            {col.id !== 'todo' && (
                              <button
                                onClick={() => onUpdateTaskStatus(task.id, 'todo')}
                                className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-bold cursor-pointer"
                              >
                                To Do
                              </button>
                            )}
                            {col.id !== 'in_progress' && (
                              <button
                                onClick={() => onUpdateTaskStatus(task.id, 'in_progress')}
                                className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold cursor-pointer"
                              >
                                Progress
                              </button>
                            )}
                            {col.id !== 'review' && (
                              <button
                                onClick={() => onUpdateTaskStatus(task.id, 'review')}
                                className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950 hover:bg-purple-100 text-purple-700 dark:text-purple-300 font-bold cursor-pointer"
                              >
                                Review
                              </button>
                            )}
                            {col.id !== 'completed' && (
                              <button
                                onClick={() => onUpdateTaskStatus(task.id, 'completed')}
                                className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-bold cursor-pointer"
                              >
                                Done
                              </button>
                            )}
                            <button
                              onClick={() => onDeleteTask(task.id)}
                              className="px-1 py-0.5 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 cursor-pointer"
                              title="Delete task"
                            >
                              <span className="material-symbols-outlined text-xs">delete</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white dark:bg-[#232330] rounded-2xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f0ecf9] dark:bg-gray-800 text-[#464555] dark:text-gray-300 font-extrabold uppercase tracking-wider border-b border-[#c7c4d8]/40">
                <tr>
                  <th className="p-4">Assignment Title</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-sm text-[#1b1b24] dark:text-white">{t.title}</p>
                      <p className="text-[#777587] dark:text-gray-400 text-[11px] line-clamp-1">{t.description}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md font-bold text-[10px] border ${t.courseColor}`}>
                        {t.courseCode}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${getPriorityBadge(t.priority)}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={t.status}
                        onChange={(e) => onUpdateTaskStatus(t.id, e.target.value as TaskStatus)}
                        className="px-2.5 py-1 rounded-lg bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8]/50 text-xs text-[#1b1b24] dark:text-white font-semibold cursor-pointer"
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="p-4 font-semibold text-gray-600 dark:text-gray-300">
                      {t.dueDate}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDeleteTask(t.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CALENDAR VIEW PREVIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white dark:bg-[#232330] p-6 rounded-2xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
              October / November 2025 Deadlines
            </h3>
            <span className="text-xs text-[#3525cd] dark:text-indigo-400 font-bold">
              {filteredTasks.length} Assignments Scheduled
            </span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#777587] mb-2">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-xs">
            {Array.from({ length: 31 }).map((_, i) => {
              const dayNum = i + 1;
              const hasTask = dayNum === 24 || dayNum === 28 || dayNum === 29 || dayNum === 30;
              return (
                <div
                  key={i}
                  className={`min-h-[80px] p-2 rounded-xl border flex flex-col justify-between ${
                    dayNum === 28
                      ? 'bg-[#3525cd]/10 border-[#3525cd]'
                      : 'bg-[#fcf8ff] dark:bg-gray-800/40 border-gray-100 dark:border-gray-800'
                  }`}
                >
                  <span className="font-bold text-[#1b1b24] dark:text-white">{dayNum}</span>
                  {hasTask && (
                    <span className="text-[10px] p-1 rounded bg-[#3525cd] text-white font-bold truncate">
                      Task due
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ADD TASK MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#232330] rounded-3xl p-6 border border-[#c7c4d8]/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
                Create New Assignment
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. COL331 Kernel Thread Synchronization"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none focus:border-[#3525cd]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                    Course Code
                  </label>
                  <select
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white font-semibold"
                  >
                    <option value="COL331">COL331 - OS</option>
                    <option value="COL106">COL106 - DSA</option>
                    <option value="COL334">COL334 - Networks</option>
                    <option value="COL362">COL362 - DBMS</option>
                    <option value="COL774">COL774 - ML</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white font-semibold"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                  Due Date Text
                </label>
                <input
                  type="text"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="e.g. Tomorrow, 11:59 PM"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none focus:border-[#3525cd]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#464555] dark:text-gray-300 mb-1">
                  Task Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Outline requirements or notes..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] text-xs text-[#1b1b24] dark:text-white focus:outline-none focus:border-[#3525cd]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#3525cd] hover:bg-[#4648d4] text-xs font-bold text-white shadow-md shadow-[#3525cd]/20 cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
