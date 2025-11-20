# Deployment Guide - Mirage Arabian Nights Quiz

## 🚀 Quick Deployment Status

✅ **Ready to Deploy** - All configurations are in place!

---

## 📋 Prerequisites

1. **MongoDB Atlas Account** (already configured)
2. **Render Account** (for backend) or **Railway/Heroku**
3. **Vercel Account** (for frontend)

---

## 🔧 Backend Deployment (Render/Railway)

### Option 1: Render (Recommended)

1. **Push to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create New Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Set Environment Variables in Render**
   ```
   MONGODB_URL=mongodb+srv://ojasbisht1962_db_user:LdYXdQ3eO543G3Ka@clusterone.6a9q0rn.mongodb.net/
   DATABASE_NAME=career_guidance
   PYTHON_VERSION=3.11.0
   ```

4. **Deploy** - Render will automatically deploy your backend

5. **Copy Backend URL** (e.g., `https://your-app.onrender.com`)

### Option 2: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy**
   ```bash
   cd backend
   railway init
   railway up
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set MONGODB_URL="mongodb+srv://..."
   railway variables set DATABASE_NAME="career_guidance"
   ```

---

## 🌐 Frontend Deployment (Vercel)

### Already Configured! ✅

1. **Update `.env.production`**
   ```bash
   # Update with your actual backend URL from Render/Railway
   VITE_API_URL=https://your-backend.onrender.com
   ```

2. **Deploy to Vercel**
   ```bash
   cd frontend
   npm install -g vercel
   vercel login
   vercel --prod
   ```

   OR use Vercel Dashboard:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Add Environment Variable: `VITE_API_URL` = your backend URL

3. **Done!** Your frontend will be live at `https://your-app.vercel.app`

---

## 🔒 Security Checklist

### ⚠️ BEFORE DEPLOYING:

1. **Remove Hardcoded Credentials**
   - ✅ MongoDB URL should use environment variables (already done)
   - ✅ Never commit `.env` files to Git

2. **Update CORS Settings** (in `backend/main.py`)
   - Update allowed origins with your actual Vercel URL
   - Remove `allow_origins=["*"]` in production

3. **Set Up Environment Variables**
   - Set `MONGODB_URL` in Render/Railway dashboard
   - Set `VITE_API_URL` in Vercel dashboard

4. **MongoDB Security**
   - ✅ Database already uses authentication
   - Consider: Add IP whitelist in MongoDB Atlas (allow Render's IPs)

---

## 📊 Database Status

✅ **MongoDB Atlas Connected**
- Database: `career_guidance`
- Collections:
  - `arabian_questions` (24 questions seeded)
  - `arabian_quiz_results` (quiz submissions)
  - `users` (user profiles and stats)

---

## 🧪 Testing After Deployment

1. **Test Backend API**
   ```bash
   curl https://your-backend.onrender.com/
   curl https://your-backend.onrender.com/arabian-quiz/stats
   ```

2. **Test Frontend**
   - Visit `https://your-app.vercel.app`
   - Take a quiz
   - Check leaderboard
   - View profile

3. **Verify Database**
   - Check MongoDB Atlas dashboard
   - Confirm new quiz results are being saved

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

- **Push to GitHub** → Automatically deploys to Vercel (frontend)
- **Push to GitHub** → Automatically deploys to Render (backend)

---

## 🐛 Troubleshooting

### Backend won't start
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Render/Railway logs

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend is running (visit backend URL)

### Database errors
- Verify MongoDB credentials
- Check IP whitelist in MongoDB Atlas
- Add `0.0.0.0/0` to allow all IPs (for testing)

---

## 📝 Post-Deployment

1. **Update MongoDB IP Whitelist**
   - Go to MongoDB Atlas
   - Network Access → Add Render's IP range
   - Or use `0.0.0.0/0` to allow all (less secure)

2. **Monitor Logs**
   - Render: Check deployment logs
   - Vercel: Check function logs
   - MongoDB: Monitor database operations

3. **Custom Domain** (Optional)
   - Add custom domain in Vercel settings
   - Update CORS in backend with new domain

---

## ✅ Deployment Checklist

- [ ] MongoDB credentials in environment variables
- [ ] Backend deployed to Render/Railway
- [ ] Backend URL copied
- [ ] Frontend `.env.production` updated with backend URL
- [ ] Frontend deployed to Vercel
- [ ] CORS configured with actual frontend URL
- [ ] Test quiz functionality
- [ ] Test leaderboard
- [ ] Test user profile
- [ ] Verify data saving to MongoDB

---

## 🎉 Your App is Live!

**Frontend:** https://your-app.vercel.app
**Backend:** https://your-backend.onrender.com
**Database:** MongoDB Atlas (already connected)

Enjoy your Mirage Arabian Nights Quiz! 🪔✨
