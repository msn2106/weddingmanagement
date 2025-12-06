# Quick Reference Guide

## 📂 File Structure Overview

```
wedding-management-system/
├── apps/
│   ├── frontend/         # Next.js app (Port 3000)
│   └── backend/          # Node.js API (Port 5000)
├── packages/             # Shared code (future)
└── [config files]        # Root configs
```

## 🚀 Common Commands

### Development

```bash
# Start everything
npm run dev

# Start frontend only
npm run frontend:dev

# Start backend only
npm run backend:dev

# Access URLs
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# API Health: http://localhost:5000/health
```

### Database

```bash
# Run migrations (create tables)
npm run backend:migrate

# Seed sample data
npm run backend:seed

# Direct MySQL access
mysql -u wedding_user -p wedding_management
```

### Build & Deploy

```bash
# Build all apps
npm run build

# Deploy to Vercel
cd apps/frontend && vercel
cd apps/backend && vercel
```

### Maintenance

```bash
# Install dependencies
npm install

# Clean build files
npm run clean

# Format code
npm run format

# Lint code
npm run lint
```

## 🗄️ Database Quick Commands

### MySQL Commands

```sql
-- Show all databases
SHOW DATABASES;

-- Use wedding database
USE wedding_management;

-- Show all tables
SHOW TABLES;

-- View guests
SELECT * FROM guests;

-- View events
SELECT * FROM events;

-- View budget summary
SELECT b.name, b.totalBudget, b.totalSpent,
       (b.totalSpent/b.totalBudget)*100 as percentage_used
FROM budgets b;

-- Count guests by RSVP status
SELECT rsvpStatus, COUNT(*) as count
FROM guests
GROUP BY rsvpStatus;

-- Drop all tables (CAREFUL!)
DROP TABLE expenses;
DROP TABLE guest_events;
DROP TABLE guests;
DROP TABLE events;
DROP TABLE budgets;
DROP TABLE users;
```

## 🔌 API Endpoints Reference

### Base URL

```
Local: http://localhost:5000/api
Production: https://your-backend.vercel.app/api
```

### Dashboard

```bash
GET /dashboard/stats
```

### Guests

```bash
GET    /guests              # Get all guests
GET    /guests/:id          # Get guest by ID
POST   /guests              # Create guest
PUT    /guests/:id          # Update guest
DELETE /guests/:id          # Delete guest
PATCH  /guests/:id/rsvp     # Update RSVP
GET    /guests/stats        # Guest statistics
```

### Events

```bash
GET    /events              # Get all events
GET    /events/:id          # Get event by ID
POST   /events              # Create event
PUT    /events/:id          # Update event
DELETE /events/:id          # Delete event
GET    /events/stats        # Event statistics
```

### Budget

```bash
GET    /budgets             # Get all budgets
GET    /budgets/:id         # Get budget by ID
POST   /budgets             # Create budget
PUT    /budgets/:id         # Update budget
DELETE /budgets/:id         # Delete budget
GET    /budgets/:id/stats   # Budget statistics
```

### Expenses

```bash
GET    /expenses                   # Get all expenses
POST   /budgets/:id/expenses       # Add expense
PUT    /expenses/:id               # Update expense
DELETE /expenses/:id               # Delete expense
```

## 🧪 Testing API with cURL

### Get Dashboard Stats

```bash
curl http://localhost:5000/api/dashboard/stats
```

### Create Guest

```bash
curl -X POST http://localhost:5000/api/guests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+919876543210",
    "email": "john@example.com",
    "category": "friends",
    "rsvpStatus": "pending",
    "attendeeCount": 1
  }'
```

### Update RSVP

```bash
curl -X PATCH http://localhost:5000/api/guests/GUEST_ID/rsvp \
  -H "Content-Type: application/json" \
  -d '{"status": "attending"}'
```

### Create Event

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Reception Party",
    "type": "reception",
    "date": "2024-12-21",
    "startTime": "19:00",
    "endTime": "23:00",
    "venue": "Grand Hotel",
    "dressCode": "Formal"
  }'
```

### Add Expense

```bash
curl -X POST http://localhost:5000/api/budgets/BUDGET_ID/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Flower Decoration",
    "category": "decoration",
    "amount": 25000,
    "paymentStatus": "pending",
    "date": "2024-11-25",
    "vendor": "Flower Shop"
  }'
```

## 🐛 Debugging Tips

### Check if services are running

```bash
# Backend
curl http://localhost:5000/health

# Frontend
curl http://localhost:3000
```

### View logs

```bash
# Backend logs (in terminal where you ran npm run backend:dev)
# Frontend logs (in terminal + browser console)
```

### Common Issues

**Issue**: Database connection failed

```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in apps/backend/.env
```

**Issue**: Port already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Issue**: Module not found

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**Issue**: TypeORM sync issues

```bash
# Check database.ts has synchronize: true
# Manually connect to MySQL and check tables
mysql -u wedding_user -p wedding_management
SHOW TABLES;
```

## 📊 Entity Relationships

```
User
  └─ (Future: owns) Guests, Events, Budgets

Guest
  ├─ Many-to-Many → Events (guest_events table)
  └─ One-to-Many → Travel (future)

Event
  ├─ Many-to-Many → Guests
  └─ One-to-Many → Media (future)

Budget
  └─ One-to-Many → Expenses

Expense
  └─ Many-to-One → Budget
```

## 🎨 Frontend Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard
│   └── globals.css        # Global styles
└── lib/
    └── api.ts             # API client
```

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=wedding_user
DB_PASSWORD=your_password
DB_DATABASE=wedding_management
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📦 Package Scripts

### Root (package.json)

- `npm run dev` - Start all services
- `npm run build` - Build all apps
- `npm run lint` - Lint all code
- `npm run format` - Format with Prettier
- `npm run clean` - Remove build files

### Backend

- `npm run dev` - Start dev server
- `npm run build` - Build TypeScript
- `npm run start` - Start production
- `npm run migrate` - Run migrations
- `npm run seed` - Seed database

### Frontend

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Start production
- `npm run lint` - Lint code

## 🎯 Database Schema

### guests

- id (UUID)
- name, phone, email
- category (enum)
- rsvpStatus (enum)
- attendeeCount
- mealPreference
- needsAccommodation
- notes
- createdAt, updatedAt

### events

- id (UUID)
- name, type (enum)
- date, startTime, endTime
- venue, venueAddress
- dressCode, theme
- description
- createdAt, updatedAt

### budgets

- id (UUID)
- name
- totalBudget, totalSpent
- notes
- createdAt, updatedAt

### expenses

- id (UUID)
- description
- category (enum)
- amount
- paymentStatus (enum)
- date, vendor, notes
- budget_id (FK)
- createdAt, updatedAt

## 🚨 Emergency Fixes

### Reset Database

```sql
DROP DATABASE wedding_management;
CREATE DATABASE wedding_management;
```

Then: `npm run backend:migrate && npm run backend:seed`

### Reset Node Modules

```bash
rm -rf node_modules package-lock.json
rm -rf apps/*/node_modules apps/*/package-lock.json
npm install
```

### Reset Everything

```bash
# Stop all services
pkill -f node

# Clean all
npm run clean
rm -rf node_modules
rm -rf apps/*/node_modules

# Fresh install
npm install
npm run backend:migrate
npm run backend:seed
npm run dev
```

## 📚 Helpful Resources

- **TypeORM**: https://typeorm.io/
- **Next.js**: https://nextjs.org/docs
- **Express**: https://expressjs.com/
- **Tailwind**: https://tailwindcss.com/docs
- **MySQL**: https://dev.mysql.com/doc/

## 🎉 Success Checklist

- [ ] MySQL running and database created
- [ ] Backend starts without errors (port 5000)
- [ ] Frontend starts without errors (port 3000)
- [ ] Can view dashboard at localhost:3000
- [ ] Can see sample guests, events, budget
- [ ] All tabs working (Dashboard, Guests, Events, Budget)
- [ ] API returns data when called directly

## 💡 Pro Tips

1. **Always check logs** - Most issues show clear error messages
2. **Test API first** - Before debugging frontend, verify backend works
3. **Use MySQL Workbench** - Visual tool for database management
4. **Git commit often** - Save working states
5. **Read error messages** - They usually tell you exactly what's wrong
6. **Check environment files** - Wrong credentials = most common issue
7. **Restart servers** - Sometimes needed after changes
8. **Clear browser cache** - If frontend shows stale data

## 🔗 Quick Links

- Frontend: http://localhost:3000
- Backend Health: http://localhost:5000/health
- API Base: http://localhost:5000/api
- GitHub: (your repository URL)
- Vercel Dashboard: https://vercel.com/dashboard

---

**Keep this file handy for quick reference during development!**
