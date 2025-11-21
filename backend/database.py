import os
from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB connection - all user data, quiz data, profiles stored here
MONGODB_URL = os.getenv(
    "MONGODB_URL", 
    "mongodb+srv://ojasbisht1962_db_user:Ojas@1962@clusterone.6a9q0rn.mongodb.net/?appName=ClusterOne"
)

# Database name for all application data
DATABASE_NAME = os.getenv("DATABASE_NAME", "arabian_nights_quiz")

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]

# Async function to get database instance
async def get_database():
    """Returns the database instance for all collections"""
    return db

# Collection names for reference
COLLECTIONS = {
    "users": "users",                           # User profiles (age, phone, google_id, etc.)
    "arabian_questions": "arabian_questions",   # Quiz questions
    "user_answers": "user_answers",             # Quiz attempts and history
    "leaderboard": "leaderboard",               # Leaderboard entries
    "badges": "badges",                         # User badges and achievements
}
