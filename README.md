# 🎬 CineTube Frontend – Movie & Series Streaming Platform

A production-ready, modern frontend application for the **CineTube Movie & Series Portal**, built using **Next.js (App Router), TypeScript, and Tailwind CSS**. The platform delivers a smooth, scalable, and high-performance experience for browsing, reviewing, and streaming movies and series.

---

## 🚀 Live Demo

* 🌐 **Frontend:** [https://cinetube-frontend-ten.vercel.app](https://cinetube-frontend-ten.vercel.app)
* 🔌 **Backend API:** [https://cinetube-backend.vercel.app/](https://cinetube-backend.vercel.app/)

---

## 🧑‍💻 Tech Stack

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| Framework      | Next.js (App Router)             |
| Language       | TypeScript                       |
| Styling        | Tailwind CSS                     |
| UI System      | shadcn/ui                        |
| State Handling | Fetch API + Custom Service Layer |
| Authentication | Better Auth (Backend-driven)     |
| Payments       | Stripe Integration               |
| Deployment     | Vercel                           |

---

## 🏗️ Architecture Overview

* **App Router आधारित structure** for scalable routing
* **Server Components** for performance optimization
* **Client Components** for interactive UI (forms, actions)
* **Service Layer abstraction** for API communication
* **Modular folder structure** for maintainability

---

## 📁 Project Structure

```
src/
 ├── app/
 │   ├── (RootLayout)/
 │   │   ├── (auth)/
 │   │   │   ├── login/
 │   │   │   └── register/
 │   │   ├── movies/
 │   │   │   └── [...id]/
 │   │   ├── layout.tsx
 │   │   └── page.tsx
 │   ├── layout.tsx
 │   ├── globals.css
 │
 ├── components/
 │   ├── modules/
 │   │   ├── auth/
 │   │   │   ├── LoginPage/
 │   │   │   └── RegisterPage/
 │   ├── shared/        # Navbar, Footer, Layout UI
 │   └── ui/            # shadcn reusable components
 │
 ├── lib/               # Utility functions & helpers
 ├── providers/         # Context providers (Auth, Theme, etc.)
 ├── services/          # API abstraction layer
```

---

## 🔐 Authentication System

* Backend-driven authentication using **Better Auth**
* Secure **HTTP-only cookie-based sessions**
* Supports:

  * Email/password login & registration
  * OAuth (Google, GitHub)
* Protected routes using layout-level guards

---

## 🎯 Core Features

### 🎬 Movie & Series Browsing

* Browse all available content
* Dynamic routing: `/movies/[id]`
* Optimized server-side data fetching
* Embedded streaming support

### ⭐ Review & Rating System

* Submit reviews with rating (1–10)
* Like / Unlike reviews
* Moderation: Only approved reviews are visible

### 📌 Watchlist System

* Add/remove movies to personal watchlist
* User-specific data handling

### 💳 Payment Integration

* Stripe-powered subscription system
* Unlock premium/protected content

### 👤 User Authentication

* Secure login & registration flow
* Session persistence using cookies

---

## 🧩 UI & Component Strategy

* **Reusable UI system** powered by shadcn
* **Feature-based modular components**
* Separation of:
  * Presentation layer
  * Business logic (services)

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Arpan-Dey-Web/cinetube-frontend.git
cd cinetube-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://cinetube-backend.vercel.app
```

### 4. Run Development Server

```bash
npm run dev
```

App will be available at: `http://localhost:3000`

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Run ESLint
```

---

## 📱 Responsiveness

* Mobile-first design strategy
* Fully responsive across:

  * Mobile
  * Tablet
  * Desktop
* Optimized layouts using Tailwind CSS utilities

---

## 🔗 API Layer

All API interactions are centralized inside `/services`:

* Auth APIs
* Movie APIs
* Review APIs
* Payment APIs

Benefits:

* Clean separation of concerns
* Reusable API logic
* Easier maintenance & scaling

---

## 🚀 Performance Considerations

* Server Components reduce client bundle size
* Optimized data fetching strategy
* Lazy loading where applicable
* Efficient routing with Next.js App Router

---

## 🧪 Future Improvements

* 🔍 Advanced search & filtering
* 🎥 Video player enhancement (custom player)
* 📊 User dashboard (activity, watch history)
* 🌐 Internationalization (i18n)
* ⚡ Caching & performance optimizations

---

## ✨ Author

**Arpan Dey**
Frontend Developer (MERN Stack)

* GitHub: [https://github.com/Arpan-Dey-Web](https://github.com/Arpan-Dey-Web)
* Portfolio: [https://arpandeyweb.vercel.app](https://arpandeyweb.vercel.app)

---

## 💡 Final Notes

This project demonstrates real-world frontend engineering practices including:

* Scalable architecture
* Clean code organization
* API-driven UI development
* Modern Next.js patterns

> Designed for production-grade applications 🚀
