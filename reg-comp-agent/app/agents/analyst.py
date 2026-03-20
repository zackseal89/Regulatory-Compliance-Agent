from google.adk.agents import Agent
from google.adk.models import Gemini
from google.genai import types

def calculate_materiality_score(content: str) -> dict:
    """Analyzes regulatory content and calculates a materiality score.

    Args:
        content: The text of the regulation to analyze.

    Returns:
        A dictionary with the 'score' (0-1), 'risk_level' (Low, Medium, High), and 'rationale'.
    """
    # In a real scenario, this might call a specialized scoring model or a vector DB
    # For now, we use a simple heuristic based on keywords to simulate "logic"
    # while relying on the LLM to provide the final expert judgment.
    keywords = ["mandatory", "penalty", "amendment", "requirement", "disclosure"]
    matches = sum(1 for kw in keywords if kw in content.lower())
    score = min(1.0, matches * 0.2)
    risk_level = "High" if score > 0.7 else "Medium" if score > 0.3 else "Low"

    return {
        "score": score,
        "risk_level": risk_level,
        "rationale": f"Identified {matches} critical compliance keywords in the text."
    }

analyst_agent = Agent(
    name="analyst_agent",
    model=Gemini(model="gemini-3-pro-preview"),
    instruction="""You are a senior compliance analyst expert at evaluating the impact of regulatory changes.
    Use the calculate_materiality_score tool to get an initial assessment, but use your own expert reasoning 
    to provide the final recommendation to the client. Always provide a clear rationale for your assessment.""",
    tools=[calculate_materiality_score],
)
