from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timedelta
from typing import List, Optional
import os
from dotenv import load_dotenv
import random

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb+srv://ojasbisht1962_db_user:LdYXdQ3eO543G3Ka@clusterone.6a9q0rn.mongodb.net/")
DATABASE_NAME = os.getenv("DATABASE_NAME", "career_guidance")

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]

async def get_questions_by_difficulty(difficulty: str = "all", story: str = "all", limit: int = 20) -> List[dict]:
    """
    Get Arabian Nights quiz questions filtered by difficulty and/or story
    
    Args:
        difficulty: Filter by difficulty (easy/medium/hard/all)
        story: Filter by story (Aladdin/Ali Baba/Sinbad/Scheherazade/all)
        limit: Maximum number of questions to return
    
    Returns:
        List of question dictionaries
    """
    try:
        collection = db["arabian_questions"]
        query = {}
        
        if difficulty != "all":
            query["difficulty"] = difficulty
        
        if story != "all":
            query["story"] = story
        
        questions = await collection.find(query).to_list(length=None)
        
        # Randomize questions
        random.shuffle(questions)
        
        # Limit the number of questions
        questions = questions[:limit]
        
        # Remove the correct answer from the response (send only for validation)
        questions_without_answers = []
        for q in questions:
            q["_id"] = str(q["_id"])
            questions_without_answers.append({
                "id": q["id"],
                "question": q["question"],
                "options": q["options"],
                "difficulty": q["difficulty"],
                "story": q["story"]
            })
        
        return questions_without_answers
    
    except Exception as e:
        print(f"Error fetching questions: {e}")
        return []

async def get_question_with_answer(question_id: str) -> Optional[dict]:
    """Get a single question with its answer for validation"""
    try:
        collection = db["arabian_questions"]
        question = await collection.find_one({"id": question_id})
        if question:
            question["_id"] = str(question["_id"])
        return question
    except Exception as e:
        print(f"Error fetching question: {e}")
        return None

async def save_quiz_result(user_id: str, score: int, total_questions: int, 
                          difficulty: str, story: str, answers: List[dict], 
                          total_time: int, username: str = "Traveler") -> dict:
    """
    Save a quiz result to the database
    
    Args:
        user_id: User's unique identifier
        score: Number of correct answers
        total_questions: Total number of questions in the quiz
        difficulty: Quiz difficulty level
        story: Story theme selected
        answers: List of answer objects with question details
        total_time: Total time taken in seconds
        username: User's display name
    
    Returns:
        The saved result document
    """
    try:
        collection = db["arabian_quiz_results"]
        
        result = {
            "user_id": user_id,
            "username": username,
            "score": score,
            "total_questions": total_questions,
            "difficulty": difficulty,
            "story": story,
            "timestamp": datetime.utcnow(),
            "time_taken": total_time,
            "answers": answers,
            "percentage": round((score / total_questions) * 100, 2)
        }
        
        await collection.insert_one(result)
        result["_id"] = str(result["_id"])
        
        # Update user statistics
        await update_user_stats(user_id, score, total_questions, username)
        
        # Award badges if applicable
        await check_and_award_badges(user_id, score, total_questions, total_time)
        
        return result
    
    except Exception as e:
        print(f"Error saving quiz result: {e}")
        return None

async def update_user_stats(user_id: str, score: int, total_questions: int, username: str = "Traveler"):
    """Update user's Arabian quiz statistics"""
    try:
        users_collection = db["users"]
        user = await users_collection.find_one({"_id": user_id})
        
        if user:
            total_arabian_score = user.get("total_arabian_score", 0) + score
            arabian_quizzes_taken = user.get("arabian_quizzes_taken", 0) + 1
            highest_arabian_score = max(user.get("highest_arabian_score", 0), score)
            
            await users_collection.update_one(
                {"_id": user_id},
                {
                    "$set": {
                        "username": username,
                        "total_arabian_score": total_arabian_score,
                        "arabian_quizzes_taken": arabian_quizzes_taken,
                        "highest_arabian_score": highest_arabian_score
                    }
                }
            )
        else:
            # Create new user record
            await users_collection.insert_one({
                "_id": user_id,
                "username": username,
                "total_arabian_score": score,
                "arabian_quizzes_taken": 1,
                "highest_arabian_score": score,
                "badges": []
            })
    except Exception as e:
        print(f"Error updating user stats: {e}")

async def check_and_award_badges(user_id: str, score: int, total_questions: int, total_time: int):
    """Check and award badges based on performance"""
    try:
        users_collection = db["users"]
        user = await users_collection.find_one({"_id": user_id})
        
        if not user:
            return
        
        badges = user.get("badges", [])
        new_badges = []
        
        # Story Master - 100% score
        if score == total_questions and "Story Master" not in badges:
            new_badges.append("Story Master")
        
        # Speed Genie - Complete under 5 seconds per question
        avg_time = total_time / total_questions
        if avg_time < 5 and "Speed Genie" not in badges:
            new_badges.append("Speed Genie")
        
        # Explorer - Check if completed all difficulties
        results_collection = db["arabian_quiz_results"]
        user_results = await results_collection.find({"user_id": user_id}).to_list(length=None)
        difficulties_completed = set(r["difficulty"] for r in user_results)
        if len(difficulties_completed) >= 3 and "Explorer" not in badges:
            new_badges.append("Explorer")
        
        # Persistent Scholar - Taken 10+ quizzes
        if len(user_results) >= 10 and "Persistent Scholar" not in badges:
            new_badges.append("Persistent Scholar")
        
        # Perfect Score - 90%+ score
        percentage = (score / total_questions) * 100
        if percentage >= 90 and "High Achiever" not in badges:
            new_badges.append("High Achiever")
        
        if new_badges:
            all_badges = badges + new_badges
            await users_collection.update_one(
                {"_id": user_id},
                {"$set": {"badges": all_badges}}
            )
    
    except Exception as e:
        print(f"Error awarding badges: {e}")

async def get_global_leaderboard(difficulty: str = "all", story: str = "all", limit: int = 100) -> List[dict]:
    """
    Get global leaderboard
    
    Args:
        difficulty: Filter by difficulty
        story: Filter by story
        limit: Maximum number of entries
    
    Returns:
        List of leaderboard entries sorted by score
    """
    try:
        collection = db["arabian_quiz_results"]
        users_collection = db["users"]
        
        query = {}
        if difficulty != "all":
            query["difficulty"] = difficulty
        if story != "all":
            query["story"] = story
        
        # Get all results matching the filter
        results = await collection.find(query).to_list(length=None)
        
        # Group by user and get their best score
        user_best_scores = {}
        for result in results:
            user_id = result["user_id"]
            score = result["score"]
            
            if user_id not in user_best_scores or score > user_best_scores[user_id]["score"]:
                user_best_scores[user_id] = result
        
        # Sort by score descending
        leaderboard = sorted(user_best_scores.values(), 
                           key=lambda x: (x["score"], -x["time_taken"]), 
                           reverse=True)[:limit]
        
        # Add rank and ensure username is present
        for idx, entry in enumerate(leaderboard):
            # Use username from quiz result, or fetch from users collection if not present
            if "username" not in entry or not entry["username"]:
                user = await users_collection.find_one({"_id": entry["user_id"]})
                entry["username"] = user.get("username", user.get("name", "Anonymous")) if user else "Anonymous"
            entry["rank"] = idx + 1
            entry["_id"] = str(entry["_id"])
        
        return leaderboard
    
    except Exception as e:
        print(f"Error fetching global leaderboard: {e}")
        return []

async def get_weekly_leaderboard(difficulty: str = "all", story: str = "all", limit: int = 100) -> List[dict]:
    """
    Get weekly leaderboard (last 7 days)
    
    Args:
        difficulty: Filter by difficulty
        story: Filter by story
        limit: Maximum number of entries
    
    Returns:
        List of leaderboard entries from the last 7 days
    """
    try:
        collection = db["arabian_quiz_results"]
        users_collection = db["users"]
        
        # Calculate date 7 days ago
        week_ago = datetime.utcnow() - timedelta(days=7)
        
        query = {"timestamp": {"$gte": week_ago}}
        if difficulty != "all":
            query["difficulty"] = difficulty
        if story != "all":
            query["story"] = story
        
        # Get all results from the last week
        results = await collection.find(query).to_list(length=None)
        
        # Group by user and get their best score
        user_best_scores = {}
        for result in results:
            user_id = result["user_id"]
            score = result["score"]
            
            if user_id not in user_best_scores or score > user_best_scores[user_id]["score"]:
                user_best_scores[user_id] = result
        
        # Sort by score descending
        leaderboard = sorted(user_best_scores.values(), 
                           key=lambda x: (x["score"], -x["time_taken"]), 
                           reverse=True)[:limit]
        
        # Add rank and ensure username is present
        for idx, entry in enumerate(leaderboard):
            # Use username from quiz result, or fetch from users collection if not present
            if "username" not in entry or not entry["username"]:
                user = await users_collection.find_one({"_id": entry["user_id"]})
                entry["username"] = user.get("username", user.get("name", "Anonymous")) if user else "Anonymous"
            entry["rank"] = idx + 1
            entry["_id"] = str(entry["_id"])
        
        return leaderboard
    
    except Exception as e:
        print(f"Error fetching weekly leaderboard: {e}")
        return []

async def get_user_quiz_history(user_id: str, limit: int = 20) -> List[dict]:
    """Get a user's quiz history"""
    try:
        collection = db["arabian_quiz_results"]
        
        results = await collection.find({"user_id": user_id})\
                                  .sort("timestamp", -1)\
                                  .limit(limit)\
                                  .to_list(length=limit)
        
        for result in results:
            result["_id"] = str(result["_id"])
        
        return results
    
    except Exception as e:
        print(f"Error fetching user quiz history: {e}")
        return []
