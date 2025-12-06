# Complete Setup Guide

This guide will walk you through setting up the Wedding Management System from scratch.

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** v18.0.0 or higher ([Download](https://nodejs.org/))
- **MySQL** v8.0 or higher ([Download](https://dev.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com/downloads))
- **VS Code** (recommended) ([Download](https://code.visualstudio.com/))

## 🚀 Step-by-Step Installation

### Step 1: Create Project Directory

```bash
mkdir wedding-management-system
cd wedding-management-system
```

### Step 2: Copy Files

Copy all the provided files into your project directory following this structure:

```
wedding-management-system/
├── package.json (root)
├── turbo.json
├── .gitignore
├── README.md
├── IMPLEMENTATION_PLAN.md
├── SETUP_GUIDE.md
│
├── apps/
│   ├── frontend/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── tsconfig.json
│   │   ├── .env.local (create from .env.local.example)
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx
│   │       │   ├── page.tsx
│   │       │   └── globals.css
│   │       └── lib/
│   │           └── api.ts
│   │
│   └── backend/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vercel.json
│       ├── .env (create from .env.example)
│       └── src/
│           ├── app.ts
│           ├── server.ts
│           ├── config/
│           │   ├── database.ts
│           │   └── environment.ts
│           ├── entities/
│           │   ├── Guest.ts
│           │   ├── Event.ts
│           │   ├── Budget.ts
│           │   ├── Expense.ts
│           │   └── User.ts
│           ├── services/
│           │   ├── guestService.ts
│           │   ├── eventService.ts
│           │   └── budgetService.ts
│           ├── controllers/
│           │   └── index.ts
│           ├── routes/
│           │   └── index.ts
│           └── scripts/
│               └── seed.ts
```

### Step 3: Install Dependencies

```bash
# Install root dependencies
npm install

# This will also install dependencies for frontend and backend workspaces
```

### Step 4: Setup MySQL Database

#### Option A: Local MySQL

1. **Start MySQL**

```bash
# macOS
brew services start mysql

# Linux
sudo service mysql start

# Windows
# Start MySQL service from Services app
```

2. **Create Database**

```bash
mysql -u root -p
```

Then in MySQL prompt:

```sql
CREATE DATABASE wedding_management;
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON wedding_management.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Option B: Docker MySQL (Easier)

```bash
docker run --name wedding-mysql \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=wedding_management \
  -e MYSQL_USER=wedding_user \
  -e MYSQL_PASSWORD=your_password \
  -p 3306:3306 \
  -d mysql:8.0
```

### Step 5: Configure Backend Environment

Create `apps/backend/.env`:

```bash
cd apps/backend
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
NODE_ENV=development

# Local MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=wedding_user
DB_PASSWORD=your_secure_password
DB_DATABASE=wedding_management

# For Docker MySQL
# DB_HOST=localhost
# DB_PORT=3306
# DB_USERNAME=wedding_user
# DB_PASSWORD=your_password
# DB_DATABASE=wedding_management

FRONTEND_URL=http://localhost:3000
JWT_SECRET=change-this-to-random-secret-key
```

### Step 6: Configure Frontend Environment

Create `apps/frontend/.env.local`:

```bash
cd apps/frontend
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 7: Initialize Database

```bash
# From root directory
npm run backend:migrate
```

This will:

- Connect to MySQL
- Create all tables
- Setup relationships

### Step 8: Seed Sample Data

```bash
npm run backend:seed
```

This will populate the database with:

- 4 sample events
- 3 sample guests
- 1 budget with 3 expenses

### Step 9: Start Development Servers

```bash
# From root directory
npm run dev
```

This will start:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

### Step 10: Verify Installation

1. Open browser: http://localhost:3000
2. You should see the Wedding Management dashboard
3. Check that all tabs work (Dashboard, Guests, Events, Budget)

## ✅ Testing the Application

### Test Backend API

```bash
# Health check
curl http://localhost:5000/health

# Get all guests
curl http://localhost:5000/api/guests

# Get dashboard stats
curl http://localhost:5000/api/dashboard/stats
```

### Test Frontend

1. Navigate through all tabs
2. Check data is loading
3. Verify stats are displaying

## 🐛 Troubleshooting

### MySQL Connection Error

**Error**: `Access denied for user`

```bash
# Check MySQL is running
mysql -u root -p

# Verify user exists
SELECT User, Host FROM mysql.user WHERE User = 'wedding_user';

# Reset password if needed
ALTER USER 'wedding_user'@'localhost' IDENTIFIED BY 'new_password';
```

**Error**: `Unknown database 'wedding_management'`

```bash
# Create database
CREATE DATABASE wedding_management;
```

### Port Already in Use

**Frontend (3000)**

```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or change port in package.json
# "dev": "next dev -p 3001"
```

**Backend (5000)**

```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or change port in .env
# PORT=5001
```

### TypeORM Sync Issues

If tables aren't being created:

1. Check `apps/backend/src/config/database.ts`
2. Ensure `synchronize: true` for development
3. Manually create tables:

```sql
-- Run this in MySQL if needed
USE wedding_management;
SHOW TABLES;
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
rm -rf apps/*/node_modules
npm install
```

### Build Errors

```bash
# Clear build caches
npm run clean

# Rebuild
npm run build
```

## 📝 VS Code Setup (Recommended)

### Install Extensions

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma"
  ]
}
```

### Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 🚀 Deploying to Vercel

### Prerequisites

- GitHub account
- Vercel account ([Sign up](https://vercel.com/signup))
- PlanetScale account for MySQL ([Sign up](https://planetscale.com/))

### Step 1: Setup PlanetScale Database

1. Create new database in PlanetScale
2. Get connection string
3. Format: `mysql://user:pass@host:port/db?ssl={"rejectUnauthorized":true}`

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/wedding-management.git
git push -u origin main
```

### Step 3: Deploy Backend

```bash
cd apps/backend
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: wedding-backend
# - Directory: ./ (current)
```

Add environment variables in Vercel Dashboard:

- `DATABASE_URL` = PlanetScale connection string
- `FRONTEND_URL` = (will get after deploying frontend)
- `NODE_ENV` = production
- `JWT_SECRET` = your-secret-key

### Step 4: Deploy Frontend

```bash
cd apps/frontend
vercel

# Follow prompts
# - Project name: wedding-frontend
```

Add environment variable:

- `NEXT_PUBLIC_API_URL` = your backend URL from Step 3

### Step 5: Update CORS

Update backend `FRONTEND_URL` in Vercel with your frontend URL.

Redeploy backend:

```bash
cd apps/backend
vercel --prod
```

## 📊 Database Migrations (Production)

After deploying:

```bash
# Connect to production database
DATABASE_URL="your-production-url" npm run backend:migrate

# Optionally seed data
DATABASE_URL="your-production-url" npm run backend:seed
```

## 🎯 Next Steps

1. ✅ **Test all features** - Create guests, events, budgets
2. 📸 **Customize** - Update branding, colors
3. 🔐 **Add authentication** - See IMPLEMENTATION_PLAN.md
4. 🚀 **Implement Phase 2** - Start with Vendor Management
5. 📱 **Mobile app** - Follow React Native guide in plan

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🆘 Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review error messages carefully
3. Check database connection
4. Verify environment variables
5. Look at browser console and terminal logs

## 🎉 Success!

You now have a fully functional wedding management system running locally. Happy planning! 💍
