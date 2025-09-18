# routes/users.py

from fastapi import APIRouter
from pydantic import BaseModel
import uuid

# Router created without a prefix
users_router = APIRouter(tags=["users"])

class GuestUser(BaseModel):
    user_id: str
    message: str

@users_router.post("/guest-login", response_model=GuestUser)
async def guest_login():
    guest_id = str(uuid.uuid4())
    return {"user_id": guest_id, "message": "Guest user logged in successfully"}
