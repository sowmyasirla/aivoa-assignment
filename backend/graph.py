from langgraph.graph import StateGraph, END
from typing import TypedDict


class ChatState(TypedDict):
    message: str
    response: str


def ai_agent(state: ChatState):

    user_message = state["message"]

    # Temporary response without Gemini
    response = f"""
Received message:

{user_message}

AI analysis:
- Doctor meeting detected
- Product discussion detected
- Follow-up requested
- Sentiment: Positive
"""

    return {
        "response": response
    }


graph = StateGraph(ChatState)

graph.add_node("ai_agent", ai_agent)

graph.set_entry_point("ai_agent")

graph.add_edge(
    "ai_agent",
    END
)

app_graph = graph.compile()