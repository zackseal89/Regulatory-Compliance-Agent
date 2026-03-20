from google.adk.agents import Agent
from google.adk.models import Gemini
from google.genai import types

def draft_notification(client_profile: str, materiality_score: float) -> str:
    """Generates a plain-English notification draft for compliance review."""
    return f"DRAFT: High materiality alert ({materiality_score}) for {client_profile}. Requires review."

drafting_agent = Agent(
    name="drafting_agent",
    model=Gemini(model="gemini-3-flash-preview"),
    instruction="You are an expert at drafting personalized, plain-English regulatory compliance notifications for fintech clients.",
    tools=[draft_notification],
)
