# Production-Grade MERN Portfolio + Admin CMS

An enterprise-grade, luxury, futuristic MERN stack Portfolio & Admin Content Management System (CMS) inspired by Apple, Linear, Stripe, Vercel, and Awwwards.

## 🚀 Stack & Technologies
- **Frontend**: React 19, Vite, TypeScript, TailwindCSS v4, Framer Motion, GSAP, Lenis Smooth Scroll, Three.js / R3F, Radix UI, TanStack Query v5, React Hook Form, Zod.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), JWT Auth (HttpOnly Cookies), Cloudinary, Nodemailer, Helmet, Rate Limiting, CORS.
- **CMS Admin**: Complete CRUD dashboard for 12 portfolio collections, real-time analytics chart, media uploader, and markdown editor.
- **DevOps**: Docker, Docker Compose, Nginx.

## 🛠️ Quick Start

### 1. Backend Setup
```bash
cd server
npm install
npm run seed     # Seeds initial database & admin credentials (admin@portfolio.dev / Admin@123456)
npm run dev      # Starts Express API at http://localhost:5000
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev      # Starts Vite dev server at http://localhost:5173
```

### 3. Docker Compose Deployment
```bash
docker-compose up --build -d
```

## 🔐 Seed Admin Credentials
- **Email**: `admin@portfolio.dev`
- **Password**: `Admin@123456`
- **CMS URL**: `http://localhost:5173/login`
