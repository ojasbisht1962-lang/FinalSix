# routes/colleges.py

from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from database import db

colleges_router = APIRouter(tags=["colleges"])

def format_mongo_doc(doc):
    """Converts MongoDB's ObjectId to a string and returns a clean dict."""
    doc['_id'] = str(doc['_id'])
    return doc

@colleges_router.get("/get")
async def get_colleges_by_degree(degree: str):
    """
    Returns a list of colleges offering a given degree.
    """
    colleges = await db.colleges.find({"degrees_offered": degree}).to_list(100)
    
    if not colleges:
        raise HTTPException(status_code=404, detail="No colleges found for this degree.")
    
    # Format the documents to handle ObjectId
    formatted_colleges = [format_mongo_doc(doc) for doc in colleges]
    
    return {"colleges": formatted_colleges}