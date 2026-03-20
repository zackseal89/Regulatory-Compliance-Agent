from google.adk.agents import Agent
from google.adk.models import Gemini
from google.genai import types
from google.adk.tools.load_web_page import load_web_page

ingestion_agent = Agent(
    name="ingestion_agent",
    model=Gemini(model="gemini-3-flash-preview"),
    instruction="You are an expert at extracting structured regulatory policy data from government portals. Use the load_web_page tool to fetch content from URLs provided by the user.",
    tools=[load_web_page],
)
