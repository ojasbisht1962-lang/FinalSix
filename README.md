# 🪔 Arabian Nights Quiz - Matricks

An immersive quiz platform featuring tales from Arabian Nights with user profiles, achievements, and competitive leaderboards.

## 🌐 Live Deployment

- **Frontend**: [https://matricks.vercel.app](https://matricks.vercel.app)
- **Backend API**: [https://matricks.onrender.com](https://matricks.onrender.com)
- **API Docs**: [https://matricks.onrender.com/docs](https://matricks.onrender.com/docs)

## ✨ Features

### 🎮 Quiz System
- Multiple difficulty levels (Easy, Medium, Hard)
- Story-based questions (Aladdin, Ali Baba, Sinbad, Scheherazade)
- Real-time answer feedback with visual indicators
- Timer with auto-submission
- Answer explanations on timeout

### 👤 User Management
- Google OAuth authentication
- Profile completion (age, phone)
- Account deletion with confirmation
- Protected routes for authenticated users

### 🏆 Gamification
- **Badges System**: 12 achievement types
  - First Quiz, Quiz Milestones (5, 10, 25, 50)
  - Perfect Score, High Scorer, Speed Demon
  - Story Explorer, Difficulty Master
  - Win Streak, Night Owl
- **Leaderboard**: 
  - Global and weekly rankings
  - Top 3 podium display (Gold, Silver, Bronze)
  - Current user position tracking
- **Quiz History**: Complete attempt history with stats

### 🎨 User Experience
- Modern UI with Arabian Nights theme
- Responsive design (mobile-friendly)
- Auto-scroll to top on navigation
- Loading states and error handling
- Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB Atlas
- **ODM**: Motor (async MongoDB driver)
- **Auth**: Google OAuth 2.0
- **Deployment**: Render.com

### Database
- **Provider**: MongoDB Atlas
- **Database**: `arabian_nights_quiz`
- **Collections**: 
  - `users` - User profiles
  - `arabian_questions` - Quiz questions
  - `user_answers` - Quiz attempts/history
  - `leaderboard` - Rankings
  - `badges` - Achievements

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Python 3.11+
- MongoDB Atlas account

### Local Development

#### Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 for frontend and http://localhost:8000/docs for API docs.

## 📁 Project Structure

```
FinalSix-master/
├── backend/
│   ├── main.py                 # FastAPI app entry
│   ├── database.py             # MongoDB connection
│   ├── routes/
│   │   ├── users.py            # User endpoints
│   │   └── arabian_quiz.py     # Quiz endpoints
│   ├── services/
│   │   ├── user_service.py     # User business logic
│   │   └── arabian_quiz_service.py  # Quiz logic
│   ├── requirements.txt
│   ├── render.yaml             # Render deployment config
│   └── .env                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── routes/             # Page components
│   │   ├── contexts/           # React contexts
│   │   ├── services/           # API services
│   │   └── data/               # Static data
│   ├── vercel.json             # Vercel deployment config
│   └── .env.production         # Production env vars
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URL=mongodb+srv://ojasbisht1962_db_user:Ojas@1962@clusterone.6a9q0rn.mongodb.net/?appName=ClusterOne
DATABASE_NAME=arabian_nights_quiz
FRONTEND_URL=https://matricks.vercel.app
```

### Frontend (.env.production)
```env
VITE_API_URL=https://matricks.onrender.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 📊 API Endpoints

### User Management
- `POST /users/guest-login` - Guest login
- `GET /users/profile/{google_id}` - Get profile
- `POST /users/profile` - Create/update profile
- `PUT /users/profile/{google_id}/complete` - Complete profile
- `DELETE /users/profile/{google_id}` - Delete account

### Quiz
- `GET /arabian-quiz/questions` - Get questions
- `POST /arabian-quiz/submit` - Submit answers
- `GET /arabian-quiz/leaderboard/global` - Global leaderboard
- `GET /arabian-quiz/leaderboard/weekly` - Weekly leaderboard
- `GET /arabian-quiz/user/{user_id}/history` - Quiz history
- `GET /arabian-quiz/stats` - Quiz statistics

## 🚢 Deployment

### Backend (Render.com)
1. Connect GitHub repository to Render
2. Create Web Service
3. Set environment variables from `render.yaml`
4. Deploy automatically on push to main branch

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📝 License

This project is part of a hackathon submission.

## 👥 Contributors

- Ojas Bisht (@ojasbisht1962-lang)

---

**Built with ❤️ for Arabian Nights enthusiasts**
