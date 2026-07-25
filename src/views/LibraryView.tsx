import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RecentlyAddedBook {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  rating?: number;
  availableCopies?: number;
}

export const LibraryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Books');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedBooks, setSavedBooks] = useState<string[]>(['bk-1', 'bk-4']);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPod, setSelectedPod] = useState<string>('Quiet Zone A - Pod 4B');
  const [bookingDate, setBookingDate] = useState<string>('Today, 4:00 PM');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const [selectedBookModal, setSelectedBookModal] = useState<RecentlyAddedBook | null>(null);

  // Borrowed books data
  const borrowedBooks = [
    {
      id: 'borrow-1',
      title: 'Advanced Data Structures',
      author: 'by Thomas H. Cormen',
      dueDate: 'DUE IN 3 DAYS',
      badgeClass: 'bg-[#3525cd]/10 text-[#3525cd] dark:bg-indigo-950/60 dark:text-indigo-300',
      progress: 74,
      barColor: '#3525cd',
      returnDate: 'Return by Oct 24, 2023',
    },
    {
      id: 'borrow-2',
      title: 'Design Patterns: Elements...',
      author: 'by Erich Gamma',
      dueDate: 'DUE TODAY',
      badgeClass: 'bg-[#7e3000]/10 text-[#7e3000] dark:bg-amber-900/40 dark:text-amber-300',
      progress: 100,
      barColor: '#4648d4',
      returnDate: 'Return by Oct 21, 2023',
    },
    {
      id: 'borrow-3',
      title: 'Artificial Intelligence: A Modern Approach',
      author: 'by Stuart Russell',
      dueDate: 'DUE IN 12 DAYS',
      badgeClass: 'bg-[#4648d4]/10 text-[#4648d4] dark:bg-indigo-900/40 dark:text-indigo-300',
      progress: 28,
      barColor: '#3525cd',
      returnDate: 'Return by Nov 2, 2023',
    },
  ];

  // Recently added books data
  const recentlyAddedBooks: RecentlyAddedBook[] = [
    {
      id: 'bk-1',
      title: 'Quantum Mechanics',
      author: 'David J. Griffiths',
      category: 'Computer Science',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCdOaTSC9-qX5l1jFxsBGw5OfDMnhF3QARRMRAPhBX0itX4TudPZjyqzUtBxVwNcwM7CbiZM2DmYgxF45Lyj3bH9QAI30QlE5Dl5OOEczWbqAm5kqjPVW6pR6JUTRDNmXAdQEI1qGR9E8rlXzWEl6a8LvCv9eCEA7AD4engXcMhis33yx64v4kvGmVhJi0RRfzLLMI-9j6zqyhGi9MVgJhQ7dM1fP1fNCy36yeVzPX2ulE7KcM2jhhwqhg8HZaRh1-ww7AGHwoFcJgn',
      rating: 4.9,
      availableCopies: 3,
    },
    {
      id: 'bk-2',
      title: 'Urban Design',
      author: 'Jan Gehl',
      category: 'Art',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBlB6KCdU7jRt2-XNZvtkAVtbctvnhLLw-lAbu_IOCvsfvgaSQSQmsQHN5HwOmraioRI7OSzWd3cifyxOdb1-sAzEXKZ3rnVC5Jh0UItsnU8SayrSQ7JmREURvrlfBajrL-INk3xzaaOFUWVgeW64pVSpQH4GL5YFaUjYKe2pUIVG167ebGQ7Wng2RbG5TVnmO69G7nGO1bzU8IJUgx1qK9YOJkj4tYMqAyFRnLM8nfQgPNF0aVT1e6bQUBFTVjsHa7l15IqpESGUeH',
      rating: 4.8,
      availableCopies: 2,
    },
    {
      id: 'bk-3',
      title: 'The Silk Road',
      author: 'Peter Frankopan',
      category: 'History',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAsAIkiLqxi4ZG4lmIAUlYonHbfBoiUX1p8Ece3QCSqHi773FtXCYfUPlp9j6hDzNjahoYsftZyNSdEiqo_BAmI6HDOkOX4qldiq474q0RBRklLXPqg78L9rYIwZ0AYsvOA6hBp64hGUql0t3aReWvbYHSuQ6DTGKXVVsRJD3M6iMuFVbAgbZNA8Sp6uwSKidm9RQWgbQUFweDgEirPft1y3ZUQbszhMEeR8NVbiUQgntYqzPtACzbt_r3PXZcSSfh3cmEHkFjFJc4u',
      rating: 4.7,
      availableCopies: 5,
    },
    {
      id: 'bk-4',
      title: 'Python Algorithms',
      author: 'Magnus Hetland',
      category: 'Computer Science',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8UQtdYmpkBwHVQp_AU458RErTpWs8SBDDzz-wllmpQC5O-4XyxS7jROqcWXIUX00WF7PFhwZtlm-tCLYfNskabO6VfcIXzn0ZUWWnaZPdZDVcuKGp-5ny9kNeMg9mvaIFPY_EVEU7NrJ0x5HVG1y0tdXzcriwZ1YKz_1IW3Z-HLQUo54FhzxQ_fkjJj7FT1KM6PQXyVdcKGgl15qxZ3ucQBix-AAuI4drlW5f7ziaGi3CsPvZCip32QxhHN_5wbG3MTndV4qGUXz',
      rating: 4.9,
      availableCopies: 4,
    },
    {
      id: 'bk-5',
      title: 'Genetics Today',
      author: 'Sarah Richards',
      category: 'Biology',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAVkYY1E-oiKmL3m4q5zfUrFaLhKQTSbyAPgcx38TTcyvCZzzzKZ6IkQZijrKel5Mkm_4K017yFxtjO-VH-Z8_qhCV9fFkHN-0srMIv7S7gZpkcitai-5eYzux_Skvz4Chq6DT33NoLOGYV3idrE4YD9TnN3Tt4B4Sou7p8UDmDxpv01rKmHl5V5Qz5njqyILfBdEywhxB1TFqDe3he7pkh1SHHgcmlI7Fw-4MOsmG0gunpgp-4YZ6Y8DmMi9x5ddN4JEQDl-Fg1ygm',
      rating: 4.6,
      availableCopies: 1,
    },
    {
      id: 'bk-6',
      title: 'Modern Ethics',
      author: 'Michael J. Sandel',
      category: 'Philosophy',
      coverImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB8MWGjYfZIQotZnB7keBEMvmC-yHDXnCzkupF_AJz1-c6Y6Fl2ciGocOJnx8p1tqtIj0ph2mtDv8giFQlY8XXBurj_wuqWdg9QUzINaKigMm2TmLvuNqs2mVswFIcWIXR7xf8IAIpKPnODfRAdDW9XLawjKxmhyqYZ11GUW-thxX5ppuyIwYCg-8NROcSj3hYQ2MmZ9RY8xhX159r43oZv_WHnKWa1gIBMoS1-0EK80ZcsGgvOSGywbS1-89FgSIteo8_ZFxmJ3gRx',
      rating: 4.8,
      availableCopies: 6,
    },
  ];

  // Activity chart data
  const activityData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 4.8 },
    { day: 'Thu', hours: 5.5 },
    { day: 'Fri', hours: 3.2 },
    { day: 'Sat', hours: 2.5 },
    { day: 'Sun', hours: 2.8 },
  ];

  const categories = ['All Books', 'Computer Science', 'History', 'Art', 'Biology', 'Philosophy'];

  const filteredBooks = recentlyAddedBooks.filter((book) => {
    const matchesCat =
      selectedCategory === 'All Books' || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedBooks.includes(id)) {
      setSavedBooks((prev) => prev.filter((item) => item !== id));
    } else {
      setSavedBooks((prev) => [...prev, id]);
    }
  };

  const handleBookStudyRoom = () => {
    setBookingSuccess(`Room ${selectedPod} confirmed for ${bookingDate}! QR ticket sent to notifications.`);
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingSuccess(null);
    }, 2500);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-10 relative pb-24">
      {/* SECTION 1: BORROWED BOOKS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-[#1b1b24] dark:text-white tracking-tight">
            Borrowed Books
          </h3>
          <button className="text-[#3525cd] dark:text-[#818cf8] font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer">
            <span>View All</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {borrowedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white/70 dark:bg-[#232330]/80 backdrop-blur-md p-6 rounded-[24px] border border-[#e2e8f0] dark:border-gray-800 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${book.badgeClass}`}
                  >
                    {book.dueDate}
                  </span>
                  <button
                    onClick={() => alert(`Options for "${book.title}": Renewed online until next month!`)}
                    className="text-[#777587] dark:text-gray-400 hover:text-[#1b1b24] dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">more_vert</span>
                  </button>
                </div>
                <h4 className="font-bold text-base text-[#1b1b24] dark:text-white mb-1 leading-snug">
                  {book.title}
                </h4>
                <p className="text-[#777587] dark:text-gray-400 text-xs mb-4">{book.author}</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-semibold text-[#464555] dark:text-gray-300">
                  <span>Reading Progress</span>
                  <span className="font-bold text-[#3525cd] dark:text-indigo-300">{book.progress}%</span>
                </div>
                <div className="w-full h-2 bg-[#e4e1ee] dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${book.progress}%`, backgroundColor: book.barColor }}
                  />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#777587] dark:text-gray-400 pt-1 font-medium">
                  <span className="material-symbols-outlined text-sm text-[#3525cd]">event</span>
                  <span>{book.returnDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: SEARCH & RECENTLY ADDED BOOKS */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#777587] text-lg pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books, journals, or researchers..."
              className="w-full bg-[#f5f2ff] dark:bg-gray-800 border border-[#c7c4d8]/60 dark:border-gray-700 rounded-full py-3.5 pl-12 pr-4 text-sm text-[#1b1b24] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3525cd] transition-all placeholder-[#777587]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            )}
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#3525cd] text-white shadow-sm'
                    : 'bg-white dark:bg-[#232330] text-[#464555] dark:text-gray-300 border border-[#c7c4d8]/50 dark:border-gray-800 hover:bg-[#f0ecf9] dark:hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Recently Added Books */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-[#1b1b24] dark:text-white tracking-tight">
              Recently Added Books
            </h3>
            <span className="text-xs font-semibold text-[#777587]">
              Showing {filteredBooks.length} items
            </span>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#232330] rounded-3xl border border-dashed border-[#c7c4d8]">
              <span className="material-symbols-outlined text-4xl text-[#777587] mb-2">search_off</span>
              <p className="font-bold text-base text-[#1b1b24] dark:text-white">No matching books found</p>
              <p className="text-xs text-[#777587] mt-1">Try resetting search query or selecting &quot;All Books&quot;.</p>
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x">
              {filteredBooks.map((book) => {
                const isSaved = savedBooks.includes(book.id);
                return (
                  <div
                    key={book.id}
                    onClick={() => setSelectedBookModal(book)}
                    className="flex-none w-48 snap-start group cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-md mb-3 transform group-hover:scale-105 transition-transform duration-300 bg-gray-100 dark:bg-gray-800">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          onClick={(e) => toggleBookmark(book.id, e)}
                          className={`p-3 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer ${
                            isSaved ? 'bg-[#3525cd] text-white' : 'bg-white text-[#1b1b24]'
                          }`}
                          title={isSaved ? 'Saved to Bookshelf' : 'Save to Bookshelf'}
                        >
                          <span className="material-symbols-outlined text-lg">
                            {isSaved ? 'bookmark_added' : 'bookmark_add'}
                          </span>
                        </button>
                      </div>
                    </div>
                    <p className="font-bold text-sm text-[#1b1b24] dark:text-white truncate">
                      {book.title}
                    </p>
                    <p className="text-xs text-[#777587] dark:text-gray-400 truncate mt-0.5">
                      {book.author}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: LIBRARY ACTIVITY & SUMMARY STATS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart Card */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-[#232330]/90 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-[#e2e8f0] dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#1b1b24] dark:text-white tracking-tight">
                Library Activity
              </h3>
              <p className="text-xs text-[#777587] dark:text-gray-400 mt-1">
                Study hours in the library over the last week
              </p>
            </div>
            <div className="bg-[#f0ecf9] dark:bg-indigo-950/60 px-4 py-2 rounded-xl border border-[#c7c4d8]/40">
              <span className="font-extrabold text-xs text-[#3525cd] dark:text-indigo-300">
                Avg 4.2h / Day
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <XAxis dataKey="day" stroke="#777587" fontSize={12} tickLine={false} />
                <YAxis domain={[0, 8]} stroke="#777587" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1b1b24',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: 'none',
                    padding: '8px 12px',
                  }}
                  formatter={(val: number) => [`${val} Hours`, 'Study Time']}
                />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {activityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.day === 'Tue' ? '#3525cd' : '#4648d4'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Hours Summary Card */}
        <div className="bg-white/80 dark:bg-[#232330]/90 backdrop-blur-md p-6 sm:p-8 rounded-[24px] border border-[#e2e8f0] dark:border-gray-800 shadow-sm flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-16 h-16 bg-[#e1e0ff] dark:bg-indigo-950 text-[#3525cd] dark:text-indigo-300 flex items-center justify-center rounded-full shadow-inner">
            <span className="material-symbols-outlined text-3xl">timer</span>
          </div>

          <div>
            <h4 className="text-3xl font-black text-[#1b1b24] dark:text-white tracking-tight">
              28.5 Hours
            </h4>
            <p className="text-xs text-[#777587] dark:text-gray-400 mt-1 font-medium">
              Total study time this week
            </p>
          </div>

          <div className="w-full space-y-3 text-left pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#777587] dark:text-gray-400 font-medium">Most Visited Area</span>
              <span className="font-bold text-[#1b1b24] dark:text-white">Quiet Zone A</span>
            </div>
            <div className="w-full h-px bg-[#c7c4d8]/30 dark:bg-gray-800" />

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#777587] dark:text-gray-400 font-medium">Busiest Day</span>
              <span className="font-bold text-[#1b1b24] dark:text-white">Tuesday</span>
            </div>
            <div className="w-full h-px bg-[#c7c4d8]/30 dark:bg-gray-800" />

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#777587] dark:text-gray-400 font-medium">Sessions</span>
              <span className="font-bold text-[#1b1b24] dark:text-white">12 Sessions</span>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <button
        onClick={() => setIsBookingModalOpen(true)}
        className="fixed bottom-8 right-8 bg-[#3525cd] hover:bg-[#4648d4] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all z-40 flex items-center gap-3 cursor-pointer group"
      >
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
        <span className="font-bold text-sm tracking-wide">Book Study Room</span>
      </button>

      {/* BOOK STUDY ROOM MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#232330] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#c7c4d8]/40 dark:border-gray-800 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-[#f0ecf9] text-[#3525cd]">
                  <span className="material-symbols-outlined text-xl">meeting_room</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#1b1b24] dark:text-white">
                    Book Study Room
                  </h3>
                  <p className="text-xs text-[#777587]">Campus Science & Tech Library</p>
                </div>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-start gap-2">
                <span className="material-symbols-outlined text-lg text-emerald-600">check_circle</span>
                <span>{bookingSuccess}</span>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#464555] dark:text-gray-300">
                    Select Study Pod / Room
                  </label>
                  {[
                    'Quiet Zone A - Pod 4B (4 Seats • Whiteboard)',
                    'Tech Lab - Pod 2A (6 Seats • Dual Displays)',
                    'Media Room 1 (Quiet Audio Booth)',
                  ].map((pod) => (
                    <button
                      key={pod}
                      onClick={() => setSelectedPod(pod)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        selectedPod === pod
                          ? 'border-[#3525cd] bg-[#f0ecf9] text-[#3525cd] dark:bg-indigo-950 dark:text-indigo-200 font-bold'
                          : 'border-[#c7c4d8]/40 text-[#464555] hover:border-[#3525cd]'
                      }`}
                    >
                      {pod}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#464555] dark:text-gray-300">
                    Time Slot
                  </label>
                  <select
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-[#c7c4d8]/60 bg-white dark:bg-gray-800 text-xs font-bold text-[#1b1b24] dark:text-white"
                  >
                    <option value="Today, 4:00 PM - 6:00 PM">Today, 4:00 PM - 6:00 PM</option>
                    <option value="Today, 6:00 PM - 8:00 PM">Today, 6:00 PM - 8:00 PM</option>
                    <option value="Tomorrow, 10:00 AM - 12:00 PM">Tomorrow, 10:00 AM - 12:00 PM</option>
                    <option value="Tomorrow, 2:00 PM - 4:00 PM">Tomorrow, 2:00 PM - 4:00 PM</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="flex-1 py-3 rounded-2xl border border-gray-200 text-xs font-bold text-[#777587] hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBookStudyRoom}
                    className="flex-1 py-3 rounded-2xl bg-[#3525cd] hover:bg-[#4648d4] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Confirm Pass
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* BOOK DETAILS MODAL */}
      {selectedBookModal && (
        <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#232330] rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#c7c4d8]/40 dark:border-gray-800 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedBookModal.coverImage}
                  alt={selectedBookModal.title}
                  className="w-20 h-28 object-cover rounded-xl shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#3525cd] text-[10px] font-bold">
                    {selectedBookModal.category}
                  </span>
                  <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white mt-1">
                    {selectedBookModal.title}
                  </h3>
                  <p className="text-xs text-[#777587]">{selectedBookModal.author}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs font-bold text-amber-500">
                    <span>★ {selectedBookModal.rating}</span>
                    <span className="text-[#777587] font-medium">
                      ({selectedBookModal.availableCopies} Copies Available)
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedBookModal(null)}
                className="p-1 rounded-xl text-gray-400 hover:bg-gray-100"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  alert(`Digital E-Book access granted for "${selectedBookModal.title}". E-reader launching!`);
                  setSelectedBookModal(null);
                }}
                className="w-full py-3 rounded-2xl bg-[#3525cd] text-white font-bold text-xs hover:bg-[#4648d4] shadow-sm cursor-pointer"
              >
                Read Digital E-Book (Instant Access)
              </button>
              <button
                onClick={() => {
                  alert(`Hold placed for physical copy of "${selectedBookModal.title}". Pick up at Science Quad Library counter!`);
                  setSelectedBookModal(null);
                }}
                className="w-full py-3 rounded-2xl border border-[#3525cd] text-[#3525cd] dark:text-indigo-300 font-bold text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer"
              >
                Reserve Physical Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
