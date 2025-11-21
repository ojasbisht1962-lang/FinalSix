# services/user_service.py

from database import get_database
from datetime import datetime
from typing import Optional, Dict, Any

class UserService:
    """Service for managing user profiles and accounts"""
    
    @staticmethod
    async def get_user_profile(google_id: str) -> Optional[Dict[str, Any]]:
        """Get user profile by Google ID"""
        db = await get_database()
        users_collection = db["users"]
        
        user = await users_collection.find_one({"google_id": google_id})
        if user:
            user["_id"] = str(user["_id"])
            return user
        return None
    
    @staticmethod
    async def create_or_update_profile(profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create or update user profile"""
        db = await get_database()
        users_collection = db["users"]
        
        google_id = profile_data.get("google_id")
        
        # Check if user exists
        existing_user = await users_collection.find_one({"google_id": google_id})
        
        if existing_user:
            # Update existing user
            update_data = {
                "name": profile_data.get("name", existing_user.get("name")),
                "email": profile_data.get("email", existing_user.get("email")),
                "picture": profile_data.get("picture", existing_user.get("picture")),
                "updated_at": datetime.utcnow()
            }
            
            # Only update age/phone if provided
            if "age" in profile_data:
                update_data["age"] = profile_data["age"]
            if "phone" in profile_data:
                update_data["phone"] = profile_data["phone"]
            
            # Check if profile is completed
            if update_data.get("age") and update_data.get("phone"):
                update_data["profile_completed"] = True
            
            await users_collection.update_one(
                {"google_id": google_id},
                {"$set": update_data}
            )
            
            updated_user = await users_collection.find_one({"google_id": google_id})
            updated_user["_id"] = str(updated_user["_id"])
            return updated_user
        else:
            # Create new user
            new_user = {
                "google_id": google_id,
                "name": profile_data.get("name"),
                "email": profile_data.get("email"),
                "picture": profile_data.get("picture"),
                "age": profile_data.get("age"),
                "phone": profile_data.get("phone"),
                "profile_completed": bool(profile_data.get("age") and profile_data.get("phone")),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = await users_collection.insert_one(new_user)
            new_user["_id"] = str(result.inserted_id)
            return new_user
    
    @staticmethod
    async def complete_profile(google_id: str, age: int, phone: str) -> Optional[Dict[str, Any]]:
        """Complete user profile with age and phone"""
        db = await get_database()
        users_collection = db["users"]
        
        update_data = {
            "age": age,
            "phone": phone,
            "profile_completed": True,
            "updated_at": datetime.utcnow()
        }
        
        result = await users_collection.update_one(
            {"google_id": google_id},
            {"$set": update_data}
        )
        
        if result.modified_count > 0 or result.matched_count > 0:
            user = await users_collection.find_one({"google_id": google_id})
            if user:
                user["_id"] = str(user["_id"])
                return user
        
        return None
    
    @staticmethod
    async def update_profile(google_id: str, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update user profile"""
        db = await get_database()
        users_collection = db["users"]
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Check if profile is completed after update
        user = await users_collection.find_one({"google_id": google_id})
        if user:
            age = update_data.get("age", user.get("age"))
            phone = update_data.get("phone", user.get("phone"))
            if age and phone:
                update_data["profile_completed"] = True
        
        result = await users_collection.update_one(
            {"google_id": google_id},
            {"$set": update_data}
        )
        
        if result.modified_count > 0 or result.matched_count > 0:
            updated_user = await users_collection.find_one({"google_id": google_id})
            if updated_user:
                updated_user["_id"] = str(updated_user["_id"])
                return updated_user
        
        return None
    
    @staticmethod
    async def delete_user_account(google_id: str) -> int:
        """Delete user account and all associated data"""
        db = await get_database()
        
        # Delete from all collections
        deleted_count = 0
        
        # Delete user profile
        users_collection = db["users"]
        result = await users_collection.delete_one({"google_id": google_id})
        deleted_count += result.deleted_count
        
        # Delete quiz history
        quiz_collection = db["user_answers"]
        result = await quiz_collection.delete_many({"google_id": google_id})
        deleted_count += result.deleted_count
        
        # Delete from leaderboard
        leaderboard_collection = db["leaderboard"]
        result = await leaderboard_collection.delete_many({"google_id": google_id})
        deleted_count += result.deleted_count
        
        return deleted_count
