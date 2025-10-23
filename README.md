# 📋 Project Manager - Frontend

A modern project management application built with React, TypeScript, Vite, and Tailwind CSS.

---

## ✨ Features

- 🔐 User authentication (Login/Register)
- 📊 Create and manage projects
- ✅ Track tasks with status (Pending/Completed/Blocked)
- 🎨 Responsive UI with Tailwind CSS

---

## 📋 Prerequisites

- Node.js v18+
- npm v9+
- Backend API running on `http://localhost:5000`

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Application will run on `http://localhost:3000`

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── auth/        # Login, Register forms
│   ├── layout/      # Navbar
│   ├── projects/    # Project cards and modals
│   └── tasks/       # Task cards and modals
├── contexts/        # React Context (Auth)
├── pages/           # Page components
├── services/        # API service
├── types/           # TypeScript types
└── App.tsx          # Main app with routes
```

---

## 🔌 Backend API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Projects
- `GET /api/project/fetchall` - Get all projects
- `POST /api/project/create` - Create project
- `DELETE /api/project/delete` - Delete project
- `PUT /api/projects/updateAll` - Update Project
- `PUT /api/projects/update` - Update Status

### Tasks
- `GET /api/tasks/fetchtasks?projectId=<id>` - Get tasks
- `POST /api/tasks/add` - Add task
- `PUT /api/tasks/update` - Update task
- `DELETE /api/tasks/delete` - Delete task

**Note:** All protected routes require authentication via HTTP-only cookies.

---

## 🌍 Environment Variables (Optional)

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```





---

## 🐛 Common Issues

**Port already in use:**
```bash
# Change port in vite.config.ts
server: { port: 3001 }
```

**CORS errors:**
- Enable CORS with credentials in backend

**Dependencies not installing:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Production Build

```bash
npm run build
```

Output in `dist/` folder ready for deployment.

---

## 📖 Usage

1. Start backend server on port 5000
2. Run `npm run dev` 
3. Open `http://localhost:5173`
4. Register/Login
5. Create projects and add tasks

---

**Made with React + TypeScript + Vite + Tailwind CSS**
