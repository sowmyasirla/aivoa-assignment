from sqlalchemy import Column,Integer,String,Text

from database import Base



class Interaction(Base):

    __tablename__="interactions"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    hcp_name = Column(
        String
    )


    interaction_type = Column(
        String
    )


    date = Column(
        String
    )


    time = Column(
        String
    )


    attendees = Column(
        Text
    )


    topics = Column(
        Text
    )


    materials = Column(
        Text
    )


    samples = Column(
        Text
    )


    sentiment = Column(
        String
    )


    outcomes = Column(
        Text
    )


    follow_up = Column(
        Text
    )


    summary = Column(
        Text
    )


    ai_sentiment = Column(
        String
    )


    ai_followups = Column(
        Text
    )