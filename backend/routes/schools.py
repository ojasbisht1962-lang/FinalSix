# routes/schools.py

from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from database import db

schools_router = APIRouter(tags=["schools"])

def format_mongo_doc(doc):
    """Converts MongoDB's ObjectId to a string and returns a clean dict."""
    doc['_id'] = str(doc['_id'])
    return doc

@schools_router.get("/get")
async def get_schools_by_stream(stream: str):
    """
    Returns a list of schools offering a given stream.
    """
    schools = await db.schools.find({"streams_offered": stream}).to_list(100)
    
    if not schools:
        raise HTTPException(status_code=404, detail="No schools found for this stream.")
    
    # Format the documents to handle ObjectId
    formatted_schools = [format_mongo_doc(doc) for doc in schools]
    
    return {"schools": formatted_schools}