# filepath: d:\computerlangs\Career Guidance Platform\Backend\database.py
# ...existing code...
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb+srv://ojasbisht1962_db_user:LdYXdQ3eO543G3Ka@clusterone.6a9q0rn.mongodb.net/")
db = client["career_guidance"]  # Make sure this matches your Compass database
# ...existing code...
