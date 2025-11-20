from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ArabianQuestion(BaseModel):
    id: str
    question: str
    options: List[str]
    answer_index: int
    difficulty: str  # easy, medium, hard
    story: str  # Aladdin, Ali Baba, Sinbad, etc.
    explanation: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "aq001",
                "question": "What did Aladdin find in the cave?",
                "options": ["Gold coins", "Magic lamp", "Jewels", "Carpet"],
                "answer_index": 1,
                "difficulty": "easy",
                "story": "Aladdin",
                "explanation": "Aladdin found a magic lamp that contained a powerful genie."
            }
        }

class ArabianQuizResult(BaseModel):
    user_id: str
    username: Optional[str] = "Traveler"
    score: int
    total_questions: int
    difficulty: str
    story: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    time_taken: Optional[int] = None  # in seconds
    answers: Optional[List[dict]] = None  # Store user's answers for review
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "user123",
                "score": 18,
                "total_questions": 20,
                "difficulty": "medium",
                "story": "Aladdin",
                "timestamp": "2025-11-20T10:30:00",
                "time_taken": 240,
                "answers": []
            }
        }

class QuizSubmission(BaseModel):
    user_id: str
    username: Optional[str] = "Traveler"
    difficulty: str
    story: str
    answers: List[dict]  # [{question_id, selected_index, time_taken}]
    total_time: int

class LeaderboardEntry(BaseModel):
    user_id: str
    username: str
    score: int
    total_questions: int
    difficulty: str
    story: str
    timestamp: datetime
    rank: Optional[int] = None
