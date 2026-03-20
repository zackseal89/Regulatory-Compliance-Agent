# Implementation Plan: RegAI Multi-Agent System (ADK v4)

This plan details the technical implementation of the **Regulatory Compliance Agent** using a Multi-Agent System (MAS) architecture and a Polyglot Database strategy.

## 1. Multi-Agent Orchestration

We will use **ADK Workflow Agents** to coordinate specialized sub-agents.

### Agent Definition Table

| Agent | Type | Model | Role |
| :--- | :--- | :--- | :--- |
| **Ingestion Agent** | `LoopAgent` | `gemini-3-flash` | Scheduled monitor. Uses **Tinyfish McpToolset** to reason about scraper status and deduplication. |
| **Analyst Agent** | `LlmAgent` | `gemini-3-pro` | High-precision legal reasoning. Assigns 0.0-1.0 materiality score. |
| **Drafting Agent** | `LlmAgent` | `gemini-3-flash` | Creative copywriter. Generates plain-English summaries & actions. |
| **Chat Agent** | `LlmAgent` | `gemini-3-pro` | Front-facing assistant. Uses RAG to answer queries. |

### The "Materiality Loop" (SequentialAgent)
```python
materiality_pipeline = SequentialAgent(
    name="materiality_pipeline",
    sub_agents=[
        analyst_agent,       # Computes score and reasoning
        drafting_agent,      # Generates the notification copy
        escalation_checker   # Custom BaseAgent that escalates if score > 0.7
    ]
)
```

## 2. Polyglot Database & Tooling

We will use **MCP Toolbox for Databases** to manage secure connections to multiple data sources.

### Data Storage Strategy
- **Application State (Firestore)**:
    - Collections: `notifications`, `active_sessions`, `system_alerts`.
    - Purpose: Real-time UI updates and session management.
- **Knowledge Base (BigQuery)**:
    - Purpose: Archival of every circular and materiality determination for years.
    - Used by: **Vertex AI Search** (as a data source).
- **Client Metadata (Cloud SQL / PostgreSQL)**:
    - Table: `client_profiles` (with relational tags).
    - Purpose: High-performance matching of regulations to client segments.

### MCP Toolbox Toolset
```python
from google.adk.tools.toolbox_toolset import ToolboxToolset

db_tools = ToolboxToolset(
    server_url="https://toolbox-service.a.run.app",
    # Bind client_id to the user's OIDC token for isolation
    bound_params={"client_id": lambda: get_user_id()} 
)
```

## 3. RAG & Grounding

Instead of manual embeddings in Firestore, we will use the **VertexAiSearchTool**.

- **Indexing**: Automated indexing of PDFs/HTML documents by Vertex AI.
- **Retrieval**: `analyst_agent` and `chat_agent` will use the tool to retrieve authoritative regulatory sections.
- **Citations**: ADK's `SourceTag` and `RAGSourcePanel` will be used in the UI to show exactly where the agent found its information.

## 4. Evaluation Strategy

We will implement a **Custom Evaluator** for materiality accuracy.

- **Metric**: `MaterialityPrecision`
- **Method**: Compare the Agent's 0.0-1.0 score against a "Ground Truth" expert score.
- **Target**: < 0.1 delta for at least 90% of test cases.

## 5. Deployment Pattern

1. **Local Development**: `adk web .` for MAS testing.
2. **Infrastructure**: Terraform (scaffolded) for BigQuery, Cloud SQL, and Vertex AI Search setup.
3. **Engine**: `adk deploy agent_engine` to host the MAS on Vertex AI Reasoning Engine.
