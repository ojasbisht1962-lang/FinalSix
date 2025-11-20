import asyncio
from database import db
import json

async def analyze_quiz_structure():
    try:
        print("=== DETAILED QUIZ DATA ANALYSIS ===\n")
        
        # Get all quiz documents
        async for quiz in db.quizzes.find():
            print(f"Quiz ID: {quiz['_id']}")
            print(f"Class Level: {quiz['class_level']}")
            print(f"Stream: {quiz.get('stream', 'None')}")
            print(f"Number of questions: {len(quiz['questions'])}")
            
            # Show first few questions structure
            print("Sample questions:")
            for i, question in enumerate(quiz['questions'][:3]):
                print(f"  Question {i+1}:")
                print(f"    ID: {question['id']}")
                print(f"    Text: {question['text'][:60]}...")
                print(f"    Options: {question['options']}")
            
            print("-" * 50)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(analyze_quiz_structure())