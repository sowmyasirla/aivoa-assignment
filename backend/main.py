import os
from dotenv import load_dotenv

from fastapi import FastAPI
from models import ChatRequest
from graph import app_graph

load_dotenv()

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "AIVOA AI Backend Running",
        "api_key_loaded": bool(os.getenv("GOOGLE_API_KEY"))
    }


@app.post("/chat")
def chat(request: ChatRequest):

    result = app_graph.invoke(
        {
            "message": request.message
        }
    )

    return result