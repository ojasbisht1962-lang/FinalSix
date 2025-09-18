# routes/answers.py

from fastapi import APIRouter
from models.quiz import QuizSubmission
from database import db
from datetime import datetime

answers_router = APIRouter(tags=["answers"])

@answers_router.post("/submit")
async def submit_answers(quiz_submission: QuizSubmission):
    user_answers = quiz_submission.model_dump()
    user_answers["timestamp"] = datetime.utcnow()
    await db.user_answers.insert_one(user_answers)
    return {"message": "Answers submitted successfully"}
