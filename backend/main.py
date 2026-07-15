from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import json

from database import Base, engine, get_db
from models import Interaction
from graph import agent

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI First CRM HCP Module"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def home():
    return {
        "message": "AI CRM Backend Running"
    }


# -------------------------
# AI CHAT
# -------------------------
@app.post("/chat")
def chat(data: dict, db: Session = Depends(get_db)):

    message = data.get("message", "")

    result = agent.invoke({
        "message": message
    })

    ai = result["data"]

    interaction = Interaction(
        hcp_name=ai.get("hcp_name", ""),
        interaction_type=ai.get("interaction_type", ""),
        date=ai.get("date", ""),
        time=ai.get("time", ""),
        attendees=ai.get("attendees", ""),
        topics=ai.get("topics", ""),
        materials=ai.get("materials", ""),
        samples=ai.get("samples", ""),
        sentiment=ai.get("sentiment", ""),
        outcomes=ai.get("outcomes", ""),
        follow_up=ai.get("follow_up", ""),
        summary=ai.get("summary", ""),
        ai_sentiment=ai.get("ai_sentiment", ""),
        ai_followups=json.dumps(ai.get("ai_followups", []))
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return {
        "id": interaction.id,
        "response": ai
    }


# -------------------------
# SAVE MANUAL INTERACTION
# -------------------------
@app.post("/interactions")
def create_interaction(data: dict, db: Session = Depends(get_db)):

    interaction = Interaction(
        hcp_name=data.get("hcp_name", ""),
        interaction_type=data.get("interaction_type", ""),
        date=data.get("date", ""),
        time=data.get("time", ""),
        attendees=data.get("attendees", ""),
        topics=data.get("topics", ""),
        materials=data.get("materials", ""),
        samples=data.get("samples", ""),
        sentiment=data.get("sentiment", ""),
        outcomes=data.get("outcomes", ""),
        follow_up=data.get("follow_up", ""),
        summary=data.get("summary", ""),
        ai_sentiment=data.get("ai_sentiment", ""),
        ai_followups=json.dumps(
            data.get("ai_followups", [])
        )
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return {
        "message": "Saved Successfully",
        "id": interaction.id
    }


# -------------------------
# GET HISTORY
# -------------------------
@app.get("/interactions")
def get_interactions(db: Session = Depends(get_db)):

    interactions = db.query(Interaction).all()

    output = []

    for item in interactions:

        output.append({

            "id": item.id,
            "hcp_name": item.hcp_name,
            "interaction_type": item.interaction_type,
            "date": item.date,
            "time": item.time,
            "attendees": item.attendees,
            "topics": item.topics,
            "materials": item.materials,
            "samples": item.samples,
            "sentiment": item.sentiment,
            "outcomes": item.outcomes,
            "follow_up": item.follow_up,
            "summary": item.summary,
            "ai_sentiment": item.ai_sentiment,
            "ai_followups": json.loads(item.ai_followups)
            if item.ai_followups else []

        })

    return output


# -------------------------
# UPDATE
# -------------------------
@app.put("/interactions/{id}")
def update_interaction(
    id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    interaction = db.query(Interaction).filter(
        Interaction.id == id
    ).first()

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    interaction.hcp_name = data.get(
        "hcp_name",
        interaction.hcp_name
    )

    interaction.interaction_type = data.get(
        "interaction_type",
        interaction.interaction_type
    )

    interaction.date = data.get(
        "date",
        interaction.date
    )

    interaction.time = data.get(
        "time",
        interaction.time
    )

    interaction.attendees = data.get(
        "attendees",
        interaction.attendees
    )

    interaction.topics = data.get(
        "topics",
        interaction.topics
    )

    interaction.materials = data.get(
        "materials",
        interaction.materials
    )

    interaction.samples = data.get(
        "samples",
        interaction.samples
    )

    interaction.sentiment = data.get(
        "sentiment",
        interaction.sentiment
    )

    interaction.outcomes = data.get(
        "outcomes",
        interaction.outcomes
    )

    interaction.follow_up = data.get(
        "follow_up",
        interaction.follow_up
    )

    interaction.summary = data.get(
        "summary",
        interaction.summary
    )

    interaction.ai_sentiment = data.get(
        "ai_sentiment",
        interaction.ai_sentiment
    )

    interaction.ai_followups = json.dumps(
        data.get(
            "ai_followups",
            json.loads(interaction.ai_followups)
            if interaction.ai_followups
            else []
        )
    )

    db.commit()

    db.refresh(interaction)

    return {
        "message": "Updated Successfully"
    }


# -------------------------
# DELETE
# -------------------------
@app.delete("/interactions/{id}")
def delete_interaction(
    id: int,
    db: Session = Depends(get_db)
):

    interaction = db.query(Interaction).filter(
        Interaction.id == id
    ).first()

    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )

    db.delete(interaction)
    db.commit()

    return {
        "message": "Deleted Successfully"
    }