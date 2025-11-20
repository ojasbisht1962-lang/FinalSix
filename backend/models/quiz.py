from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class Question(BaseModel):
    id: str
    text: str
    options: List[str]

class QuizQuestions(BaseModel):
    questions: List[Question]

class Answer(BaseModel):
    question_id: str
    answer: str

class QuizSubmission(BaseModel):
    user_id: str
    class_level: str
    answers: List[Answer]
    stream: Optional[str] = None