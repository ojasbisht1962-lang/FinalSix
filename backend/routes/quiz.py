# routes/quiz.py

from fastapi import APIRouter, HTTPException
from typing import List, Dict, Optional
from models.quiz import Question, QuizQuestions
from database import db
from datetime import datetime

# Router created without a prefix
quiz_router = APIRouter(tags=["quiz"])

def format_mongo_doc(doc):
    """Converts MongoDB's ObjectId to a string and returns a clean dict."""
    if doc is None:
        return None
    doc['_id'] = str(doc['_id'])
    return doc

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

@quiz_router.get("/history/{user_id}")
async def get_quiz_history(user_id: str):
    """
    Get quiz history for a specific user from user_answers collection.
    Only for Google authenticated users.
    """
    try:
        # Fetch all quiz submissions for this user, sorted by most recent
        cursor = db.user_answers.find(
            {"user_id": user_id}
        ).sort("timestamp", -1)  # Sort by timestamp descending (most recent first)
        
        quiz_history = []
        async for doc in cursor:
            formatted_doc = format_mongo_doc(doc)
            
            # Add additional computed fields for better display
            if formatted_doc.get("timestamp"):
                # Ensure timestamp is in ISO format for frontend
                if isinstance(formatted_doc["timestamp"], datetime):
                    formatted_doc["created_at"] = formatted_doc["timestamp"].isoformat()
                else:
                    formatted_doc["created_at"] = formatted_doc["timestamp"]
            
            # Add total questions count if available
            if "answers" in formatted_doc:
                formatted_doc["total_questions"] = len(formatted_doc["answers"])
            
            quiz_history.append(formatted_doc)
        
        return {
            "user_id": user_id,
            "total_quizzes": len(quiz_history),
            "quizzes": quiz_history
        }
        
    except Exception as e:
        print(f"Error fetching quiz history for user {user_id}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch quiz history: {str(e)}"
        )

