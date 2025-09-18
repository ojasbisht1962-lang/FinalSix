# routes/quiz.py

from fastapi import APIRouter, HTTPException
from typing import List, Dict, Optional
from models.quiz import Question, QuizQuestions
from database import db

# Router created without a prefix
quiz_router = APIRouter(tags=["quiz"])

@quiz_router.get("/questions", response_model=QuizQuestions)
async def get_quiz_questions(class_level: str, stream: str = None):
    query = {"class_level": class_level}
    if stream:
        query["stream"] = stream

    # Exclude the _id field to avoid serialization issues
    quiz_doc = await db.quizzes.find_one(query, {"_id": 0})

    if not quiz_doc:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found for the given criteria."
        )

    questions = quiz_doc.get("questions", [])
    print(f"Found {len(questions)} questions for {class_level} {stream or ''}")
    print(f"First question: {questions[0] if questions else 'No questions'}")
    
    return {"questions": questions}

