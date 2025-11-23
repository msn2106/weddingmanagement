# Wedding Management System 🎉

A complete wedding planning application with Next.js frontend, Node.js backend, and MySQL database.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone and Install**

```bash
git clone <your-repo-url>
cd wedding-management-system
npm install
```

2. **Setup Backend Environment**

```bash
cd apps/backend
cp .env.example .env
# Edit .env with your MySQL credentials
```

3. **Setup Frontend Environment**

```bash
cd apps/frontend
cp .env.local.example .env.local
```

4. **Setup Database**

```bash
# Make sure MySQL is running
# Create database
mysql -u root -p
CREATE DATABASE wedding_management;
exit;

# Run migrations (will auto-create tables)
npm run backend:migrate

# Seed sample data
npm run backend:seed
```

5. **Start Development Servers**

```bash
# From root directory
npm run dev
```

This will start:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
wedding-management-system/
├── apps/
│   ├── frontend/          # Next.js 15 application
│   └── backend/           # Node.js + Express + TypeORM
├── packages/
│   └── shared/            # Shared types and constants
└── ...config files
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeORM
- **Database**: MySQL
- **Deployment**: Vercel (Frontend + Backend)
- **Monorepo**: Turborepo

## ✅ Implemented Features

### Dashboard

- Real-time statistics (guests, RSVP rate, budget, events)
- Quick overview cards
- Recent activity feed

### Guest Management

- Complete CRUD operations
- RSVP status tracking (Attending/Not Attending/Maybe/Pending)
- Guest categorization (Family Bride/Groom, Friends, Colleagues)
- Event assignments
- Contact information management

### Event Management

- Multiple event types (Engagement, Haldi, Mehendi, Sangeet, Wedding, Reception)
- Date, time, and venue management
- Dress code and theme settings
- Guest list per event
- Event timeline view

### Budget & Expenses

- Budget creation and tracking
- Expense categorization
- Payment status tracking (Paid/Advance Paid/Pending)
- Budget utilization visualization
- Category-wise breakdown
- Vendor tracking

## 🗄️ Database Schema

### Tables

- `users` - User authentication and roles
- `guests` - Guest information and RSVP status
- `events` - Wedding events details
- `budgets` - Budget allocations
- `expenses` - Expense tracking
- `guest_events` - Many-to-many relationship

### Key Features

- UUID primary keys
- Automatic timestamps (createdAt, updatedAt)
- Enum types for status fields
- Foreign key constraints
- Cascade deletes where appropriate

## 📝 API Endpoints

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

### Guests

- `GET /api/guests` - Get all guests
- `GET /api/guests/:id` - Get guest by ID
- `POST /api/guests` - Create new guest
- `PUT /api/guests/:id` - Update guest
- `DELETE /api/guests/:id` - Delete guest
- `PATCH /api/guests/:id/rsvp` - Update RSVP status
- `GET /api/guests/stats` - Get guest statistics

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `GET /api/events/stats` - Get event statistics

### Budget

- `GET /api/budgets` - Get all budgets
- `GET /api/budgets/:id` - Get budget by ID
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget
- `GET /api/budgets/:id/stats` - Get budget statistics

### Expenses

- `GET /api/expenses` - Get all expenses
- `POST /api/budgets/:id/expenses` - Add expense to budget
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy Frontend**

```bash
cd apps/frontend
vercel
# Follow prompts
```

3. **Deploy Backend**

```bash
cd apps/backend
vercel
# Follow prompts
```

4. **Setup Database**

- Use PlanetScale (free tier) or Railway for MySQL
- Get connection URL
- Add to Vercel environment variables

5. **Environment Variables in Vercel**

Frontend:

- `NEXT_PUBLIC_API_URL` = your backend URL

Backend:

- `DATABASE_URL` = MySQL connection string
- `FRONTEND_URL` = your frontend URL
- `NODE_ENV` = production

## 🧪 Testing Locally

1. Start backend: `npm run backend:dev`
2. Start frontend: `npm run frontend:dev`
3. Open browser: http://localhost:3000
4. Test CRUD operations for guests, events, and budget

## 📋 Common Commands

```bash
# Install dependencies
npm install

# Development
npm run dev                    # Start all services
npm run frontend:dev          # Start frontend only
npm run backend:dev           # Start backend only

# Database
npm run backend:migrate       # Run migrations
npm run backend:seed          # Seed sample data

# Build
npm run build                 # Build all apps

# Lint & Format
npm run lint                  # Lint all code
npm run format               # Format with Prettier
```

## 🔧 Troubleshooting

### Database Connection Issues

```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in apps/backend/.env
# Try: localhost vs 127.0.0.1
```

### Port Already in Use

```bash
# Frontend (3000)
lsof -ti:3000 | xargs kill -9

# Backend (5000)
lsof -ti:5000 | xargs kill -9
```

### TypeORM Synchronize Issues

```bash
# If tables aren't created, check:
# apps/backend/src/config/database.ts
# synchronize: true (for development)
```

## 🎯 Next Steps

See `IMPLEMENTATION_PLAN.md` for:

- Vendor Management
- Travel Planner
- Stay Management
- Wedding Website Builder
- AI Assistant
- WhatsApp Integration
- And more...

## 📄 License

MIT

## 👥 Support

For issues or questions, please create a GitHub issue.

---

## Contributor docs & policies

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [CHANGELOG.md](./CHANGELOG.md)
- [RELEASE.md](./RELEASE.md)
- [CODEOWNERS](./.github/CODEOWNERS)
- [Branching & Commit Conventions](./BRANCHING_AND_COMMITS.md)
