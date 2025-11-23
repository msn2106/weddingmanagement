# Deployment Guide - Vercel

This guide will help you deploy both frontend and backend to Vercel with a production database.

## 📋 Prerequisites

1. ✅ **GitHub Account** - [Sign up](https://github.com)
2. ✅ **Vercel Account** - [Sign up](https://vercel.com/signup)
3. ✅ **PlanetScale Account** - [Sign up](https://planetscale.com) (Free tier available)
4. ✅ **Working Local Setup** - Ensure your app runs locally first

## 🗄️ Step 1: Setup Production Database (PlanetScale)

### Why PlanetScale?
- Free tier available (5GB storage)
- Serverless MySQL
- Automatic backups
- Global edge database
- Perfect for Vercel deployments

### Create Database

1. **Sign up** at https://planetscale.com
2. **Create New Database**
   - Name: `wedding-management`
   - Region: Choose closest to your users
   - Click "Create database"

3. **Get Connection String**
   - Click "Connect"
   - Select "Connect with: Prisma" (we'll modify for TypeORM)
   - Copy the `DATABASE_URL`
   
   Example:
   ```
   mysql://xxxxxx:pscale_pw_xxxxx@aws.connect.psdb.cloud/wedding-management?ssl={"rejectUnauthorized":true}
   ```

4. **Initialize Schema**
   ```bash
   # Set connection string temporarily
   export DATABASE_URL="your-planetscale-url"
   
   # Run migrations
   npm run backend:migrate
   
   # Seed data (optional)
   npm run backend:seed
   ```

### Alternative: Railway

If you prefer Railway over PlanetScale:

1. Go to https://railway.app
2. Create new project → Add MySQL
3. Get connection string from variables
4. Format: `mysql://user:pass@host:port/db`

## 🚀 Step 2: Push Code to GitHub

```bash
# Initialize git (if not done)
git init

# Create .gitignore (already provided)
# Make sure .env files are in .gitignore

# Add all files
git add .

# Commit
git commit -m "Initial commit - Wedding Management System"

# Create repository on GitHub
# Then add remote
git remote add origin https://github.com/YOUR_USERNAME/wedding-management-system.git

# Push
git branch -M main
git push -u origin main
```

## 🖥️ Step 3: Deploy Backend

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend
cd apps/backend

# Deploy
vercel

# Follow prompts:
# ? Set up and deploy? Yes
# ? Which scope? Your account
# ? Link to existing project? No
# ? What's your project's name? wedding-backend
# ? In which directory is your code located? ./
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `apps/backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
DATABASE_URL=your-planetscale-connection-string
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
JWT_SECRET=generate-random-secret-key-here
PORT=5000
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Deploy

```bash
vercel --prod
```

**Save your backend URL**: `https://wedding-backend.vercel.app`

## 🎨 Step 4: Deploy Frontend

### Using Vercel CLI

```bash
# Navigate to frontend
cd apps/frontend

# Deploy
vercel

# Follow prompts:
# ? Set up and deploy? Yes
# ? Which scope? Your account
# ? Link to existing project? No
# ? What's your project's name? wedding-frontend
# ? In which directory is your code located? ./
```

### Using Vercel Dashboard

1. Go to Vercel Dashboard
2. Click "Add New" → "Project"
3. Import same GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://wedding-backend.vercel.app/api
```

### Deploy

```bash
vercel --prod
```

**Save your frontend URL**: `https://wedding-frontend.vercel.app`

## 🔄 Step 5: Update Backend CORS

1. Go to backend Vercel project
2. Settings → Environment Variables
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://wedding-frontend.vercel.app
   ```
4. Redeploy backend:
   ```bash
   cd apps/backend
   vercel --prod
   ```

## ✅ Step 6: Verify Deployment

### Test Backend

```bash
# Health check
curl https://wedding-backend.vercel.app/health

# API check
curl https://wedding-backend.vercel.app/api/guests
```

### Test Frontend

1. Open `https://wedding-frontend.vercel.app`
2. Check all tabs load
3. Verify data displays
4. Test CRUD operations

## 🔧 Troubleshooting Deployment

### Issue: Database Connection Failed

**Check:**
1. Connection string is correct in Vercel env vars
2. PlanetScale database is active
3. SSL settings in connection string
4. No extra spaces in environment variables

**Fix:**
```bash
# Test connection locally first
export DATABASE_URL="your-url"
npm run backend:migrate
```

### Issue: CORS Errors

**Check:**
1. `FRONTEND_URL` in backend matches actual frontend URL
2. No trailing slashes in URLs
3. Both deployed (not mixing local + deployed)

**Fix:**
```bash
# Update backend env var
FRONTEND_URL=https://wedding-frontend.vercel.app

# Redeploy
vercel --prod
```

### Issue: Build Failed

**Common causes:**
1. TypeScript errors
2. Missing dependencies
3. Environment variables not set

**Fix:**
```bash
# Test build locally
npm run build

# Check logs in Vercel dashboard
# Fix errors and push again
git add .
git commit -m "Fix build errors"
git push
```

### Issue: API Returns 404

**Check:**
1. Backend URL is correct in frontend env
2. `/api` prefix is included
3. Routes are defined correctly

**Fix:**
```bash
# Verify backend routes
curl https://wedding-backend.vercel.app/api/guests

# Check frontend env var
NEXT_PUBLIC_API_URL=https://wedding-backend.vercel.app/api
```

### Issue: Slow Performance

**Solutions:**
1. Choose PlanetScale region close to Vercel deployment
2. Enable Vercel Analytics
3. Add caching headers
4. Optimize database queries

## 📊 Step 7: Custom Domain (Optional)

### Add Custom Domain to Frontend

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel → Project → Settings → Domains
3. Add your domain: `yourdomain.com`
4. Update DNS records as instructed
5. Wait for DNS propagation (5-60 minutes)

### Update Backend CORS

```env
FRONTEND_URL=https://yourdomain.com
```

### SSL Certificate

Vercel automatically provides SSL certificates. Your site will be `https://` by default.

## 🔒 Security Checklist

- [ ] Environment variables are set (not hardcoded)
- [ ] JWT_SECRET is random and secure
- [ ] Database password is strong
- [ ] CORS is configured correctly
- [ ] HTTPS is enabled (Vercel default)
- [ ] API keys are in environment variables
- [ ] No sensitive data in git repository

## 📈 Monitoring & Maintenance

### Vercel Analytics

1. Go to Project → Analytics
2. View performance metrics
3. Track user behavior
4. Monitor errors

### Database Monitoring

1. PlanetScale Dashboard
2. Check connection count
3. Monitor query performance
4. Review slow queries

### Logs

```bash
# View deployment logs
vercel logs wedding-backend

vercel logs wedding-frontend

# Real-time logs
vercel logs --follow
```

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys on git push:

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push

# Vercel automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys if successful
# 4. Updates live site
```

### Preview Deployments

- Every branch gets a unique URL
- Test before merging to main
- Share with team for review

### Production vs Preview

- `main` branch → Production deployment
- Other branches → Preview deployments

## 💰 Cost Estimation

### Free Tier Limits

**Vercel:**
- Free for personal projects
- 100GB bandwidth/month
- Unlimited sites
- Hobby plan: $0

**PlanetScale:**
- Free tier: 5GB storage
- 1 billion row reads/month
- 10 million row writes/month
- Great for MVP

**Upgrade When:**
- PlanetScale: >5GB data or need scaling
- Vercel: Commercial use or need teams

## 🎯 Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database initialized with schema
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Sample data seeded (optional)
- [ ] All features tested in production
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Monitoring setup
- [ ] Backup strategy planned
- [ ] Documentation updated

## 📝 Post-Deployment Tasks

1. **Test Everything**
   - Create test guest
   - Create test event
   - Add test expense
   - Verify dashboard stats

2. **Monitor Performance**
   - Check load times
   - Review error rates
   - Optimize if needed

3. **Setup Alerts**
   - Vercel email notifications
   - PlanetScale alerts
   - Uptime monitoring

4. **Plan Backups**
   - PlanetScale automatic backups
   - Export data periodically
   - Document recovery process

## 🆘 Emergency Rollback

If deployment fails:

```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy specific commit
git checkout <previous-commit>
vercel --prod
```

## 🎉 Success!

Your wedding management system is now live! 🚀

**Share your URLs:**
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

**Next Steps:**
1. Share with users for testing
2. Gather feedback
3. Implement Phase 2 features (see IMPLEMENTATION_PLAN.md)
4. Add authentication
5. Enhance security

---

**Need help?** Check Vercel documentation or create a GitHub issue.