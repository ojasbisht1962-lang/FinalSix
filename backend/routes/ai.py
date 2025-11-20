from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Configure Gemini AI
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Career-focused system prompt
CAREER_CONTEXT = """
You are a helpful AI assistant for CareerCompass, a career guidance platform. You help users with:
- Career exploration and advice
- Educational pathways and college guidance
- Skill development recommendations
- Job search strategies
- Interview preparation
- Resume and portfolio tips
- Industry insights and trends

Keep responses focused on career-related topics. Be helpful, professional, and encouraging.
If asked about topics outside career guidance, politely redirect to career-related aspects.
"""

@router.post("/chat", response_model=ChatResponse)
async def chat_with_gemini(request: ChatRequest):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash-latest')
        
        # Combine system context with user message
        prompt = f"{CAREER_CONTEXT}\n\nUser question: {request.message}"
        
        response = model.generate_content(prompt)
        
        return ChatResponse(response=response.text)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@router.get("/health")
async def ai_health():
    return {"status": "AI service is running"}