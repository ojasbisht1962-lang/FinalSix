# main.py

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.arabian_quiz import router as arabian_quiz_router
from routes.users import router as users_router

app = FastAPI(title="Mirage - Arabian Nights Quiz API")

# Configure CORS for production and development
allowed_origins = [
    "http://localhost:3000", 
    "http://localhost:5173",
    "https://vercel.app",  # Base Vercel domain
    "https://matricks.vercel.app",  # Main production frontend URL
    "https://matricks-git-main-ojasbisht1962-langs-projects.vercel.app",  # Git deployment
    "https://*.vercel.app",  # All Vercel preview deployments
]
# Add production frontend URL when deployed from environment variable
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now, can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(arabian_quiz_router, prefix="/arabian-quiz")
app.include_router(users_router, prefix="/users")

@app.get("/")
def home():
    return {"message": "Mirage - Arabian Nights Quiz API is running 🪔✨"}
