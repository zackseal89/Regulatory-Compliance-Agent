# Updated Implementation Plan: RegAI Agent (v5)

## Objective
Implement a production-grade regulatory compliance agent using an **ADK Multi-Agent System (MAS)** architecture, backed by a **Firestore + Vertex AI Search** polyglot data strategy.

## 1. Updated Roadmap
- **[x] Milestone 1**: Project Scaffolding & Specifications.
- **[ ] Milestone 2**: Data Infrastructure & MCP Integration.
    - [ ] Deploy/Configure **MCP Toolbox** for Firestore access.
    - [ ] Initialize **Vertex AI Search** data store.
    - [ ] Define Firestore collections (`regulatory_updates`, `client_profiles`).
- **[ ] Milestone 3**: MAS Implementation & Tooling.
    - [x] Orchestrator Dispatch Pattern.
    - [x] Ingestion, Analyst, Drafting, & Chat agents.
    - [ ] Connect agents to MCP/Firestore tools.
- **[ ] Milestone 4**: Evaluation & Tuning.
    - [ ] Create Evalsets.
    - [ ] Run `adk eval`.
- **[ ] Milestone 5**: CI/CD & Deployment.
- **[ ] Milestone 6**: Frontend Integration.

## 2. Technical Infrastructure
- **Agent Framework**: ADK (`root_agent` orchestrator + specialized agents).
- **Storage**: Firestore (Document state, Profiles).
- **Search**: Vertex AI Search (Semantic RAG).
- **Integration**: MCP Toolbox (Firestore bridge).
- **Deployment**: Vertex AI Reasoning Engine.
