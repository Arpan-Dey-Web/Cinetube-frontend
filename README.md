# 🎬 CineTube Frontend – Movie & Series Streaming Platform

A modern and responsive frontend application for the **CineTube Movie & Series Portal**, built with **Next.js (App Router), TypeScript, and Tailwind CSS**. This application provides a seamless user experience for browsing, reviewing, and streaming movies.

---

## 🚀 Live Links

* 🔗 Frontend Live: [https://cinetube-frontend-ten.vercel.app](https://cinetube-frontend-ten.vercel.app)
* 🔗 Backend API: [https://cinetube-backend.vercel.app/](https://cinetube-backend.vercel.app/)

---

## 🧑‍💻 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **State & Data Fetching:** Fetch / Custom services
* **Authentication:** Better Auth (via backend)
* **Deployment:** Vercel

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
 │   ├── shared/        # Navbar, Footer
 │   └── ui/            # shadcn components
 │
 ├── lib/               # Utility logic
 ├── providers/         # Context providers
 ├── services/          # API calls
```

---

## 🔐 Authentication Flow

* Uses **Better Auth** via backend
* Cookie-based session handling
* Login & Register pages implemented with client components
* OAuth support (Google, GitHub)

---

## 🎯 Core Features

### 🎬 Movie Browsing

* View all movies/series
* Dynamic movie details page (`/movies/[id]`)
* Streaming support via embedded links

### ⭐ Review System

* Add reviews with rating (1–10)
* Like/unlike reviews
* View approved reviews only

### 📌 Watchlist

* Add/remove movies
* Personalized user list

### 💳 Payment Integration

* Stripe-based subscription/payment flow
* Unlock premium content

### 👤 Authentication

* Login/Register pages
* Protected routes

---

## 🧩 UI Architecture

* **Server Components** → Page-level rendering (performance optimized)
* **Client Components** → Forms & interactions (`use client`)
* **Modular structure** → Feature-based separation

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Arpan-Dey-Web/cinetube-frontend.git
cd cinetube-frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

```env
NEXT_PUBLIC_API_URL=https://cinetube-backend.vercel.app
```

---

### 4️⃣ Run development server

```bash
npm run dev
```

---

## 📦 Build & Production

```bash
npm run build
npm start
```

---

## 📜 NPM Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Run production
npm run lint     # Lint code
```

---

## 📱 Responsive Design

* Mobile-first approach
* Fully responsive across devices
* Optimized layouts using Tailwind CSS

---

## 🔗 API Integration

* Centralized API calls inside `/services`
* Handles:

  * Movies
  * Reviews
  * Auth
  * Payments

---

## ✨ Author

**Arpan Dey**

* GitHub: [https://github.com/Arpan-Dey-Web](https://github.com/Arpan-Dey-Web)
* Portfolio: [https://arpandeyweb.vercel.app](https://arpandeyweb.vercel.app)

---

## 💡 Final Notes

This frontend is designed with scalability, performance, and clean architecture in mind. It demonstrates modern **Next.js App Router patterns**, modular component design, and real-world API integration.

> Built for production-level MERN applications 🚀
