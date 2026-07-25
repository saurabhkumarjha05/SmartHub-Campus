import React, { useState } from 'react';
import { useToast } from '../components/ToastContext';

export const EventsView: React.FC = () => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'All' | 'Academic' | 'Social' | 'Career'>('All');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['evt-1']);

  const events = [
    {
      id: 'evt-1',
      title: 'Fall AI & Robotics Hackathon 2024',
      date: 'Nov 02 - Nov 03, 2024',
      time: '09:00 AM EST',
      location: 'Innovation Center • Main Quad',
      category: 'Academic',
      organizer: 'Computer Science Department',
      attendees: 142,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
      description: '48-hour build contest focused on generative models, multi-agent frameworks, and robotics automation. $10,000 in prizes!'
    },
    {
      id: 'evt-2',
      title: 'Global Tech Career & Internship Fair',
      date: 'Nov 12, 2024',
      time: '10:00 AM - 04:00 PM EST',
      location: 'Student Union Great Hall',
      category: 'Career',
      organizer: 'IIT Delhi Career Development Center',
      attendees: 310,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
      description: 'Connect with over 45 hiring teams from top software engineering, hardware, and quantitative research firms.'
    },
    {
      id: 'evt-3',
      title: 'Campus Winter Music & Cultural Fest',
      date: 'Nov 18, 2024',
      time: '06:00 PM EST',
      location: 'Outdoor Amphitheater',
      category: 'Social',
      organizer: 'Student Activity Council',
      attendees: 520,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
      description: 'An evening of live indie bands, food trucks, light shows, and student art exhibitions under the stars.'
    },
    {
      id: 'evt-4',
      title: 'Quantum Computing Frontiers Seminar',
      date: 'Nov 24, 2024',
      time: '02:00 PM EST',
      location: 'Science Auditorium B',
      category: 'Academic',
      organizer: 'Physics & CS Faculty',
      attendees: 88,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
      description: 'Keynotes from guest researchers on fault-tolerant qubits and quantum algorithm optimization.'
    },
  ];

  const filteredEvents = filter === 'All' ? events : events.filter(e => e.category === filter);

  const toggleRegister = (id: string, title: string) => {
    if (registeredEvents.includes(id)) {
      setRegisteredEvents(prev => prev.filter(e => e !== id));
      showToast(`Unregistered from "${title}".`, 'info');
    } else {
      setRegisteredEvents(prev => [...prev, id]);
      showToast(`Pass confirmed for "${title}"! Ticket saved to your notifications.`, 'success');
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#3525cd]/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            Campus Experience
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Campus Events & Hackathons
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1">
            Discover upcoming academic, career, and social gatherings happening across campus.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md text-white font-bold text-xs border border-white/20">
            {registeredEvents.length} Saved Passes
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {(['All', 'Academic', 'Career', 'Social'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
              filter === cat
                ? 'bg-[#3525cd] text-white shadow-md'
                : 'bg-white dark:bg-[#232330] text-[#777587] dark:text-gray-300 border border-[#c7c4d8]/40 dark:border-gray-800 hover:bg-[#f0ecf9]'
            }`}
          >
            {cat} Events
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(evt => {
          const isReg = registeredEvents.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="bg-white dark:bg-[#232330] rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {evt.category}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#777587] dark:text-gray-400 mb-1">
                    <span className="flex items-center gap-1 font-semibold text-[#3525cd] dark:text-indigo-300">
                      <span className="material-symbols-outlined text-sm">event</span>
                      {evt.date}
                    </span>
                    <span>{evt.time}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-[#777587] dark:text-gray-400 mt-1 line-clamp-2">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="text-xs text-[#777587]">
                    <span className="font-bold text-[#1b1b24] dark:text-white">{evt.attendees}</span> Students Going
                  </div>

                  <button
                    onClick={() => toggleRegister(evt.id, evt.title)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      isReg
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-[#3525cd] hover:bg-[#4648d4] text-white shadow-sm'
                    }`}
                  >
                    {isReg ? 'Registered ✓' : 'RSVP / Register'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
