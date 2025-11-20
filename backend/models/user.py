# models/user.py

from pydantic import BaseModel
from typing import List, Optional

class GuestUser(BaseModel):
    user_id: str
    message: str

class User(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    total_arabian_score: int = 0
    arabian_quizzes_taken: int = 0
    highest_arabian_score: int = 0
    badges: List[str] = []
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "user123",
                "name": "John Doe",
                "email": "john@example.com",
                "total_arabian_score": 150,
                "arabian_quizzes_taken": 5,
                "highest_arabian_score": 18,
                "badges": ["Story Master", "Speed Genie"]
            }
        }