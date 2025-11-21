# Arabian Nights Quiz Frontend

An engaging quiz platform featuring Arabian Nights stories, built with React, Vite, and Tailwind CSS. Includes user profiles, badges, leaderboards, and interactive quiz gameplay.

## 🌟 Features

- **Interactive Quiz System** - Answer feedback, timer, difficulty levels
- **User Authentication** - Google Sign-In integration
- **Profile Management** - Age, phone, profile completion flow
- **Badge System** - 12 achievement types with progress tracking
- **Leaderboard** - Top 3 podium, global & weekly rankings
- **Quiz History** - Track all quiz attempts with stats
- **Modern UI** - Tailwind CSS, gradient effects, animations
- **Responsive Design** - Mobile-friendly interface

## 🚀 Live Deployment

- **Frontend**: https://matricks.vercel.app
- **Backend**: https://matricks.onrender.com

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router v6
- Axios
- Lucide React Icons

## 📦 Local Development

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Update `VITE_API_URL` for local backend (default: http://localhost:8000)

3. **Run development server**:
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173 in your browser

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🌐 Deployment (Vercel)

1. **Connect your repository** to Vercel
2. **Set environment variables**:
   - `VITE_API_URL` = `https://matricks.onrender.com`
   - `VITE_GOOGLE_CLIENT_ID` = Your Google OAuth client ID

3. **Deploy** - Vercel will automatically build and deploy

The `vercel.json` configuration handles:
- SPA routing (rewrites to index.html)
- Environment variables
- Security headers

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── BadgesSection.jsx
│   │   ├── Podium.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ScrollToTop.jsx
│   ├── routes/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── ArabianQuizPlay.jsx
│   │   ├── ArabianLeaderboard.jsx
│   │   └── UserProfilePage.jsx
│   ├── contexts/         # React context
│   │   └── AuthContext.jsx
│   ├── services/         # API calls
│   │   └── api.js
│   ├── data/             # Static data
│   │   ├── badgesData.js
│   │   └── arabianTheme.js
│   └── App.jsx           # Main app component
├── public/
│   └── images/
└── vercel.json           # Vercel configuration
```

## 🔑 Environment Variables

```env
VITE_API_URL=https://matricks.onrender.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🎯 Key Features Implemented

### Protected Routes
- Quiz pages require authentication
- Auto-redirect to login for unauthenticated users
- Loading states during auth check

### Auto-Scroll
- Automatically scrolls to top on page navigation
- Smooth user experience

### Quiz Feedback System
- ✅ Correct/❌ Wrong answer indicators
- Shows correct answer on timeout
- 3-second delay before next question

### Badge System
- 12 badge types (First Quiz, Perfect Score, Speed Demon, etc.)
- Progress tracking (X/12 earned)
- Visual earned/locked states

### Leaderboard Podium
- Top 3 players on gold/silver/bronze podiums
- Current user position highlighted
- Animated effects and medals


... (rest of the original Create React App documentation) ...