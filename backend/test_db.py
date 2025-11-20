import asyncio
from database import db

async def test_database():
    try:
        # Test connection
        print("Testing MongoDB connection...")
        collections = await db.list_collection_names()
        print(f"Available collections: {collections}")
        
        # Check if quizzes collection exists and show sample data
        if "quizzes" in collections:
            print("\n--- Quizzes Collection ---")
            quiz_count = await db.quizzes.count_documents({})
            print(f"Total quiz documents: {quiz_count}")
            
            # Get sample quiz data
            sample_quiz = await db.quizzes.find_one()
            if sample_quiz:
                print("Sample quiz structure:")
                print(f"  - _id: {sample_quiz.get('_id')}")
                print(f"  - class_level: {sample_quiz.get('class_level')}")
                print(f"  - stream: {sample_quiz.get('stream')}")
                if 'questions' in sample_quiz:
                    print(f"  - questions count: {len(sample_quiz['questions'])}")
                    if sample_quiz['questions']:
                        print(f"  - sample question: {sample_quiz['questions'][0]}")
                else:
                    print("  - No questions field found")
        else:
            print("No 'quizzes' collection found in database")
            
        # Check other relevant collections
        for collection_name in ["user_answers", "users"]:
            if collection_name in collections:
                count = await db[collection_name].count_documents({})
                print(f"\n{collection_name}: {count} documents")
                
    except Exception as e:
        print(f"Error connecting to database: {e}")

if __name__ == "__main__":
    asyncio.run(test_database())