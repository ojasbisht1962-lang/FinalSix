
from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from models.arabian_quiz import QuizSubmission, ArabianQuizResult
from services.arabian_quiz_service import (
    get_questions_by_difficulty,
    get_question_with_answer,
    save_quiz_result,
    get_global_leaderboard,
    get_weekly_leaderboard,
    get_user_quiz_history
)

router = APIRouter()

@router.get("/questions")
async def get_quiz_questions(
    difficulty: str = Query(default="all", description="Filter by difficulty: easy, medium, hard, or all"),
    story: str = Query(default="all", description="Filter by story: Aladdin, Ali Baba, Sinbad, Scheherazade, or all"),
    limit: int = Query(default=20, description="Number of questions to return")
):
    """
    Get Arabian Nights quiz questions
    
    Query Parameters:
    - difficulty: easy, medium, hard, or all
    - story: Aladdin, Ali Baba, Sinbad, Scheherazade, or all
    - limit: number of questions (default 20)
    """
    try:
        questions = await get_questions_by_difficulty(difficulty, story, limit)
        
        if not questions:
            raise HTTPException(status_code=404, detail="No questions found matching the criteria")
        
        return {
            "success": True,
            "count": len(questions),
            "difficulty": difficulty,
            "story": story,
            "questions": questions
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/submit")
async def submit_quiz(submission: QuizSubmission):
    """
    Submit quiz answers and get results
    
    Request Body:
    - user_id: User's unique identifier
    - username: User's display name (optional)
    - difficulty: Quiz difficulty
    - story: Story theme
    - answers: List of answer objects [{question_id, selected_index, time_taken}]
    - total_time: Total time taken in seconds
    """
    try:
        # Validate answers and calculate score
        score = 0
        detailed_answers = []
        
        for answer in submission.answers:
            question = await get_question_with_answer(answer["question_id"])
            
            if not question:
                continue
            
            is_correct = answer["selected_index"] == question["answer_index"]
            if is_correct:
                score += 1
            
            detailed_answers.append({
                "question_id": question["id"],
                "question": question["question"],
                "options": question["options"],
                "selected_index": answer["selected_index"],
                "correct_index": question["answer_index"],
                "is_correct": is_correct,
                "explanation": question["explanation"],
                "time_taken": answer.get("time_taken", 0)
            })
        
        # Save result
        result = await save_quiz_result(
            user_id=submission.user_id,
            score=score,
            total_questions=len(submission.answers),
            difficulty=submission.difficulty,
            story=submission.story,
            answers=detailed_answers,
            total_time=submission.total_time,
            username=submission.username or "Traveler"
        )
        
        if not result:
            raise HTTPException(status_code=500, detail="Failed to save quiz result")
        
        return {
            "success": True,
            "score": score,
            "total_questions": len(submission.answers),
            "percentage": round((score / len(submission.answers)) * 100, 2),
            "answers": detailed_answers,
            "time_taken": submission.total_time
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/leaderboard/global")
async def get_global_leaderboard_route(
    difficulty: str = Query(default="all", description="Filter by difficulty"),
    story: str = Query(default="all", description="Filter by story"),
    limit: int = Query(default=100, description="Number of entries to return")
):
    """
    Get global leaderboard
    
    Query Parameters:
    - difficulty: Filter by difficulty (default: all)
    - story: Filter by story (default: all)
    - limit: Number of entries (default: 100)
    """
    try:
        leaderboard = await get_global_leaderboard(difficulty, story, limit)
        
        return {
            "success": True,
            "type": "global",
            "difficulty": difficulty,
            "story": story,
            "count": len(leaderboard),
            "leaderboard": leaderboard
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/leaderboard/weekly")
async def get_weekly_leaderboard_route(
    difficulty: str = Query(default="all", description="Filter by difficulty"),
    story: str = Query(default="all", description="Filter by story"),
    limit: int = Query(default=100, description="Number of entries to return")
):
    """
    Get weekly leaderboard (last 7 days)
    
    Query Parameters:
    - difficulty: Filter by difficulty (default: all)
    - story: Filter by story (default: all)
    - limit: Number of entries (default: 100)
    """
    try:
        leaderboard = await get_weekly_leaderboard(difficulty, story, limit)
        
        return {
            "success": True,
            "type": "weekly",
            "difficulty": difficulty,
            "story": story,
            "count": len(leaderboard),
            "leaderboard": leaderboard
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}/history")
async def get_user_history(
    user_id: str,
    limit: int = Query(default=20, description="Number of quiz attempts to return")
):
    """
    Get a user's quiz history
    
    Path Parameters:
    - user_id: User's unique identifier
    
    Query Parameters:
    - limit: Number of quiz attempts to return (default: 20)
    """
    try:
        history = await get_user_quiz_history(user_id, limit)
        
        return {
            "success": True,
            "user_id": user_id,
            "count": len(history),
            "history": history
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats")
async def get_quiz_stats():
    """Get overall quiz statistics"""
    try:
        from services.arabian_quiz_service import db
        
        questions_collection = db["arabian_questions"]
        results_collection = db["arabian_quiz_results"]
        
        total_questions = await questions_collection.count_documents({})
        total_attempts = await results_collection.count_documents({})
        
        # Get difficulty distribution
        difficulties = await questions_collection.distinct("difficulty")
        difficulty_counts = {}
        for diff in difficulties:
            count = await questions_collection.count_documents({"difficulty": diff})
            difficulty_counts[diff] = count
        
        # Get story distribution
        stories = await questions_collection.distinct("story")
        story_counts = {}
        for story in stories:
            count = await questions_collection.count_documents({"story": story})
            story_counts[story] = count
        
        return {
            "success": True,
            "total_questions": total_questions,
            "total_quiz_attempts": total_attempts,
            "difficulty_distribution": difficulty_counts,
            "story_distribution": story_counts
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
