# routes/users.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import uuid
from services.user_service import UserService

# Router created without a prefix
users_router = APIRouter(tags=["users"])

class GuestUser(BaseModel):
    user_id: str
    message: str

class UserProfile(BaseModel):
    google_id: str
    name: str
    email: str
    picture: Optional[str] = None
    age: Optional[int] = None
    phone: Optional[str] = None
    profile_completed: bool = False

class UpdateProfileRequest(BaseModel):
    age: int
    phone: str

class DeleteUserRequest(BaseModel):
    google_id: str

@users_router.post("/guest-login", response_model=GuestUser)
async def guest_login():
    guest_id = str(uuid.uuid4())
    return {"user_id": guest_id, "message": "Guest user logged in successfully"}

# Get user profile
@users_router.get("/profile/{google_id}")
async def get_user_profile(google_id: str):
    """Get user profile by Google ID"""
    try:
        profile = await UserService.get_user_profile(google_id)
        if profile:
            return {"success": True, "profile": profile}
        return {"success": False, "message": "Profile not found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Create or update user profile
@users_router.post("/profile")
async def create_or_update_profile(profile: UserProfile):
    """Create or update user profile"""
    try:
        result = await UserService.create_or_update_profile(profile.dict())
        return {"success": True, "profile": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Complete user profile (add age and phone)
@users_router.put("/profile/{google_id}/complete")
async def complete_user_profile(google_id: str, data: UpdateProfileRequest):
    """Complete user profile with age and phone"""
    try:
        result = await UserService.complete_profile(google_id, data.age, data.phone)
        if result:
            return {"success": True, "profile": result}
        return {"success": False, "message": "Profile not found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Update user profile
@users_router.put("/profile/{google_id}")
async def update_user_profile(google_id: str, data: UpdateProfileRequest):
    """Update user profile"""
    try:
        result = await UserService.update_profile(google_id, data.dict(exclude_unset=True))
        if result:
            return {"success": True, "profile": result}
        return {"success": False, "message": "Profile not found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Delete user account
@users_router.delete("/profile/{google_id}")
async def delete_user_account(google_id: str):
    """Delete user account and all associated data"""
    try:
        result = await UserService.delete_user_account(google_id)
        return {"success": True, "message": "Account deleted successfully", "deleted_count": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
