# ruff: noqa
# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import datetime
from zoneinfo import ZoneInfo

import os
import google.auth
from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.models import Gemini
from google.genai import types

# Set up GCP environment explicitly
_, project_id = google.auth.default()
os.environ["GOOGLE_CLOUD_PROJECT"] = project_id
os.environ["GOOGLE_CLOUD_LOCATION"] = "africa-south1"
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"

from app.agents.ingestion import ingestion_agent
from app.agents.analyst import analyst_agent
from app.agents.drafting import drafting_agent
from app.agents.chat import chat_agent

root_agent = Agent(
    name="root_agent",
    model=Gemini(
        model="gemini-3-flash-preview",
        retry_options=types.HttpRetryOptions(attempts=3),
    ),
    instruction="""You are the lead Regulatory Compliance Agent. Your goal is to help users manage their regulatory workload.
    You have access to specialized agents for different stages of the workflow:
    - Ingestion: For fetching content from regulatory URLs.
    - Analyst: For evaluating materiality and risk of regulatory changes.
    - Drafting: For creating compliance notifications and reports.
    - Chat: For general questions and discussion about regulations.
    
    Coordinate these agents to fulfill user requests efficiently. If the user doesn't specify a phase, ask for clarification.""",
    sub_agents=[ingestion_agent, analyst_agent, drafting_agent, chat_agent],
)

app = App(
    root_agent=root_agent,
    name="app",
)
