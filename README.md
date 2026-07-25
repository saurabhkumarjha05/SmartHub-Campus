<div align="center">
   
# Smart Campus Hub🎓

> **Premier University SaaS Platform & Academic Management Ecosystem**
> Built for students, research scholars, and faculty with integrated AI Study Assistant, Digital Canteen Wallet, Central Library E-reader, Geofenced Attendance, and Campus Events.

---
</div>

## 🌟 Key Features

- 🧠 **AI Academic Tutor & Exam Prep**: Real-time AI study assistant powered by Google Gemini 3.6 Flash for breaking down complex equations, algorithms, and concepts.
- 📊 **Academic Course & Grade Analytics**: Track course credits, SGPA/CGPA progression, assignment deadlines, and submission statuses.
- 📚 **Central Library & E-Reader**: Digital access to course textbooks, IEEE papers, reservation queue, and instant physical book holds.
- 🍱 **Canteen Wallet & QR Pay**: Pre-order food, top up Kerberos wallet via UPI, manage canteen passes, and track queue wait times.
- 📍 **Geofenced Class Attendance**: Automatic check-ins for lectures, tutorials, and lab sessions with attendance percentage compliance alerts.
- 📅 **Campus Events & Workshops**: Registration for hackathons, guest lectures, cultural fests, and student club activities with digital event passes.
- 🔔 **Campus Notification Hub**: Aggregated alerts for grades, assignments, campus announcements, and wallet transactions.
- 🎨 **Sleek Light & Dark Themes**: Glassmorphic UI tailored with modern HSL color palettes and micro-animations.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts, Framer Motion
- **Backend / API**: Node.js, Express, Vite Server SSR Middleware, `@google/genai`
- **Build Tooling**: Vite 6, TSX, ESBuild

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/smart-campus-hub.git
   cd smart-campus-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

4. **Run in development mode**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📜 Available Scripts

- `npm run dev`: Starts the Express server with Vite middleware in development mode.
- `npm run build`: Bundles client assets with Vite and compiles the Express backend server with ESBuild.
- `npm run start`: Executes the production server (`dist/server.cjs`).
- `npm run lint`: Runs TypeScript type checking (`tsc --noEmit`).
- `npm run clean`: Safely removes build output directories (`dist`).

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for details.
