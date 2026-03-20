# DESIGN_SPEC.md

## Overview

The Regulatory Compliance Agent is a production-grade, autonomous AI system built using the **Agent Development Kit (ADK)** and hosted on **Vertex AI Reasoning Engine**. It employs a **Multi-Agent System (MAS)** architecture to monitor East African regulatory bodies (CBK, CMA, CA, EAC) and assess the "materiality" of new policy changes for specific clients.

The system is designed with a **Polyglot Database Strategy**:
- **Firestore**: Manages real-time application state, including active sessions, notification drafts, and live feed updates.
- **BigQuery / Cloud SQL**: Serves as the high-scale regulatory knowledge base and client profile repository, optimized for relational matching and historical analysis.
- **Vertex AI Search**: Provides high-performance RAG (Retrieval-Augmented Generation) capabilities, ensuring the agent's responses are grounded in authoritative sources.

The agent leverages **Gemini 3 Pro Preview** for high-precision materiality reasoning and **Gemini 3 Flash Preview** for rapid data ingestion and notification drafting.

## Example Use Cases

1. **Autonomous Multi-Agent Ingestion & Scoring**
   * **Input**: Scheduler triggers the **Ingestion Agent**. It uses Tinyfish to extract a new "Digital Credit Providers (DCP) Policy" from the CBK portal.
   * **Output**: The **Analyst Agent** retrieves matching `client_profiles` via **MCP Toolbox**, evaluates the policy, and scores it. Acme Fintech (tagged "DCP") receives a materiality score of 0.87 (High).
2. **AI-Led Notification Approval Workflow**
   * **Input**: The agent flags a new CMA Gazette Notice as High materiality for Client X.
   * **Output**: The **Drafting Agent** generates a personalized, plain-English notification draft. The Compliance Officer receives a real-time alert in the Firestore-backed dashboard.
3. **Conversational Regulatory RAG**
   * **Input**: User asks, "What does the new CBK June 2026 circular require us to do regarding loan caps?"
   * **Output**: The **Chat Agent** retrieves the specific circular using **Vertex AI Search**, cross-references it with the user's persistent profile, and streams a cited answer.

## Tools Required

1. **Tinyfish MCP Tool**
   * **Purpose**: Autonomous browser navigation and data extraction via **Model Context Protocol (MCP)**.
2. **Firestore (via MCP Toolbox)**
   * **Purpose**: Primary document store for regulatory updates, client profiles, and session history.
   * **Integration**: Accessed via `McpToolset` for secure, production-grade CRUD.
3. **Vertex AI Search (ADK Native Tool)**
   * **Purpose**: High-scale semantic RAG and vector retrieval for regulatory documents.
4. **Notification Tool (Custom ADK Tool)**
   * **Purpose**: Logic for batching and drafting client alerts.


## Constraints & Safety Rules

1. **No Hallucinations Allowed**: When answering a conversational query (RAG), the agent MUST explicitly cite the `reference_number` or document ID. If the retrieved documents do not contain the answer, the agent MUST state "I do not have enough information to answer this based on the retrieved regulations" and must not generate a speculative answer.
2. **No Automated Sending**: While the agent can draft a notification and mark it as High urgency, it MUST NEVER send an email or message directly to a client. Notifications must always be saved as "draft" and await a human Compliance Officer's approval step.
3. **Data Isolation**: A materiality score or reasoning drafted for Client A must never be accessible to Client B. 
4. **Idempotency**: The agent must deduplicate ingestions. If a regulatory update with an existing `reference_number` is already in Firestore, it must skip re-processing it.

## Success Criteria

1. **Materiality Accuracy**: Evaluated on an `adk eval` dataset of 20 historical circulars and 3 dummy client profiles. The agent must score High/Medium/Low correctly against the human-labeled ground truth in at least 90% of eval cases.
2. **Tool Reliability**: The Tinyfish scraper tool successfully triggers and returns valid JSON for all 4 defined regulators on 95% of scheduled attempts without infinite loops.
3. **Latency**: Conversational queries using the RAG pipeline must stream the first token back to the UI in under 3.5 seconds.

## Edge Cases to Handle

1. **Empty Portals**: If the regulator site changes its DOM or structure such that Tinyfish returns an empty array, the agent must fail gracefully, log a `WARN`, and not overwrite existing data.
2. **Malformatted PDFs**: If a fetched document contains mostly OCR-failed garbage text, the agent should assign it a "pending_human_review" state rather than attempting to compute a random materiality score.
3. **Rate Limits / Batching**: If 50 updates drop at once, the agent must queue the notification drafting to ensure it does not send 50 separate alerts (violating the max 3/day rule), instead holding them in draft status.
