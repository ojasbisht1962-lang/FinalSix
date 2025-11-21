# Arabian Nights Quiz Backend

FastAPI backend server for Arabian Nights Quiz - an engaging quiz platform with user profiles, badges, and leaderboards.

## Features

- FastAPI web framework with async support
- MongoDB database integration (Motor driver)
- User authentication and profile management
- Arabian Nights quiz with multiple difficulty levels
- Real-time leaderboard (global and weekly)
- Badge and achievement system
- Quiz history tracking
- CORS configuration for frontend integration

## Database Configuration

All application data is stored in MongoDB:
- **Database**: `arabian_nights_quiz`
- **URI**: `mongodb+srv://ojasbisht1962_db_user:Ojas@1962@clusterone.6a9q0rn.mongodb.net/?appName=ClusterOne`

### Collections:
- `users` - User profiles (Google ID, age, phone, profile completion status)
- `arabian_questions` - Quiz questions (difficulty, story, correct answers)
- `user_answers` - Quiz attempts and history (scores, time, answers)
- `leaderboard` - Leaderboard entries (global and weekly rankings)
- `badges` - User badges and achievements

## Setup

1. **Install Python 3.8+** (tested with Python 3.14)

2. **Create virtual environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - MongoDB URL is pre-configured
   - Update `FRONTEND_URL` if needed

5. **Run the server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000`
- API docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

## API Endpoints

### User Management
- `POST /users/guest-login` - Guest login
- `GET /users/profile/{google_id}` - Get user profile
- `POST /users/profile` - Create/update profile
- `PUT /users/profile/{google_id}/complete` - Complete profile (age, phone)
- `DELETE /users/profile/{google_id}` - Delete account

### Arabian Quiz
- `GET /arabian-quiz/questions` - Get quiz questions (filter by difficulty, story)
- `POST /arabian-quiz/submit` - Submit quiz answers
- `GET /arabian-quiz/leaderboard/global` - Global leaderboard
- `GET /arabian-quiz/leaderboard/weekly` - Weekly leaderboard
- `GET /arabian-quiz/user/{user_id}/history` - User quiz history
- `GET /arabian-quiz/stats` - Quiz statistics

## Environment Variables

```env
MONGODB_URL=mongodb+srv://ojasbisht1962_db_user:Ojas@1962@clusterone.6a9q0rn.mongodb.net/?appName=ClusterOne
DATABASE_NAME=arabian_nights_quiz
FRONTEND_URL=https://matricks.vercel.app
```

## 🌐 Deployment (Render.com)

### Live Deployment
- **Backend API**: https://matricks.onrender.com
- **Frontend**: https://matricks.vercel.app

### Deploy to Render

1. **Connect your repository** to Render
2. **Create a new Web Service**
3. **Configure build settings**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

4. **Set environment variables** in Render dashboard:
   ```
   MONGODB_URL = mongodb+srv://ojasbisht1962_db_user:Ojas@1962@clusterone.6a9q0rn.mongodb.net/?appName=ClusterOne
   DATABASE_NAME = arabian_nights_quiz
   FRONTEND_URL = https://matricks.vercel.app
   PYTHON_VERSION = 3.11.0
   ```

5. **Deploy** - Render will automatically build and deploy

The `render.yaml` file contains all configuration for automatic deployment.

### Health Check
- Endpoint: `GET /`
- Response: `{"message": "Mirage - Arabian Nights Quiz API is running 🪔✨"}`

## 📊 Database Schema

### Collections

**users**
```json
{
  "google_id": "string",
  "name": "string",
  "email": "string",
  "picture": "string",
  "age": "number",
  "phone": "string",
  "profile_completed": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**arabian_questions**
```json
{
  "question_id": "string",
  "story": "string",
  "difficulty": "string",
  "question_text": "string",
  "options": ["array"],
  "correct_index": "number"
}
```

**user_answers** (Quiz History)
```json
{
  "google_id": "string",
  "username": "string",
  "score": "number",
  "total_questions": "number",
  "time_taken": "number",
  "difficulty": "string",
  "story": "string",
  "completed_at": "datetime",
  "answers": ["array"]
}
```

**leaderboard**
```json
{
  "google_id": "string",
  "username": "string",
  "score": "number",
  "rank": "number",
  "difficulty": "string",
  "story": "string",
  "week": "string"
}
```
