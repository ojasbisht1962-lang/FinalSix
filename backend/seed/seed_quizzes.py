import asyncio
from database import db

async def seed_quizzes():
    # Clear existing quiz data
    await db.quizzes.delete_many({})
    
    # Quiz questions for below 10th class students
    below_10_questions = [
        {
            "id": "q1",
            "text": "What are your primary interests?",
            "options": [
                "Technology and Innovation",
                "Arts and Creativity", 
                "Business and Entrepreneurship",
                "Healthcare and Wellness"
            ]
        },
        {
            "id": "q2", 
            "text": "Which subjects do you enjoy the most?",
            "options": [
                "Mathematics and Science",
                "Languages and Literature",
                "Social Studies and History",
                "Physical Education and Sports"
            ]
        },
        {
            "id": "q3",
            "text": "What type of activities energize you?",
            "options": [
                "Problem solving and logical thinking",
                "Creative expression and design",
                "Working with people and helping others",
                "Outdoor activities and physical challenges"
            ]
        },
        {
            "id": "q4",
            "text": "How do you prefer to learn?",
            "options": [
                "Hands-on experiments and practical work",
                "Reading and research",
                "Group discussions and collaboration", 
                "Visual and interactive methods"
            ]
        }
    ]
    
    # Quiz questions for Science stream (10th pass)
    science_questions = [
        {
            "id": "s1",
            "text": "Which area of science interests you most?",
            "options": [
                "Physics and Engineering",
                "Chemistry and Research",
                "Biology and Life Sciences",
                "Mathematics and Computer Science"
            ]
        },
        {
            "id": "s2",
            "text": "What type of career appeals to you?",
            "options": [
                "Medical and Healthcare",
                "Engineering and Technology",
                "Research and Development",
                "Teaching and Education"
            ]
        },
        {
            "id": "s3",
            "text": "How do you approach problem-solving?",
            "options": [
                "Analytical and methodical",
                "Creative and innovative",
                "Collaborative and team-based",
                "Experimental and hands-on"
            ]
        },
        {
            "id": "s4",
            "text": "What environment do you prefer to work in?",
            "options": [
                "Laboratory and research facilities",
                "Hospitals and clinical settings", 
                "Technology companies and startups",
                "Educational institutions"
            ]
        }
    ]
    
    # Quiz questions for Commerce stream (10th pass)
    commerce_questions = [
        {
            "id": "c1",
            "text": "What aspect of business interests you most?",
            "options": [
                "Finance and Investment",
                "Marketing and Sales",
                "Management and Leadership",
                "Accounting and Analysis"
            ]
        },
        {
            "id": "c2",
            "text": "Which career path appeals to you?",
            "options": [
                "Banking and Finance",
                "Entrepreneurship and Business",
                "Consulting and Advisory",
                "Government and Public Service"
            ]
        },
        {
            "id": "c3",
            "text": "How do you prefer to work?",
            "options": [
                "With numbers and data analysis",
                "With people and communication",
                "In strategic planning and decision making",
                "In creative marketing and branding"
            ]
        },
        {
            "id": "c4",
            "text": "What motivates you in a career?",
            "options": [
                "Financial success and stability",
                "Innovation and growth opportunities",
                "Making a social impact",
                "Leadership and influence"
            ]
        }
    ]
    
    # Quiz questions for Arts stream (10th pass)
    arts_questions = [
        {
            "id": "a1",
            "text": "Which area of arts and humanities interests you most?",
            "options": [
                "Literature and Writing",
                "History and Archaeology",
                "Psychology and Social Work",
                "Political Science and Law"
            ]
        },
        {
            "id": "a2",
            "text": "What type of career appeals to you?",
            "options": [
                "Media and Journalism",
                "Legal and Judicial Services",
                "Social Work and NGO",
                "Creative Arts and Entertainment"
            ]
        },
        {
            "id": "a3",
            "text": "How do you prefer to express yourself?",
            "options": [
                "Through writing and communication",
                "Through visual and performing arts",
                "Through helping and counseling others",
                "Through research and analysis"
            ]
        },
        {
            "id": "a4",
            "text": "What work environment suits you best?",
            "options": [
                "Creative studios and media houses",
                "Courts and legal offices",
                "Community centers and social organizations",
                "Schools and educational institutions"
            ]
        }
    ]
    
    # Insert quiz data for different categories
    quizzes = [
        {
            "class_level": "below-10",
            "questions": below_10_questions
        },
        {
            "class_level": "10th-pass",
            "stream": "science", 
            "questions": science_questions
        },
        {
            "class_level": "10th-pass",
            "stream": "commerce",
            "questions": commerce_questions
        },
        {
            "class_level": "10th-pass", 
            "stream": "arts",
            "questions": arts_questions
        }
    ]
    
    await db.quizzes.insert_many(quizzes)
    print("Quiz data seeded successfully!")

async def main():
    await seed_quizzes()

if __name__ == "__main__":
    asyncio.run(main())