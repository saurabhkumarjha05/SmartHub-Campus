<div align="center">
   
# Smart Campus Hub🎓

> **Pure Frontend University SaaS Platform & Academic Management Ecosystem**
> Built for students, research scholars, and faculty with integrated AI Study Assistant, Digital Canteen Wallet, Central Library E-reader, Geofenced Attendance, and Campus Events. 100% Frontend React + Vite SPA.

---
</div>

## 🌟 Key Features

- 🧠 **Interactive AI Academic Tutor**: Frontend study assistant providing instant exam prep, C++ pseudocode, and algorithm breakdowns for COL331, COL106, COL774, and COL362.
- 📊 **Academic Course & Grade Analytics**: Track course credits, SGPA/CGPA progression, assignment deadlines, and submission statuses.
- 📚 **Central Library & E-Reader**: Digital access to course textbooks, IEEE papers, reservation queue, and instant physical book holds.
- 🍱 **Canteen Wallet & QR Pay**: Pre-order food, top up Kerberos wallet via UPI, manage canteen passes, and track queue wait times.
- 📍 **Geofenced Class Attendance**: Automatic check-ins for lectures, tutorials, and lab sessions with attendance percentage compliance alerts.
- 📅 **Campus Events & Workshops**: Registration for hackathons, guest lectures, cultural fests, and student club activities with digital event passes.
- 🔔 **Campus Notification Hub**: Aggregated alerts for grades, assignments, campus announcements, and wallet transactions.
- 🎨 **Glassmorphic Light & Dark UI**: Sleek dark/light theme switching with HSL color palettes and micro-animations.

---

## 🛠️ Tech Stack

- **Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Glassmorphism Design System
- **Icons & Data Visualization**: Lucide React, Recharts, Framer Motion (`motion/react`)
- **Build Tool**: Vite 6

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/smart-campus-hub.git
   cd smart-campus-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for static site deployment**:
   ```bash
   npm run build
   ```
   Outputs static assets to `dist/`.

---

## 📜 Available Scripts

- `npm run dev`: Launches Vite development server.
- `npm run build`: Bundles static production build into `dist/`.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs TypeScript type checking (`tsc --noEmit`).

---

## 🌐 Static Site Deployment

Deploy the `dist/` directory to any static hosting provider:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **Render**: Select **Static Site**, build command `npm run build`, publish directory `dist`
- **GitHub Pages**: Upload `dist/` or use `gh-pages`

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for details.
