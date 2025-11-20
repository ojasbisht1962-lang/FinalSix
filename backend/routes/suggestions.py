# routes/suggestions.py

from fastapi import APIRouter, HTTPException
from typing import Dict, List, Any
from database import db

suggestions_router = APIRouter(tags=["suggestions"])

# --- START OF FIX ---
def format_mongo_doc(doc):
    """Converts MongoDB's ObjectId to a string and returns a clean dict."""
    doc['_id'] = str(doc['_id'])
    return doc
# --- END OF FIX ---

# A simple scoring system mapping positive answers to keywords
SCORE_MAP = {
    "Yes": 1,
    "Strongly Agree": 2,
    "Agree": 1,
}

# Mapping of question IDs to keywords for below-10 quiz
BELOW_10_MAPPING = {
    "q1": "logical puzzles", "q2": "technology", "q3": "creative",
    "q4": "numbers", "q5": "artistic", "q6": "history",
    "q7": "science", "q8": "communication", "q9": "numbers",
    "q10": "collaboration", "q11": "science", "q12": "communication",
    "q13": "organizing", "q14": "memory", "q15": "communication"
}

@suggestions_router.get("/get")
async def get_suggestions(user_id: str):
    """
    Provides dynamic suggestions based on a user's quiz answers.
    """
    user_answers = await db.user_answers.find_one(
        {"user_id": user_id}, sort=[("timestamp", -1)]
    )

    if not user_answers:
        raise HTTPException(status_code=404, detail="No quiz answers found for this user.")

    class_level = user_answers.get("class_level")
    stream = user_answers.get("stream")
    answers_dict = {ans['question_id']: ans['answer'] for ans in user_answers.get('answers', [])}
    
    suggestions = {}

    if class_level == "below-10":
        stream_scores = {"science": 0, "commerce": 0, "arts": 0}
        
        for q_id, answer in answers_dict.items():
            keyword = BELOW_10_MAPPING.get(q_id)
            if keyword:
                if keyword in ["logical puzzles", "technology", "science"]:
                    stream_scores["science"] += SCORE_MAP.get(answer, 0)
                elif keyword in ["numbers", "organizing"]:
                    stream_scores["commerce"] += SCORE_MAP.get(answer, 0)
                elif keyword in ["creative", "artistic", "history", "communication"]:
                    stream_scores["arts"] += SCORE_MAP.get(answer, 0)
        
        suggested_stream = max(stream_scores, key=stream_scores.get)
        
        schools_cursor = db.schools.find({"streams_offered": suggested_stream})
        schools = await schools_cursor.to_list(10)
        formatted_schools = [format_mongo_doc(doc) for doc in schools]
        
        suggestions = {
            "suggested_stream": suggested_stream,
            "nearby_schools": formatted_schools
        }

    elif class_level == "10th-pass":
        careers = await db.careers.find({"stream": stream}).to_list(100)
        
        career_scores = {}
        for career in careers:
            score = 0
            for keyword in career.get("keywords", []):
                for q_id, answer in answers_dict.items():
                    if answer in SCORE_MAP and keyword in answer.lower():
                         score += SCORE_MAP.get(answer)
            career_scores[career['career_name']] = score

        sorted_careers = sorted(career_scores.items(), key=lambda item: item[1], reverse=True)
        top_careers = [name for name, score in sorted_careers[:3]]

        suggested_degree_doc = await db.careers.find_one({"career_name": top_careers[0]})
        
        formatted_degree_doc = format_mongo_doc(suggested_degree_doc)
        suggested_degree = formatted_degree_doc.get("required_degree")

        colleges_cursor = db.colleges.find({"degrees_offered": suggested_degree})
        colleges = await colleges_cursor.to_list(10)
        formatted_colleges = [format_mongo_doc(doc) for doc in colleges]
        
        suggestions = {
            "suggested_degree": suggested_degree,
            "nearby_colleges": formatted_colleges,
            "possible_careers": top_careers
        }
        
    return suggestions

