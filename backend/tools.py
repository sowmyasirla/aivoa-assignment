from database import SessionLocal
from models import Interaction
import json



def log_interaction(data):

    db = SessionLocal()


    obj = Interaction(

        hcp_name=data.get("hcp_name"),

        interaction_type=data.get("interaction_type"),

        date=data.get("date"),

        time=data.get("time"),

        attendees=data.get("attendees"),

        topics=data.get("topics"),

        materials=data.get("materials"),

        samples=data.get("samples"),

        sentiment=data.get("sentiment"),

        outcomes=data.get("outcomes"),

        follow_up=data.get("follow_up"),

        summary=data.get("summary"),

        ai_sentiment=data.get("ai_sentiment"),

        ai_followups=json.dumps(
            data.get("ai_followups",[])
        )

    )


    db.add(obj)

    db.commit()

    db.refresh(obj)

    db.close()


    return obj.id





def edit_interaction(id,data):

    db=SessionLocal()


    item=db.query(
        Interaction
    ).filter(
        Interaction.id==id
    ).first()


    if item:

        for key,value in data.items():

            setattr(
                item,
                key,
                value
            )


        db.commit()


    db.close()


    return True





def search_hcp(name):

    return {
        "message":
        f"Searching HCP {name}"
    }





def suggest_followup(sentiment):

    return [

        "Send latest clinical evidence",

        "Schedule another meeting",

        "Record feedback in CRM"

    ]





def summarize_interaction(text):

    return text[:200]