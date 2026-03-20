import os
from google.adk.agents import Agent
from google.adk.models import Gemini
from google.adk.tools import VertexAiSearchTool

# Configure the tool with the project's data store
# Ensure this matches your actual deployed Data Store ID in Vertex AI Search
DATA_STORE_ID = "regulatory-docs-ds"

search_tool = VertexAiSearchTool(
    data_store_id=f"projects/{os.environ.get('GOOGLE_CLOUD_PROJECT')}/locations/{os.environ.get('GOOGLE_CLOUD_LOCATION')}/collections/default_collection/dataStores/{DATA_STORE_ID}"
)

chat_agent = Agent(
    name="chat_agent",
    model=Gemini(model="gemini-3-pro-preview"),
    instruction="You are an expert Chat Agent. Answer regulatory queries by grounding your responses in the retrieved regulations. Cite references.",
    tools=[search_tool],
)
