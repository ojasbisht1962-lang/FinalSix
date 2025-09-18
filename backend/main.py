# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.quiz import quiz_router
from routes.suggestions import suggestions_router
from routes.users import users_router
from routes.answers import answers_router
from routes.careers import careers_router
from routes.colleges import colleges_router
from routes.schools import schools_router # New import

app = FastAPI(title="Career Guidance Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quiz_router, prefix="/quiz")
app.include_router(suggestions_router, prefix="/suggestions")
app.include_router(users_router, prefix="/users")
app.include_router(answers_router, prefix="/answers")
app.include_router(careers_router, prefix="/careers")
app.include_router(colleges_router, prefix="/colleges")
app.include_router(schools_router, prefix="/schools") # Include the new router

@app.get("/")
def home():
    return {"message": "Career Guidance API is running 🚀"}
