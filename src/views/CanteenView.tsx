import React, { useState } from 'react';
import { motion } from 'motion/react';

export const CanteenView: React.FC = () => {
  const [balance, setBalance] = useState(450.0);
  const [points, setPoints] = useState(380);
  const [selectedVenue, setSelectedVenue] = useState('All');

  const venues = ['All', 'Staff Canteen', 'SAC Food Court', 'Amul Parlour', 'Nescafe Kiosk', 'Karakoram Mess'];

  const menu = [
    { id: 1, name: 'Special Masala Dosa with Sambhar', category: 'Staff Canteen', price: 65, pts: 15, icon: 'restaurant_menu', rating: '4.8 ★' },
    { id: 2, name: 'Rajma Chawal + Sirka Pyaj Combo', category: 'SAC Food Court', price: 80, pts: 20, icon: 'rice_bowl', rating: '4.9 ★' },
    { id: 3, name: 'North Indian Deluxe Veg Thali', category: 'Staff Canteen', price: 120, pts: 30, icon: 'dinner_dining', rating: '4.9 ★' },
    { id: 4, name: 'Paneer Tikka Roll with Green Chutney', category: 'SAC Food Court', price: 90, pts: 20, icon: 'bakery_dining', rating: '4.7 ★' },
    { id: 5, name: 'Punjabi Chole Bhature (2 Pcs)', category: 'Staff Canteen', price: 85, pts: 20, icon: 'flatware', rating: '4.8 ★' },
    { id: 6, name: 'Crispy Samosa with Mint Chutney', category: 'Nescafe Kiosk', price: 20, pts: 5, icon: 'tapas', rating: '4.6 ★' },
    { id: 7, name: 'Rich Amul Thick Cold Coffee', category: 'Amul Parlour', price: 50, pts: 10, icon: 'local_cafe', rating: '4.9 ★' },
    { id: 8, name: 'Authentic South Indian Filter Coffee', category: 'Staff Canteen', price: 25, pts: 5, icon: 'coffee', rating: '4.8 ★' },
    { id: 9, name: 'Kulhad Masala Chai & Biscuit', category: 'Nescafe Kiosk', price: 15, pts: 5, icon: 'coffee_maker', rating: '4.7 ★' },
    { id: 10, name: 'Sweet Malai Lassi (300ml)', category: 'Amul Parlour', price: 40, pts: 10, icon: 'glass_cup', rating: '4.8 ★' },
    { id: 11, name: 'Special Aloo Paratha with Curd & Butter', category: 'Karakoram Mess', price: 45, pts: 10, icon: 'breakfast_dining', rating: '4.7 ★' },
    { id: 12, name: 'Indore Steamed Poha with Sev', category: 'Karakoram Mess', price: 35, pts: 8, icon: 'rice_bowl', rating: '4.6 ★' },
  ];

  const filteredMenu = selectedVenue === 'All' ? menu : menu.filter(m => m.category === selectedVenue);

  const handleOrder = (item: typeof menu[0]) => {
    if (balance < item.price) {
      alert('Insufficient Canteen Wallet balance! Please top up via Kerberos Pay / UPI.');
      return;
    }
    setBalance((prev) => Number((prev - item.price).toFixed(2)));
    setPoints((prev) => prev + item.pts);
    alert(`Order confirmed for "${item.name}"! Pick up counter at ${item.category} in 8 minutes. Token #IITD-${Math.floor(100 + Math.random() * 900)}`);
  };

  const handleTopUp = (amount: number) => {
    setBalance((prev) => prev + amount);
    alert(`₹${amount} added successfully via Kerberos UPI! New balance: ₹${(balance + amount).toFixed(2)}`);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6 font-sans">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#3525cd] via-[#4648d4] to-[#4f46e5] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-[#3525cd]/20 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider text-amber-200">
            IIT Delhi Kerberos Food Wallet
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2">₹{balance.toFixed(2)} Balance</h2>
          <p className="text-xs text-indigo-100 font-medium">
            Student ID: 2024CS1025 • {points} Campus Reward Points Earned
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTopUp(100)}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-xs transition-all cursor-pointer"
          >
            + ₹100
          </button>
          <button
            onClick={() => handleTopUp(200)}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-xs transition-all cursor-pointer"
          >
            + ₹200
          </button>
          <button
            onClick={() => handleTopUp(500)}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#3525cd] font-extrabold text-xs shadow-md hover:bg-indigo-50 transition-all cursor-pointer"
          >
            + Top Up ₹500
          </button>
        </div>
      </motion.div>

      {/* Venue Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {venues.map((v) => (
          <button
            key={v}
            onClick={() => setSelectedVenue(v)}
            className={`px-4 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
              selectedVenue === v
                ? 'bg-[#3525cd] text-white shadow-md'
                : 'bg-white dark:bg-[#232330] text-[#777587] dark:text-gray-300 border border-[#c7c4d8]/40 dark:border-gray-800 hover:bg-[#f0ecf9]'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Canteen Specials Menu Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#1b1b24] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500">restaurant</span>
            <span>IIT Delhi Canteen Menu & Instant Express Order</span>
          </h3>
          <span className="text-xs text-[#777587] dark:text-gray-400 font-semibold">
            {filteredMenu.length} Options Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenu.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-[#232330] p-5 rounded-3xl border border-[#c7c4d8]/40 dark:border-gray-800 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-amber-600">{item.rating}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#1b1b24] dark:text-white leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#777587] dark:text-gray-400 font-medium">
                    Earn +{item.pts} reward points
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <span className="text-xs text-[#777587] dark:text-gray-400 font-medium">Price</span>
                  <p className="font-black text-lg text-[#3525cd] dark:text-indigo-400">
                    ₹{item.price}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOrder(item)}
                  className="px-4 py-2 rounded-xl bg-[#3525cd] hover:bg-[#4648d4] text-white font-extrabold text-xs shadow-md shadow-[#3525cd]/20 cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">shopping_bag</span>
                  <span>Order Now</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
