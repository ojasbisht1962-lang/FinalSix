import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb+srv://ojasbisht1962_db_user:LdYXdQ3eO543G3Ka@clusterone.6a9q0rn.mongodb.net/")
DATABASE_NAME = os.getenv("DATABASE_NAME", "career_guidance")

arabian_questions = [
    # ALADDIN - Easy
    {
        "id": "aq001",
        "question": "What did Aladdin find in the mysterious cave?",
        "options": ["A treasure chest", "A magic lamp", "A golden sword", "A flying carpet"],
        "answer_index": 1,
        "difficulty": "easy",
        "story": "Aladdin",
        "explanation": "Aladdin discovered a magic lamp in the cave, which contained a powerful genie who could grant wishes."
    },
    {
        "id": "aq002",
        "question": "Who helped Aladdin escape from the cave?",
        "options": ["The Sultan", "The Genie of the Ring", "Princess Jasmine", "The merchant"],
        "answer_index": 1,
        "difficulty": "easy",
        "story": "Aladdin",
        "explanation": "The Genie of the Ring, which was given to Aladdin before entering the cave, helped him escape when he was trapped."
    },
    {
        "id": "aq003",
        "question": "What was the name of the princess Aladdin fell in love with?",
        "options": ["Scheherazade", "Jasmine", "Fatima", "Ayesha"],
        "answer_index": 1,
        "difficulty": "easy",
        "story": "Aladdin",
        "explanation": "Princess Jasmine was the Sultan's daughter who captured Aladdin's heart."
    },
    
    # ALI BABA - Easy
    {
        "id": "aq004",
        "question": "What were the magic words to open the thieves' cave?",
        "options": ["Abracadabra", "Open Sesame", "Alakazam", "Sim Sala Bim"],
        "answer_index": 1,
        "difficulty": "easy",
        "story": "Ali Baba",
        "explanation": "'Open Sesame' were the secret magic words that opened the entrance to the treasure cave."
    },
    {
        "id": "aq005",
        "question": "How many thieves were in Ali Baba's story?",
        "options": ["20", "30", "40", "50"],
        "answer_index": 2,
        "difficulty": "easy",
        "story": "Ali Baba",
        "explanation": "The story features 40 thieves who had hidden their treasure in a secret cave."
    },
    {
        "id": "aq006",
        "question": "Who saved Ali Baba from the thieves?",
        "options": ["His wife", "Morgiana the slave girl", "His brother Cassim", "The Sultan"],
        "answer_index": 1,
        "difficulty": "easy",
        "story": "Ali Baba",
        "explanation": "Morgiana, the clever slave girl, saved Ali Baba multiple times with her intelligence and bravery."
    },
    
    # SINBAD - Easy
    {
        "id": "aq007",
        "question": "How many voyages did Sinbad the Sailor make?",
        "options": ["5", "7", "10", "12"],
        "answer_index": 1,
        "difficulty": "easy",
        "story": "Sinbad",
        "explanation": "Sinbad made seven legendary voyages, each filled with incredible adventures and dangers."
    },
    {
        "id": "aq008",
        "question": "What mythical bird did Sinbad encounter?",
        "options": ["Phoenix", "Roc", "Griffin", "Thunderbird"],
        "answer_index": 1,
        "difficulty": "easy",
        "story": "Sinbad",
        "explanation": "The Roc was a giant mythical bird that could carry elephants in its talons, featured in Sinbad's adventures."
    },
    
    # ALADDIN - Medium
    {
        "id": "aq009",
        "question": "What profession did the evil sorcerer pretend to have?",
        "options": ["Merchant", "Uncle to Aladdin", "Royal advisor", "Temple priest"],
        "answer_index": 1,
        "difficulty": "medium",
        "story": "Aladdin",
        "explanation": "The sorcerer disguised himself as Aladdin's long-lost uncle to gain his trust and trick him into retrieving the lamp."
    },
    {
        "id": "aq010",
        "question": "How many wishes could the Genie of the Lamp grant?",
        "options": ["One", "Three", "Seven", "Unlimited"],
        "answer_index": 3,
        "difficulty": "medium",
        "story": "Aladdin",
        "explanation": "Unlike modern adaptations, in the original tale, the Genie could grant unlimited wishes to whoever possessed the lamp."
    },
    {
        "id": "aq011",
        "question": "What did the sorcerer trade for the old lamp?",
        "options": ["Gold coins", "New lamps", "Jewels", "Silk cloth"],
        "answer_index": 1,
        "difficulty": "medium",
        "story": "Aladdin",
        "explanation": "The sorcerer cunningly exchanged 'new lamps for old' to trick Princess Jasmine into giving him the magic lamp."
    },
    
    # ALI BABA - Medium
    {
        "id": "aq012",
        "question": "How did Morgiana kill the thieves hiding in the oil jars?",
        "options": ["With a sword", "By pouring boiling oil", "With poison", "By setting them on fire"],
        "answer_index": 1,
        "difficulty": "medium",
        "story": "Ali Baba",
        "explanation": "Morgiana discovered the thieves hiding in oil jars and killed them by pouring boiling oil into each jar."
    },
    {
        "id": "aq013",
        "question": "What happened to Cassim, Ali Baba's brother?",
        "options": ["He became rich", "He forgot the magic words and was killed by thieves", "He joined the thieves", "He became Sultan"],
        "answer_index": 1,
        "difficulty": "medium",
        "story": "Ali Baba",
        "explanation": "Cassim went to the cave but forgot the magic words to exit. The thieves found and killed him."
    },
    
    # SINBAD - Medium
    {
        "id": "aq014",
        "question": "On which voyage did Sinbad encounter the Old Man of the Sea?",
        "options": ["Third", "Fifth", "Sixth", "Seventh"],
        "answer_index": 1,
        "difficulty": "medium",
        "story": "Sinbad",
        "explanation": "During his fifth voyage, Sinbad encountered the Old Man of the Sea who clung to his shoulders and wouldn't let go."
    },
    {
        "id": "aq015",
        "question": "What did Sinbad use to escape from the Valley of Diamonds?",
        "options": ["A flying carpet", "A giant bird", "A rope made of turbans", "A magic ring"],
        "answer_index": 1,
        "difficulty": "medium",
        "story": "Sinbad",
        "explanation": "Sinbad tied himself to a piece of meat that a giant Roc bird picked up, allowing him to escape the valley."
    },
    
    # SCHEHERAZADE - Medium
    {
        "id": "aq016",
        "question": "How many nights did Scheherazade tell stories?",
        "options": ["100", "500", "1001", "2000"],
        "answer_index": 2,
        "difficulty": "medium",
        "story": "Scheherazade",
        "explanation": "Scheherazade told stories for 1001 nights to save her life and the lives of other women in the kingdom."
    },
    
    # ALADDIN - Hard
    {
        "id": "aq017",
        "question": "In the original tale, where was Aladdin's story set?",
        "options": ["Baghdad", "China", "Persia", "Arabia"],
        "answer_index": 1,
        "difficulty": "hard",
        "story": "Aladdin",
        "explanation": "Surprisingly, in the original 'One Thousand and One Nights' tale, Aladdin's story was set in China, though the culture depicted was Arabian."
    },
    {
        "id": "aq018",
        "question": "What happened when Aladdin rubbed the lamp by accident the first time?",
        "options": ["Nothing happened", "The genie appeared", "The cave collapsed", "He was transported home"],
        "answer_index": 1,
        "difficulty": "hard",
        "story": "Aladdin",
        "explanation": "When Aladdin accidentally rubbed the lamp while trapped in the cave, the powerful Genie of the Lamp appeared before him."
    },
    
    # ALI BABA - Hard
    {
        "id": "aq019",
        "question": "What reward did Ali Baba give Morgiana for saving his life?",
        "options": ["Gold and jewels", "Freedom and marriage to his son", "A house", "Half his treasure"],
        "answer_index": 1,
        "difficulty": "hard",
        "story": "Ali Baba",
        "explanation": "Ali Baba freed Morgiana and gave her in marriage to his son as a reward for her loyalty and bravery."
    },
    
    # SINBAD - Hard
    {
        "id": "aq020",
        "question": "What was Sinbad's occupation before he became a sailor?",
        "options": ["He inherited wealth", "Merchant", "Fisherman", "Palace guard"],
        "answer_index": 0,
        "difficulty": "hard",
        "story": "Sinbad",
        "explanation": "Sinbad inherited great wealth from his father but squandered it on luxurious living before becoming a sailor to seek his fortune."
    },
    {
        "id": "aq021",
        "question": "Which sea creature swallowed Sinbad's ship whole?",
        "options": ["A giant whale", "A sea serpent", "A kraken", "A giant fish"],
        "answer_index": 0,
        "difficulty": "hard",
        "story": "Sinbad",
        "explanation": "In one of his voyages, Sinbad's ship was swallowed by an enormous whale, though he managed to escape."
    },
    
    # MIXED - Hard
    {
        "id": "aq022",
        "question": "Who was the narrator of all the Arabian Nights tales?",
        "options": ["Sinbad", "Scheherazade", "Aladdin", "The Sultan"],
        "answer_index": 1,
        "difficulty": "hard",
        "story": "Scheherazade",
        "explanation": "Scheherazade narrated all the stories in 'One Thousand and One Nights' to the Sultan to prevent her execution."
    },
    {
        "id": "aq023",
        "question": "What was the original source collection that contains these stories?",
        "options": ["The Arabian Tales", "One Thousand and One Nights", "Tales of the Desert", "The Sultan's Stories"],
        "answer_index": 1,
        "difficulty": "hard",
        "story": "Scheherazade",
        "explanation": "'One Thousand and One Nights' (also known as Arabian Nights) is the original collection containing these legendary tales."
    },
    {
        "id": "aq024",
        "question": "In which century were the Arabian Nights tales first compiled?",
        "options": ["6th century", "8th century", "9th century", "12th century"],
        "answer_index": 2,
        "difficulty": "hard",
        "story": "Scheherazade",
        "explanation": "The tales of One Thousand and One Nights were first compiled during the Islamic Golden Age in the 9th century, though they have much older origins."
    }
]

async def seed_arabian_questions():
    """Seed the database with Arabian Nights quiz questions and setup collections"""
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    try:
        # === QUESTIONS COLLECTION ===
        questions_collection = db["arabian_questions"]
        
        # Clear existing questions
        await questions_collection.delete_many({})
        print("Cleared existing Arabian quiz questions")
        
        # Insert new questions
        result = await questions_collection.insert_many(arabian_questions)
        print(f"Successfully inserted {len(result.inserted_ids)} Arabian Nights quiz questions")
        
        # Create indexes on questions
        await questions_collection.create_index("id", unique=True)
        await questions_collection.create_index("difficulty")
        await questions_collection.create_index("story")
        print("Created indexes on arabian_questions collection")
        
        # === RESULTS COLLECTION ===
        results_collection = db["arabian_quiz_results"]
        
        # Create indexes for leaderboard performance
        await results_collection.create_index([("score", -1), ("time_taken", 1)])
        await results_collection.create_index("user_id")
        await results_collection.create_index("timestamp")
        await results_collection.create_index("difficulty")
        await results_collection.create_index("story")
        print("Created indexes on arabian_quiz_results collection")
        
        # === USERS COLLECTION ===
        users_collection = db["users"]
        
        # Create index on users for Arabian quiz stats
        await users_collection.create_index("total_arabian_score")
        await users_collection.create_index("arabian_quizzes_taken")
        print("Created indexes on users collection for Arabian quiz stats")
        
        print("\n✅ Database setup complete!")
        print("Collections ready:")
        print("  - arabian_questions (24 questions)")
        print("  - arabian_quiz_results (ready for submissions)")
        print("  - users (ready for user stats)")
        
    except Exception as e:
        print(f"Error seeding Arabian quiz data: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_arabian_questions())
