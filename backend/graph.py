import re
from langgraph.graph import StateGraph, END

from tools import summarize_interaction, suggest_followup


def extract(pattern, text, default=""):
    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return default


def ai_node(state):

    text = state["message"]

    hcp_name = extract(r"Met\s+(Dr\.\s+[A-Za-z ]+)", text, "Unknown Doctor")

    date = extract(r"on\s+(\d{2}-\d{2}-\d{4})", text, "")

    time = extract(
        r"from\s+([0-9: ]+[APMapm]{2}\s+to\s+[0-9: ]+[APMapm]{2})",
        text,
        ""
    )

    interaction_type = extract(
        r"for\s+(.*?)\.",
        text,
        "Meeting"
    )

    attendees = extract(
        r"Attendees were\s+(.*?)\.",
        text,
        ""
    )

    topics = extract(
        r"Discussed\s+(.*?)\.",
        text,
        ""
    )

    materials = extract(
        r"Shared\s+(.*?)\.",
        text,
        ""
    )

    samples = extract(
        r"Distributed\s+(.*?)\.",
        text,
        ""
    )

    follow_up = extract(
        r"Follow-up actions are to\s+(.*?)\.",
        text,
        ""
    )

    sentiment = "Positive"

    lower = text.lower()

    if "negative" in lower:
        sentiment = "Negative"
    elif "neutral" in lower:
        sentiment = "Neutral"
    elif "positive" in lower or "interested" in lower:
        sentiment = "Positive"

    outcomes = ""

    if "agreed" in lower:
        outcomes = "Doctor agreed to prescribe the product"

    elif "consider" in lower:
        outcomes = "Doctor will consider the product"

    elif "requested" in lower:
        outcomes = "Doctor requested additional information"

    else:
        outcomes = "Discussion completed"

    data = {

        "hcp_name": hcp_name,

        "interaction_type": interaction_type,

        "date": date,

        "time": time,

        "attendees": attendees,

        "topics": topics,

        "materials": materials,

        "samples": samples,

        "sentiment": sentiment,

        "outcomes": outcomes,

        "follow_up": follow_up,

        "summary": summarize_interaction(text),

        "ai_sentiment": sentiment,

        "ai_followups": suggest_followup(sentiment)

    }

    return {

        "data": data

    }


workflow = StateGraph(dict)

workflow.add_node("ai", ai_node)

workflow.set_entry_point("ai")

workflow.add_edge("ai", END)

agent = workflow.compile()