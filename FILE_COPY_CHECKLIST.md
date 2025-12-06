# File Copy Checklist for VS Code

Follow this checklist to copy all files correctly into VS Code. Check off each item as you complete
it.

## 📋 Setup Instructions

1. Create root folder: `wedding-management-system`
2. Open this folder in VS Code
3. Copy files one by one following this checklist
4. Verify each file after copying

---

## ✅ Root Level Files

- [ ] **package.json** (Root)
- [ ] **turbo.json**
- [ ] **.gitignore**
- [ ] **.prettierrc**
- [ ] **README.md**
- [ ] **SETUP_GUIDE.md**
- [ ] **IMPLEMENTATION_PLAN.md**
- [ ] **DEPLOYMENT_GUIDE.md**
- [ ] **QUICK_REFERENCE.md**
- [ ] **PROJECT_SUMMARY.md**
- [ ] **FILE_COPY_CHECKLIST.md** (this file)

---

## ✅ .vscode/ Directory

Create folder: `.vscode/`

- [ ] **.vscode/settings.json**
- [ ] **.vscode/extensions.json**

---

## ✅ Backend Files

Create folder: `apps/backend/`

### Backend Root

- [ ] **apps/backend/package.json**
- [ ] **apps/backend/tsconfig.json**
- [ ] **apps/backend/vercel.json**
- [ ] **apps/backend/.env.example**

**Action**: Copy `.env.example` to `.env` and update with your credentials

### Backend Config

Create folder: `apps/backend/src/config/`

- [ ] **apps/backend/src/config/environment.ts**
- [ ] **apps/backend/src/config/database.ts**

### Backend Entities

Create folder: `apps/backend/src/entities/`

- [ ] **apps/backend/src/entities/User.ts**
- [ ] **apps/backend/src/entities/Guest.ts**
- [ ] **apps/backend/src/entities/Event.ts**
- [ ] **apps/backend/src/entities/Budget.ts**
- [ ] **apps/backend/src/entities/Expense.ts**

### Backend Services

Create folder: `apps/backend/src/services/`

- [ ] **apps/backend/src/services/guestService.ts**
- [ ] **apps/backend/src/services/eventService.ts**
- [ ] **apps/backend/src/services/budgetService.ts**

### Backend Controllers

Create folder: `apps/backend/src/controllers/`

- [ ] **apps/backend/src/controllers/index.ts**

### Backend Routes

Create folder: `apps/backend/src/routes/`

- [ ] **apps/backend/src/routes/index.ts**

### Backend Scripts

Create folder: `apps/backend/src/scripts/`

- [ ] **apps/backend/src/scripts/migrate.ts**
- [ ] **apps/backend/src/scripts/seed.ts**

### Backend Core

- [ ] **apps/backend/src/app.ts**
- [ ] **apps/backend/src/server.ts**

---

## ✅ Frontend Files

Create folder: `apps/frontend/`

### Frontend Root

- [ ] **apps/frontend/package.json**
- [ ] **apps/frontend/tsconfig.json**
- [ ] **apps/frontend/next.config.js**
- [ ] **apps/frontend/tailwind.config.js**
- [ ] **apps/frontend/postcss.config.js**
- [ ] **apps/frontend/.env.local.example**

**Action**: Copy `.env.local.example` to `.env.local` and update API URL

### Frontend App

Create folder: `apps/frontend/src/app/`

- [ ] **apps/frontend/src/app/layout.tsx**
- [ ] **apps/frontend/src/app/page.tsx**
- [ ] **apps/frontend/src/app/globals.css**

### Frontend Lib

Create folder: `apps/frontend/src/lib/`

- [ ] **apps/frontend/src/lib/api.ts**

---

## ✅ Packages (Future)

Create folder: `packages/shared/`

- [ ] **packages/shared/package.json** (Basic structure only, optional for MVP)
- [ ] **packages/shared/tsconfig.json** (Basic structure only, optional for MVP)

---

## 🔍 Verification Steps

After copying all files:

### 1. Check File Structure

```bash
# In VS Code terminal
tree -L 3 -I 'node_modules'
```

Expected structure:

```
wedding-management-system/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       └── package.json
├── .vscode/
├── package.json
└── [documentation files]
```

### 2. Verify Package Files

```bash
# Check if package.json files exist
ls -la package.json
ls -la apps/backend/package.json
ls -la apps/frontend/package.json
```

### 3. Check Environment Files

```bash
# Check .env files are created
ls -la apps/backend/.env
ls -la apps/frontend/.env.local
```

### 4. Validate JSON Files

```bash
# Validate JSON syntax (in VS Code)
# Open each .json file and check for errors highlighted
```

---

## 🚀 Post-Copy Actions

### 1. Install Dependencies

```bash
npm install
```

**Expected output**: Installation of all dependencies for root, backend, and frontend

### 2. Configure Backend Environment

Edit `apps/backend/.env`:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=wedding_user
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_DATABASE=wedding_management
FRONTEND_URL=http://localhost:3000
JWT_SECRET=generate-random-secret
```

### 3. Configure Frontend Environment

Edit `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Setup Database

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE wedding_management;
exit

# Run migrations
npm run backend:migrate
```

### 5. Seed Sample Data

```bash
npm run backend:seed
```

### 6. Start Development

```bash
npm run dev
```

---

## ✅ Final Verification Checklist

- [ ] All files copied without errors
- [ ] No TypeScript errors in VS Code
- [ ] `npm install` completed successfully
- [ ] MySQL database created
- [ ] `.env` files configured correctly
- [ ] Migrations ran successfully
- [ ] Seed data loaded
- [ ] Backend starts on port 5000
- [ ] Frontend starts on port 3000
- [ ] http://localhost:3000 loads dashboard
- [ ] Dashboard shows sample data
- [ ] All tabs (Dashboard, Guests, Events, Budget) work
- [ ] API returns data at http://localhost:5000/health

---

## 🐛 Troubleshooting

### Issue: File not found

**Solution**: Check folder structure matches exactly

### Issue: JSON syntax error

**Solution**: Verify no extra/missing commas, brackets

### Issue: Module not found

**Solution**: Run `npm install` again

### Issue: TypeScript errors

**Solution**: Check all imports are correct, file names match

### Issue: Cannot find package.json

**Solution**: Ensure you're in the root directory

---

## 📁 Folder Structure Reference

```
wedding-management-system/
│
├── .vscode/
│   ├── settings.json
│   └── extensions.json
│
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   ├── database.ts
│   │   │   │   └── environment.ts
│   │   │   ├── entities/
│   │   │   │   ├── User.ts
│   │   │   │   ├── Guest.ts
│   │   │   │   ├── Event.ts
│   │   │   │   ├── Budget.ts
│   │   │   │   └── Expense.ts
│   │   │   ├── services/
│   │   │   │   ├── guestService.ts
│   │   │   │   ├── eventService.ts
│   │   │   │   └── budgetService.ts
│   │   │   ├── controllers/
│   │   │   │   └── index.ts
│   │   │   ├── routes/
│   │   │   │   └── index.ts
│   │   │   ├── scripts/
│   │   │   │   ├── migrate.ts
│   │   │   │   └── seed.ts
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vercel.json
│   │   └── .env
│   │
│   └── frontend/
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── globals.css
│       │   └── lib/
│       │       └── api.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.js
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       └── .env.local
│
├── packages/
│   └── shared/
│
├── package.json
├── turbo.json
├── .gitignore
├── .prettierrc
├── README.md
├── SETUP_GUIDE.md
├── IMPLEMENTATION_PLAN.md
├── DEPLOYMENT_GUIDE.md
├── QUICK_REFERENCE.md
├── PROJECT_SUMMARY.md
└── FILE_COPY_CHECKLIST.md
```

---

## 💡 Pro Tips

1. **Copy in Order**: Follow checklist from top to bottom
2. **Check After Each**: Verify file after copying
3. **Use Find**: Use VS Code find (Cmd/Ctrl+P) to locate files
4. **Watch for Typos**: File/folder names must match exactly
5. **Save All**: Use "Save All" after copying multiple files
6. **Check Syntax**: VS Code highlights syntax errors
7. **Git Ignore**: Don't manually create .env files in Git

---

## ✨ Success Indicators

When all files are correctly copied and configured:

✅ No red underlines in VS Code  
✅ `npm install` completes without errors  
✅ TypeScript compilation succeeds  
✅ Database migrations complete  
✅ Servers start successfully  
✅ Dashboard displays correctly  
✅ Sample data appears

---

## 🎯 Next Steps After Completion

1. ✅ Test all CRUD operations
2. 📸 Take a screenshot of working dashboard
3. 🚀 Push to GitHub
4. 🌐 Deploy to Vercel (optional)
5. 📝 Start implementing Phase 2 features

---

**Completion Time**: Approximately 30-45 minutes for careful copying  
**Difficulty**: Easy (just copy-paste, no coding required)  
**Prerequisites**: VS Code, Node.js, MySQL installed

---

Good luck! 🎉 Take your time and verify each step.
