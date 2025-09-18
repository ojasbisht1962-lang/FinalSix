from fastapi import APIRouter
from database import db

auth_router = APIRouter(prefix="/auth", tags=["Auth"])

@auth_router.post("/guest-login")
async def guest_login():
    guest = {"type": "guest"}
    result = await db["users"].insert_one(guest)
    return {"guest_id": str(result.inserted_id)}

