import React, { useState } from 'react';
import { ChatMessage, StudyMilestone } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AiStudyViewProps {
  milestones: StudyMilestone[];
  onToggleMilestone: (id: string) => void;
  onAddMilestone: (title: string) => void;
}

export const AiStudyView: React.FC<AiStudyViewProps> = ({
  milestones,
  onToggleMilestone,
  onAddMilestone,
}) => {
  const [studyMode, setStudyMode] = useState<'Exam Prep' | 'Quick Help' | 'Concept Drill'>('Exam Prep');
  const [selectedTopic, setSelectedTopic] = useState('COL331 Operating Systems & Kernel Threads');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Namaste Priya! I am your IIT Delhi AI Academic Tutor. I have loaded your COL331 Operating Systems, COL106 Data Structures, and COL774 Machine Learning syllabus. How can I assist your prep today?",
      timestamp: '10:00 AM'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newMilestoneText, setNewMilestoneText] = useState('');

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputPrompt('');
    setIsGenerating(true);

    setTimeout(() => {
      let replyText = `Excellent question regarding ${selectedTopic}!`;

      const textLower = textToSend.toLowerCase();

      if (textLower.includes('minor') || textLower.includes('exam') || textLower.includes('question')) {
        replyText = `### 📚 ${selectedTopic} - Exam Prep Breakdown

Here is a high-probability IIT Delhi Minor 2 exam question breakdown:

**Question 1:** *Explain thread control block (TCB) state save/restore operations during kernel preemptive context switches.*

**Solution Summary:**
1. Save CPU general-purpose registers, Program Counter (PC), and Stack Pointer (SP) to the active TCB.
2. Update thread state from \`RUNNING\` to \`READY\` in the kernel scheduler queue.
3. Select next thread via Round-Robin or Multi-Level Feedback Queue (MLFQ).
4. Restore target thread registers and resume execution at saved PC.`;
      } else if (textLower.includes('code') || textLower.includes('tree') || textLower.includes('c++') || textLower.includes('pytorch')) {
        replyText = `### 💻 Code Analysis & Optimization

For **${selectedTopic}**, here is the optimized algorithm:

\`\`\`cpp
// IIT Delhi COL331 / COL106 Sample Implementation
struct ThreadNode {
    int thread_id;
    uintptr_t stack_pointer;
    ThreadState state;
    ThreadNode* next;
};

void yield_cpu(ThreadNode* current, ThreadNode* next_thread) {
    save_context(&current->stack_pointer);
    current->state = READY;
    next_thread->state = RUNNING;
    restore_context(next_thread->stack_pointer);
}
\`\`\`

*Key Takeaway:* Memory alignment and cache locality significantly boost context switch speed!`;
      } else {
        replyText = `Great query, Priya! 

For **${selectedTopic}** under **${studyMode}** mode:

- **Core Concept:** Thread Control Blocks (TCBs) manage process execution state, stack pointers, and privilege rings (Kernel vs. User mode).
- **Exam Tip:** Remember that kernel threads share process address spaces, whereas process context switches invalidate Translation Lookaside Buffer (TLB) caches.

Feel free to ask for a deeper step-by-step breakdown or code snippet!`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 600);
  };

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneText.trim()) return;
    onAddMilestone(newMilestoneText);
    setNewMilestoneText('');
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      {/* Left Study Modes Sidebar (3 Cols) */}
      <div className="lg:col-span-3 space-y-4">
        {/* Mode Selector */}
        <div className="bg-white dark:bg-[#232330] p-4 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-3">
          <h3 className="font-extrabold text-xs text-[#777587] dark:text-gray-400 uppercase tracking-wider px-1">
            IITD Study Mode
          </h3>

          <div className="space-y-1.5">
            {[
              { mode: 'Exam Prep', icon: 'quiz', desc: 'IITD Minor & Major paper prep' },
              { mode: 'Quick Help', icon: 'bolt', desc: 'Instant C++ / PyTorch code debug' },
              { mode: 'Concept Drill', icon: 'psychology', desc: 'Socratic algorithm walkthroughs' },
            ].map((m) => {
              const isActive = studyMode === m.mode;
              return (
                <button
                  key={m.mode}
                  onClick={() => setStudyMode(m.mode as any)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-[#3525cd] text-white shadow-md shadow-[#3525cd]/20'
                      : 'bg-[#f0ecf9]/60 dark:bg-gray-800/60 text-[#1b1b24] dark:text-gray-300 hover:bg-[#eae6f4]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{m.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs leading-none">{m.mode}</h4>
                    <p className={`text-[10px] mt-1 ${isActive ? 'text-indigo-100' : 'text-[#777587] dark:text-gray-400'}`}>
                      {m.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white dark:bg-[#232330] p-4 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-2">
          <h3 className="font-extrabold text-xs text-[#777587] dark:text-gray-400 uppercase tracking-wider px-1">
            Recent Topics
          </h3>
          <div className="space-y-1">
            {[
              'COL331 Operating Systems & Threads',
              'COL106 AVL & Red-Black Trees',
              'COL774 PyTorch ResNet Optimization',
              'COL362 B+ Tree Indexing Queries'
            ].map((topic, i) => (
              <button
                key={i}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  selectedTopic === topic
                    ? 'bg-[#3525cd]/10 text-[#3525cd] dark:text-indigo-300 font-extrabold'
                    : 'text-[#464555] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="material-symbols-outlined text-base">forum</span>
                <span className="truncate">{topic}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Panel (6 Cols) */}
      <div className="lg:col-span-6 bg-white dark:bg-[#232330] rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-[#f0ecf9] dark:bg-gray-800/90 border-b border-[#c7c4d8]/40 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#4f46e5] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-xl">auto_awesome</span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#1b1b24] dark:text-white truncate max-w-[220px]">
                {selectedTopic}
              </h3>
              <p className="text-[10px] text-[#3525cd] dark:text-indigo-300 font-bold">
                Mode: {studyMode} • Gemini AI Engine
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="text-xs font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-2.5 py-1 rounded-lg bg-white dark:bg-gray-700 border cursor-pointer"
          >
            Clear Chat
          </button>
        </div>

        {/* Prompt Shortcuts */}
        <div className="p-2.5 bg-[#f5f2ff]/60 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {[
            { label: '/minor2-prep', prompt: 'Generate 3 past-year Minor 2 conceptual questions for COL331 Operating Systems.' },
            { label: '/code-check', prompt: 'Review my C++ AVL tree balance factor rotation code.' },
            { label: '/summary', prompt: 'Summarize B+ Tree node splitting algorithms in COL362 DBMS.' },
            { label: '/pytorch', prompt: 'Explain hyperparameter tuning techniques for PyTorch CNNs in COL774.' },
          ].map((sc, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(sc.prompt)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 text-[11px] font-bold text-[#3525cd] dark:text-indigo-300 border border-[#c7c4d8]/40 hover:bg-[#3525cd] hover:text-white transition-all whitespace-nowrap cursor-pointer"
            >
              {sc.label}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[#777587] dark:text-gray-400">
                  <span className="font-bold">{m.sender === 'user' ? 'Priya Sharma' : 'IITD AI Tutor'}</span>
                  <span>• {m.timestamp}</span>
                </div>

                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#3525cd] text-white rounded-tr-xs shadow-xs font-medium'
                      : 'bg-[#f0ecf9] dark:bg-gray-800 text-[#1b1b24] dark:text-gray-100 rounded-tl-xs border border-[#c7c4d8]/30 font-medium'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isGenerating && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#f0ecf9] dark:bg-gray-800 text-xs text-[#3525cd] font-semibold animate-pulse w-fit">
              <span className="material-symbols-outlined text-base animate-spin">sync</span>
              <span>Gemini AI is crafting your study solution...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 border-t border-[#c7c4d8]/40 dark:border-gray-800 bg-white dark:bg-[#232330]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask any question regarding COL331, COL106, or COL774..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#f0ecf9] dark:bg-gray-800 border border-[#c7c4d8] dark:border-gray-700 text-xs text-[#1b1b24] dark:text-white focus:outline-none focus:border-[#3525cd]"
            />
            <button
              type="submit"
              disabled={isGenerating || !inputPrompt.trim()}
              className="p-3 rounded-xl bg-[#3525cd] hover:bg-[#4648d4] text-white font-bold disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-[#3525cd]/20"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Readiness & Plan Column (3 Cols) */}
      <div className="lg:col-span-3 space-y-4">
        {/* Readiness Score Card */}
        <div className="bg-gradient-to-br from-[#3525cd] to-[#4648d4] text-white p-5 rounded-3xl shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">
              Exam Readiness Rating
            </span>
            <span className="material-symbols-outlined text-amber-300">verified</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black">94%</h3>
            <span className="text-xs text-indigo-100 font-semibold">On Track for Distinction</span>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/20 text-xs font-medium">
            <div className="flex justify-between">
              <span>COL331 Operating Systems</span>
              <span className="font-bold">96%</span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-[96%]" />
            </div>

            <div className="flex justify-between">
              <span>COL106 Data Structures</span>
              <span className="font-bold">92%</span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full w-[92%]" />
            </div>
          </div>
        </div>

        {/* Study Plan Checklist */}
        <div className="bg-white dark:bg-[#232330] p-4 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm space-y-3">
          <h3 className="font-extrabold text-xs text-[#1b1b24] dark:text-white flex items-center justify-between">
            <span>IITD Study Milestones</span>
            <span className="text-[10px] text-[#3525cd] font-bold">
              {milestones.filter((m) => m.completed).length} / {milestones.length}
            </span>
          </h3>

          <div className="space-y-2">
            {milestones.map((m) => (
              <label
                key={m.id}
                className="flex items-start gap-2 text-xs text-[#464555] dark:text-gray-300 cursor-pointer p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <input
                  type="checkbox"
                  checked={m.completed}
                  onChange={() => onToggleMilestone(m.id)}
                  className="mt-0.5 rounded text-[#3525cd]"
                />
                <span className={m.completed ? 'line-through opacity-60' : 'font-medium'}>
                  {m.title}
                </span>
              </label>
            ))}
          </div>

          {/* Add Milestone form */}
          <form onSubmit={handleAddMilestoneSubmit} className="pt-2 flex items-center gap-1.5">
            <input
              type="text"
              value={newMilestoneText}
              onChange={(e) => setNewMilestoneText(e.target.value)}
              placeholder="+ Add milestone"
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#f0ecf9] dark:bg-gray-800 text-xs border border-[#c7c4d8]/40 text-[#1b1b24] dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 rounded-lg bg-[#3525cd] text-white text-xs font-bold cursor-pointer"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
