<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<div align="center">

# ♻️ ReWear

### A premium fashion rental and resale platform

*Borrow showstoppers. Lend what you never wear. Give clothes a second life.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## 📖 About the Project

**ReWear** is a full-stack fashion rental and resale web application. It connects people who own special-occasion clothing they rarely wear with people who want to rent or buy those pieces for a fraction of the retail price.

The platform handles the entire lifecycle — from listing a garment to pickup, dry-cleaning, delivery, and return — making passive income effortless for owners while giving renters access to curated, magazine-worthy fits.

### 🌱 The Problem It Solves

- Wardrobes are full of expensive clothes worn once — to a wedding, a gala, a formal dinner.
- Buying new outfits for every occasion is expensive and environmentally wasteful.
- ReWear lets owners **earn 80%** of every rental booking, while customers access premium pieces for a fraction of the retail price.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Home Page** | Editorial hero section, marquee banner, step-by-step choreography grid, and a curated listings preview |
| 🛍️ **Shop / Browse** | Full searchable and filterable catalogue of all listings (by category, occasion, size, and mode) |
| 👗 **Product Page** | Detailed product view with multi-image gallery, date range picker for rentals, delivery address input, price calculator, reviews system, and direct messaging to the owner |
| ➕ **List a Piece** | Form for authenticated users to list their garment with title, description, category, occasion, size, brand, color, rental price, and buy price |
| 🔐 **Sign In** | JWT-based mock authentication — any email and password will work in dev/preview mode |
| 📊 **Dashboard** | Personal control room showing total earnings, number of active listings, pending orders, and completed bookings |
| ℹ️ **How It Works** | Six-step visual explainer page — List → Pickup → Care → Wear → Return → Earn |

---

## 🏗️ Tech Stack

### Frontend
| Library | Version | Purpose |
|---|---|---|
| **React** | 19 | Component-based UI framework |
| **TypeScript** | ~5.8 | Type-safe development |
| **Vite** | 6 | Fast development server and bundler |
| **React Router DOM** | 7 | Client-side routing and navigation |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Lucide React** | Latest | Icon set (arrows, truck, sparkles, etc.) |
| **Axios** | 1.x | HTTP client for API calls |
| **React Day Picker** | 9 | Calendar / date-range picker on the product page |
| **date-fns** | 4 | Date arithmetic (calculating rental duration and total cost) |

### Backend
| Library | Version | Purpose |
|---|---|---|
| **Express** | 4 | Node.js HTTP server and REST API |
| **tsx** | 4 | Runs TypeScript server files directly without compiling |
| **jsonwebtoken** | 9 | Signs and verifies JWT tokens for authentication |
| **dotenv** | 17 | Loads environment variables from `.env` |

---

## 🗂️ Project Structure

```
rewear/
├── server.ts                  # Express backend + Vite middleware (single entry point)
├── vite.config.ts             # Vite config (React plugin, Tailwind, proxy, ports)
├── index.html                 # HTML shell
├── package.json
│
└── src/
    ├── main.tsx               # React app entry — mounts <App /> with BrowserRouter
    ├── App.tsx                # Root component — wraps layout in AuthProvider
    ├── index.css              # Global styles, Google Fonts, Tailwind theme tokens
    │
    ├── context/
    │   └── AuthContext.tsx    # Auth state (user, token), login/logout, localStorage persistence
    │
    ├── pages/
    │   ├── Layout.tsx         # Shared layout shell: Navbar + <Routes> + Footer
    │   ├── Home.tsx           # Landing page (hero, marquee, choreography, curated grid)
    │   ├── Shop.tsx           # Browse/search/filter all listings
    │   ├── Product.tsx        # Single product detail + calendar + reviews + messaging
    │   ├── SignIn.tsx         # Login form with JWT auth
    │   ├── Dashboard.tsx      # User's personal stats and active listings
    │   ├── ListPiece.tsx      # Form to create a new garment listing
    │   └── Process.tsx        # "How It Works" — six-step explainer page
    │
    └── components/
        ├── Navbar.tsx         # Fixed top navigation bar with auth-aware links
        └── Footer.tsx         # Site footer with links and brand info
```

---

## ⚙️ How It Works — Architecture

### Single-Process Full-Stack Server

ReWear uses a **single `server.ts` entry point** that does two things at once:

1. **Runs an Express REST API** on port `3001` (serving all `/api/*` routes).
2. **Serves the Vite dev server as middleware** in development mode — so both your API and your React app are available at the same URL (`http://localhost:3001`), with no CORS issues.

```
Browser → http://localhost:3001
              ├── /api/*       → Express handlers (auth, listings, reviews, messages)
              └── /*           → Vite dev server → React SPA
```

In production, Vite builds a static `dist/` folder and Express serves it with `express.static`.

### Authentication Flow

ReWear uses **mock JWT authentication** — ideal for demos and previews.

```
1. User submits email + password on /sign-in
2. POST /api/auth/login → server creates a JWT signed with SECRET_KEY
3. Token + user object returned to the browser
4. AuthContext stores them in localStorage (survives page refresh)
5. Protected routes (Dashboard, ListPiece) check for the token
6. API calls include the token in the Authorization: Bearer <token> header
7. Server verifies the token with jwt.verify() before returning user-specific data
```

> **Note:** Any email and any password will work in preview mode. The server accepts all login attempts and generates a token based on the email address.

### Data Layer (Mock In-Memory DB)

The backend uses an **in-memory JavaScript array** as a mock database. This means:
- All data (listings, messages, reviews) **resets every time the server restarts**.
- Pre-seeded with 4 sample garment listings.
- New listings created via the form are added to this array and visible in the shop immediately — until the server restarts.

---

## 🛣️ Pages & Routes

| Route | Page | Auth Required? | Description |
|---|---|---|---|
| `/` | Home | ❌ | Landing page with hero, steps, and featured listings |
| `/shop` | Shop | ❌ | Browse all listings with search and filters |
| `/product/:id` | Product | ❌ (messaging/reviews need login) | Full product detail page |
| `/sign-in` | Sign In | ❌ | Login form |
| `/how-it-works` | Process | ❌ | Six-step explainer |
| `/list` | List a Piece | ✅ Redirects to /sign-in | Form to create a new listing |
| `/dashboard` | Dashboard | ✅ Redirects to /sign-in | Personal stats and listing manager |

---

## 🔌 REST API Reference

All API routes are served by Express at `http://localhost:3001`.

### Auth
| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | `{ email, password }` | Returns a JWT token and user object |

### Listings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/listings` | ❌ | Returns all listings |
| `GET` | `/api/listings/:id` | ❌ | Returns a single listing by ID |
| `POST` | `/api/listings` | ✅ Bearer token | Creates a new listing (owner set from token) |

### Reviews
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/listings/:id/reviews` | ❌ | Get all reviews for a listing |
| `POST` | `/api/listings/:id/reviews` | ✅ Bearer token | Submit a review (rating 1-5 + comment) |

### Messages
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/messages` | ✅ Bearer token | Send a message to a listing's owner |
| `GET` | `/api/messages` | ✅ Bearer token | Get all messages for the logged-in user |

### Dashboard
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/user/dashboard` | ✅ Bearer token | Returns earnings, listings, pending orders, completed count |

---

## 🚀 Running Locally

**Prerequisites:** Node.js (v18+)

### 1. Clone the repository
```bash
git clone https://github.com/Sneha-Nayak-12/ReWear.git
cd ReWear
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy the example env file and add your Gemini API key (used for any AI features):
```bash
cp .env.example .env.local
```
Then edit `.env.local` and set:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the development server
```bash
npm run dev
```

The app will be running at **http://localhost:3001**

> If port 3001 is already in use, you can set a different port:
> ```bash
> PORT=4000 npm run dev
> ```

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `tsx server.ts` | Starts the development server (Express + Vite HMR) |
| `build` | `vite build` | Builds the React frontend into `dist/` |
| `preview` | `vite preview` | Serves the production build locally |
| `lint` | `tsc --noEmit` | TypeScript type checking (no emit) |

---

## 🎨 Design System

ReWear uses a custom editorial design aesthetic — inspired by luxury fashion magazines.

### Colors
| Token | Value | Usage |
|---|---|---|
| `--color-brand-bg` | `#fcfbf8` | Warm off-white page background |
| `--color-brand-green` | `#2a3d32` | Primary action color (buttons, accents) |
| `--color-brand-fg` | `#2c2c2c` | Main body text |
| `--color-brand-sub` | `#7a7a7a` | Secondary/muted text, labels |
| `--color-brand-border` | `#e6e4dc` | Thin borders and dividers |

### Typography
- **Serif font:** `Playfair Display` — headings, hero text, editorial copy
- **Sans-serif font:** `Inter` — UI labels, buttons, navigation, body text

---

## 🌐 Live App (AI Studio)

View the hosted version of this app on AI Studio:
https://ai.studio/apps/b498ede4-93a7-44c3-b119-fcb34461b844

---

## 📄 License

This project was built as part of a learning project. Feel free to fork and build on it!

---

<div align="center">
Made with ♥ by <a href="https://github.com/Sneha-Nayak-12">Sneha Nayak</a>
</div>
"# ReWear_Project" 
