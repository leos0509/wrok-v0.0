# ✅ WROKS — Open Source To-Do App

An open-source **task management app** built with modern web technologies.  
Manage tasks with drag-and-drop, organize your work visually, and collaborate with authentication support.

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org) — React framework for server-rendered apps  
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS for rapid UI development  
- [NextAuth.js](https://next-auth.js.org) — Authentication with providers like GitHub/Google  
- [Prisma](https://www.prisma.io/) — Type-safe ORM with PostgreSQL  
- [DndKit](https://dndkit.com/) — Drag and drop for sortable tasks & columns  

---

## 📦 Features

- 🔐 Authentication with NextAuth (GitHub, Google, etc.)  
- ✅ Task creation, editing, and deletion  
- 📋 Drag-and-drop tasks between lists/columns  
- 🎨 Clean, responsive UI with Tailwind CSS  
- 🗄️ PostgreSQL database with Prisma ORM  
- ⚡ Fast & optimized with Next.js App Router  

---

## 🖼️ Screenshots

> Replace these placeholders with real screenshots from your app.  
> Suggested size: ~1200x700px for wide layout.

### Dashboard View
![Dashboard Screenshot](./screenshots/dashboard.png)

### Task Management
![Task Management Screenshot](./screenshots/tasks.png)

### Authentication Flow
![Login Screenshot](./screenshots/login.png)

---

## 🛠 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/wroks-todo-app.git
cd wroks-todo-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set up environment variables
Create a `.env` file in the root:

```env
NEXTAUTH_SECRET="changeme"
NEXTAUTH_URL="http://localhost:3000"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

DATABASE_URL="postgresql://user:password@localhost:5432/wroksdb"
```

### 4. Run Prisma setup
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the dev server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🚀

---

## 📖 Learn More

- [Next.js Docs](https://nextjs.org/docs)  
- [Tailwind CSS Docs](https://tailwindcss.com/docs)  
- [NextAuth.js Docs](https://next-auth.js.org/getting-started/introduction)  
- [Prisma Docs](https://www.prisma.io/docs)  
- [DndKit Docs](https://docs.dndkit.com/)  

---

## 📤 Deployment

The easiest way to deploy is with [Vercel](https://vercel.com).  
Check out the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).