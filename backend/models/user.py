# models/user.py

from pydantic import BaseModel

class GuestUser(BaseModel):
    user_id: str
    message: str