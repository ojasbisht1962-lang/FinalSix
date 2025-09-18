from database import db
from models.quiz import QuizSubmitRequest

async def generate_suggestions(payload: QuizSubmitRequest):
    if payload.type == "school_quiz":
        suggested_streams = ["Science", "Commerce"]  # TODO: real logic
        schools = await db["schools"].find().to_list(5)
        return {
            "type": "school_quiz",
            "streams": suggested_streams,
            "schools": [{"name": s["name"], "address": s["address"]} for s in schools]
        }

    elif payload.type == "degree_quiz":
        suggested_degrees = ["B.Tech in CSE", "B.Sc in Physics"]  # TODO: real logic
        colleges = await db["colleges"].find().to_list(5)
        return {
            "type": "degree_quiz",
            "degrees": suggested_degrees,
            "colleges": [{"name": c["name"], "address": c["address"]} for c in colleges]
        }

