import os
from motor.motor_asyncio import AsyncIOMotorClient

# Use environment variable for production, fallback to hardcoded for development
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb+srv://ojasbisht1962_db_user:LdYXdQ3eO543G3Ka@clusterone.6a9q0rn.mongodb.net/")

client = AsyncIOMotorClient(MONGODB_URL)
db = client["career_guidance"]  # Using existing database
