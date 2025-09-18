# routes/careers.py

from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from database import db

careers_router = APIRouter(tags=["careers"])

@careers_router.get("/degrees")
async def get_degrees_by_stream(stream: str):
    """
    Returns a list of unique degrees for a given stream.
    """
    degrees = await db.careers.distinct("required_degree", {"stream": stream})
    if not degrees:
        raise HTTPException(status_code=404, detail="No degrees found for this stream.")
    return {"degrees": degrees}

@careers_router.get("/get")
async def get_careers_by_degree(stream: str, degree: str):
    """
    Returns a list of careers and their descriptions for a given stream and degree.
    """
    careers = await db.careers.find({"stream": stream, "required_degree": degree}).to_list(100)
    
    # Optional: format _id to string for the frontend
    for career in careers:
        career['_id'] = str(career['_id'])
    
    if not careers:
        raise HTTPException(status_code=404, detail="No careers found for this degree.")
    return {"careers": careers}