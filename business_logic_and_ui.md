# Regulatory Compliance Agent — Business Logic & UI Specification

> **Version**: 1.0 · **Date**: March 2026 · **Stack**: Vertex AI Reasoning Engine, Gemini 2.0 Flash, Firestore, Tinyfish, Next.js / Firebase Hosting

---

## What We're Building & Why

### The Problem

East African businesses — especially in Fintech, Banking, Telecom, and Insurance — operate under a complex, fast-moving regulatory environment governed by bodies like the **Central Bank of Kenya (CBK)**, the **Capital Markets Authority (CMA)**, the **Communications Authority (CA)**, and the **East African Community (EAC)**. These bodies publish circulars, gazette notices, and policy amendments continuously, often with short compliance windows.

Today, **compliance is manual**. Compliance officers spend hours each week visiting multiple regulator portals, downloading PDFs, reading through dense legal language, and deciding whether an update is relevant to their clients. They miss things. Updates slip through. Firms get fined.

> **The core pain**: There are too many regulatory sources, too much volume, and not enough time to assess what actually matters for each client.

### What We're Building

A **fully autonomous AI compliance agent** that:

1. **Monitors** all major East African regulatory portals 24/7 — automatically scraping every new circular, notice, or policy update using the Tinyfish Web Agent API.
2. **Understands** the content of each update using Gemini 2.0 Flash, running on Vertex AI Reasoning Engine — the production-grade, managed AI infrastructure on Google Cloud.
3. **Scores materiality** — for every client, the agent determines whether a new regulation is Low, Medium, or High impact based on that client's specific industry, licence type, and compliance profile.
4. **Drafts notifications** — for High-impact updates, the agent writes a plain-English impact summary and a recommended action, ready for a Compliance Officer to approve and send.
5. **Answers questions** — via a conversational chat interface, clients and analysts can ask natural language questions like *"What does this CBK circular mean for us?"* and get grounded, source-cited answers.

### Why This Approach

| Decision | Rationale |
|---|---|
| **Vertex AI Reasoning Engine** | Fully managed agent hosting — no Docker/Cloud Run ops. Built-in session memory, scalability, and secure endpoints. |
| **Gemini 3 Flash/Pro** | Best-in-class reasoning for long regulatory documents. |
| **Tinyfish Web Agent** | Autonomous browser navigation removes the need for maintenance. |
| **Firestore + Vertex AI Search** | Polyglot strategy: Firestore for structural data/CRUD, Vertex AI Search for semantic RAG. Fully managed, zero index maintenance. |
| **Materiality-first design** | Focuses on decision-support, filtering regulatory noise. |

### Who Benefits

- **Compliance Officers** — go from spending hours reading portals to reviewing a curated, AI-reasoned shortlist.
- **Clients (regulated firms)** — get timely, personalised alerts with clear recommended actions, reducing risk of non-compliance.
- **Legal Teams** — get a conversational interface to the full regulatory knowledge base for deep research.

### The Outcome

A compliance team that used to manually monitor 4+ portals, read dozens of documents, and write bespoke client briefs can now **oversee the same workflows in minutes per day** — with the AI doing the heavy lifting and the human providing oversight and approval.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Core Business Rules](#2-core-business-rules)
3. [Domain Entities & Data Contracts](#3-domain-entities--data-contracts)
4. [Business Logic Flows](#4-business-logic-flows)
   - 4.1 [Regulatory Monitoring Pipeline](#41-regulatory-monitoring-pipeline)
   - 4.2 [Materiality Scoring Engine](#42-materiality-scoring-engine)
   - 4.3 [Client Notification Logic](#43-client-notification-logic)
   - 4.4 [User Query & RAG Flow](#44-user-query--rag-flow)
5. [Agent Reasoning Rules](#5-agent-reasoning-rules)
6. [UI/UX Specification](#6-uiux-specification)
   - 6.1 [Design System](#61-design-system)
   - 6.2 [Pages & Layouts](#62-pages--layouts)
   - 6.3 [Component Library](#63-component-library)
   - 6.4 [Interaction Patterns](#64-interaction-patterns)
7. [Access Control & Roles](#7-access-control--roles)
8. [Error Handling & Edge Cases](#8-error-handling--edge-cases)

---

## 1. Product Overview

The **Regulatory Compliance Agent** is an autonomous, AI-powered platform that monitors East African regulatory bodies (CBK, CMA, CA, EAC) on a continuous basis. It reads new circulars, notices, and policy changes, then uses Gemini 2.0 Flash (hosted on Vertex AI Reasoning Engine) to assess the "materiality" of each update — i.e., whether it is relevant and impactful enough to warrant action by a specific client.

### Target Users

| Role | Description |
|---|---|
| **Compliance Officer** | Primary user. Reviews agent-flagged updates and approves client notifications. |
| **Legal Analyst** | Drills into specific regulatory documents for research. |
| **Client Administrator** | Manages their organisation's compliance profile and tags. |
| **Platform Admin** | Manages all tenants, system health, and scheduler configuration. |

### Key Value Propositions

- **Automation**: Eliminates manual monitoring of 4+ regulator portals.
- **Materiality Filtering**: Uses LLM reasoning to surface only what matters, reducing noise.
- **Audit Trail**: Every agent decision is logged with reasoning and evidence for compliance defensibility.
- **Conversational Access**: Clients can query the agent in natural language to understand how regulations affect them.

---

## 2. Core Business Rules

### Monitoring Rules

- **BR-M01**: The scheduler triggers a monitoring sweep **every 1 hour** for each configured regulator source.
- **BR-M02**: A regulatory update is only persisted if its `reference_number` does not already exist in `regulatory_updates`. (Deduplication by reference number.)
- **BR-M03**: If a page structure change causes the Tinyfish agent to return an empty array, an alert is raised to the Platform Admin and no data is written.
- **BR-M04**: Updates older than 90 days from the current sweep date are **not** re-ingested but are retained in Firestore for RAG purposes.

### Materiality Rules

- **BR-MA01**: Every new `regulatory_update` document triggers the materiality reasoning loop for **all active** `client_profiles`.
- **BR-MA02**: A materiality score is expressed as a value between **0.0 – 1.0** with three thresholds:
  - `< 0.3` → **Low** (No action required; logged only)
  - `0.3 – 0.7` → **Medium** (Flagged for Compliance Officer review)
  - `> 0.7` → **High** (Immediately escalated; notification drafted)
- **BR-MA03**: Materiality is always computed *per client profile*. The same regulation can be **High** for a Fintech firm and **Low** for a Telecom.
- **BR-MA04**: A materiality determination must include a `reasoning_summary` (LLM-generated text) and at least one `evidence_quote` extracted directly from the source document.
- **BR-MA05**: A Compliance Officer may **override** a materiality score. Overrides are logged separately in `materiality_overrides` with the officer's ID, timestamp, and override reason.

### Notification Rules

- **BR-N01**: Client notifications are generated as drafts and **require Compliance Officer approval** before being sent.
- **BR-N02**: No client should receive more than **3 notifications per day** (batching logic applies for high-volume periods).
- **BR-N03**: Notifications must include: document title, source, date, materiality score, a plain-English impact summary, and a recommended action.

### Data Retention Rules

- **BR-DR01**: `regulatory_updates` are retained indefinitely.
- **BR-DR02**: `session_history` records are retained for **12 months**, then archived or deleted.
- **BR-DR03**: `materiality_overrides` are retained indefinitely for audit purposes.

---

## 3. Domain Entities & Data Contracts

### `regulatory_updates` Collection

```typescript
interface RegulatoryUpdate {
  id: string;                   // Auto-generated Firestore ID
  source: "CBK" | "CMA" | "CA" | "EAC";
  title: string;
  content: string;              // Full extracted text / markdown
  url: string;
  reference_number: string;     // Unique identifier from regulator (for deduplication)
  embedding: Vector;            // Firestore vector field for RAG
  metadata: {
    date: Timestamp;            // Publication date from regulator
    category: string;           // e.g., "Circular", "Gazette Notice", "Policy"
    ingested_at: Timestamp;     // When it was stored by our pipeline
  };
  status: "pending" | "processed" | "failed";
}
```

### `client_profiles` Collection

```typescript
interface ClientProfile {
  client_id: string;
  name: string;
  industry: "Fintech" | "Telecom" | "Banking" | "Insurance" | "Healthcare" | string;
  compliance_requirements: string[]; // e.g., ["AML/KYC", "Data Protection Act"]
  tags: string[];                    // Keywords for materiality matching
  notification_email: string;
  active: boolean;
}
```

### `materiality_determinations` Collection

```typescript
interface MaterialityDetermination {
  id: string;
  update_id: string;            // FK -> regulatory_updates
  client_id: string;            // FK -> client_profiles
  score: number;                // 0.0 - 1.0
  level: "Low" | "Medium" | "High";
  reasoning_summary: string;    // LLM-generated plain English
  evidence_quotes: string[];    // Direct excerpts from source content
  determined_at: Timestamp;
  overridden: boolean;
  override_id?: string;         // FK -> materiality_overrides
}
```

### `session_history` Collection

```typescript
interface SessionHistory {
  session_id: string;
  client_id: string;
  user_id: string;
  messages: {
    role: "user" | "agent";
    content: string;
    timestamp: Timestamp;
    sources_cited?: string[];   // update_ids used from RAG
  }[];
  started_at: Timestamp;
  last_active: Timestamp;
}
```

### `notifications` Collection

```typescript
interface Notification {
  id: string;
  client_id: string;
  update_id: string;
  determination_id: string;
  status: "draft" | "approved" | "sent" | "suppressed";
  subject: string;
  body: string;                 // Plain-English impact summary
  recommended_action: string;
  approved_by?: string;         // Compliance Officer user ID
  approved_at?: Timestamp;
  sent_at?: Timestamp;
}
```

---

## 4. Business Logic Flows

### 4.1 Regulatory Monitoring Pipeline

```
Cloud Scheduler (1x/hr)
      │
      ▼
Cloud Function
  ├── For each source: [CBK, CMA, CA, EAC]
  │     ├── Build Tinyfish natural-language goal prompt
  │     ├── Call Tinyfish Web Agent API
  │     └── Receive structured JSON array
  │
  ├── For each item in JSON array:
  │     ├── Check: does reference_number exist in Firestore? → SKIP if yes
  │     ├── Generate vector embedding (Vertex AI text-embedding-004)
  │     ├── Write to regulatory_updates (status: "pending")
  │     └── Firestore trigger fires → Materiality Engine
  │
  └── On error:
        ├── Log to Cloud Logging
        └── Publish alert to Platform Admin (Pub/Sub → Notification)
```

### 4.2 Materiality Scoring Engine

```
Trigger: New document in regulatory_updates
      │
      ▼
Vertex AI Reasoning Engine
  ├── Load all active client_profiles
  ├── For each client_profile:
  │     ├── RETRIEVE: findNearest() on regulatory_updates embedding
  │     │             using client's tags as query vectors (RAG context)
  │     │
  │     ├── PROMPT Gemini 2.0 Flash:
  │     │   ┌────────────────────────────────────────────────┐
  │     │   │ System: You are a regulatory compliance expert. │
  │     │   │ Client Profile: {industry, tags, requirements}  │
  │     │   │ Regulatory Update: {title, content, source}     │
  │     │   │ RAG Context: {similar past updates}             │
  │     │   │                                                 │
  │     │   │ Task: Evaluate materiality on a scale of 0-1.  │
  │     │   │ Return JSON: {score, reasoning, evidence_quotes}│
  │     │   └────────────────────────────────────────────────┘
  │     │
  │     ├── Parse LLM response → determine level (Low/Medium/High)
  │     ├── Write materiality_determination to Firestore
  │     └── If level == "High" → Trigger Notification Draft Flow
  │
  └── Update regulatory_update.status = "processed"
```

### 4.3 Client Notification Logic

```
Trigger: New High-materiality determination
      │
      ▼
Notification Draft Engine
  ├── Check: how many notifications sent to this client today?
  │     └── If >= 3 → hold in queue, retry after midnight
  │
  ├── Generate notification content (Gemini 2.0 Flash):
  │   - subject: one-line regulatory alert title
  │   - body: plain English impact summary (max 200 words)
  │   - recommended_action: specific compliance step
  │
  ├── Write notification (status: "draft") to Firestore
  │
  └── Alert Compliance Officer via dashboard notification badge
        │
        ▼ (Officer reviews draft)
  ├── If APPROVED → status = "approved"
  │     └── Send email via Firebase Extensions (Email)
  │           └── status = "sent"
  │
  └── If REJECTED → status = "suppressed" + log reason
```

### 4.4 User Query & RAG Flow

```
User types query in Chat UI
      │
      ▼
Frontend → POST /chat to Vertex AI Reasoning Engine endpoint
      │
      ▼
Reasoning Engine (session-aware)
  ├── Maintain session context from session_history
  ├── Embed user query → findNearest() on regulatory_updates
  ├── Retrieve top-K relevant documents (RAG context)
  ├── Prompt Gemini 2.0 Flash with:
  │     - Session history
  │     - RAG-retrieved updates
  │     - User's client_profile
  │     - User query
  │
  ├── Stream response tokens back to UI
  └── Save exchange to session_history + cite source update_ids
```

---

## 5. Agent Reasoning Rules

The Vertex AI Reasoning Engine uses a structured system prompt with the following embedded rules:

| Rule ID | Rule |
|---|---|
| **AR-01** | Always ground responses in retrieved Firestore documents. Never hallucinate regulatory content that was not retrieved. |
| **AR-02** | When computing materiality, explicitly list which client `tags` matched which parts of the regulatory text. |
| **AR-03** | If no relevant documents are retrieved via RAG, respond with "I do not have enough information on this specific regulation" rather than guessing. |
| **AR-04** | Always assign a numeric confidence alongside materiality score (0.0–1.0 confidence on the score itself). |
| **AR-05** | If a user asks a question outside compliance scope ("what's the weather?"), politely redirect to compliance topics. |
| **AR-06** | All materiality outputs must be returned as structured JSON before natural-language formatting. |

---

## 6. UI/UX Specification

### 6.1 Design System

#### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-primary` | `#0A0C10` | App background |
| `--color-bg-surface` | `#111318` | Cards, panels |
| `--color-bg-elevated` | `#1A1D26` | Modals, dropdowns |
| `--color-accent-primary` | `#4F6EF7` | CTAs, active states |
| `--color-accent-secondary` | `#8B5CF6` | Secondary highlights |
| `--color-accent-success` | `#10B981` | Low materiality, success |
| `--color-accent-warning` | `#F59E0B` | Medium materiality |
| `--color-accent-danger` | `#EF4444` | High materiality, errors |
| `--color-text-primary` | `#F1F5F9` | Primary body text |
| `--color-text-secondary` | `#8B99B5` | Labels, metadata |
| `--color-border` | `#1E2433` | Dividers, card borders |

#### Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display | Inter | 800 | 2.5rem |
| Heading 1 | Inter | 700 | 1.75rem |
| Heading 2 | Inter | 600 | 1.25rem |
| Body | Inter | 400 | 0.9375rem |
| Caption | Inter | 400 | 0.8125rem |
| Monospace | JetBrains Mono | 400 | 0.875rem |

#### Materiality Badges

```
[ HIGH ]    → bg: rgba(239,68,68,0.15)  border: #EF4444  text: #EF4444
[ MEDIUM ]  → bg: rgba(245,158,11,0.15) border: #F59E0B  text: #F59E0B
[ LOW ]     → bg: rgba(16,185,129,0.15) border: #10B981  text: #10B981
```

---

### 6.2 Pages & Layouts

#### Global Layout

```
┌──────────────────────────────────────────────────────────┐
│  [SIDEBAR 240px fixed]  │  [MAIN CONTENT area - fluid]   │
│                         │                                 │
│  ◉ Logo + Platform name │  [TOP HEADER BAR]               │
│  ─────────────────────  │  Page Title  [Search] [Bell] [Avatar] │
│  📊 Dashboard           │                                 │
│  📋 Updates Feed        │  ─────────────────────────────  │
│  💬 AI Assistant        │                                 │
│  👥 Client Profiles     │  [PAGE CONTENT]                 │
│  🔔 Notifications       │                                 │
│  ⚙ Settings            │                                 │
│                         │                                 │
│  ─────────────────────  │                                 │
│  [User Avatar + Name]   │                                 │
│  [Role Badge]           │                                 │
└─────────────────────────┴─────────────────────────────────┘
```

---

#### Page 1 — Dashboard (Home)

**Purpose**: At-a-glance operational overview.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  STAT CARDS (4 column grid)                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐│
│  │ Updates    │ │ HIGH       │ │ Pending    │ │ Clients  ││
│  │ Today: 12  │ │ Alerts: 3  │ │ Review: 5  │ │ Active:8 ││
│  │ ↑ from 8   │ │ ⚠ Urgent   │ │ Drafts: 2  │ │ All OK   ││
│  └────────────┘ └────────────┘ └────────────┘ └──────────┘│
│                                                             │
│  ┌──────────────────────────────┐ ┌────────────────────────┐│
│  │  RECENT UPDATES FEED         │ │ MATERIALITY HEATMAP    ││
│  │  (scrollable, last 24hrs)    │ │                        ││
│  │  [CBK] Circular 15/2026  HIGH│ │  CBK  ██████░░  High  ││
│  │  [CMA] Notice on ETFs  MEDIUM│ │  CMA  ████░░░░  Med   ││
│  │  [EAC] Draft Policy     LOW  │ │  CA   ██░░░░░░  Low   ││
│  │  ...                         │ │  EAC  ███░░░░░  Med   ││
│  └──────────────────────────────┘ └────────────────────────┘│
│                                                             │
│  AGENT ACTIVITY LOG (timeline, last 6 events)              │
│  ○ 05:47  Materiality sweep completed for 8 clients        │
│  ○ 05:02  New CBK circular ingested and processed          │
│  ○ 04:00  Scheduled sync ran — 0 new updates               │
└─────────────────────────────────────────────────────────────┘
```

**Business Logic on this page**:
- Stat cards pull live Firestore counts.
- Heatmap is computed from the last 7 days of `materiality_determinations` grouped by source.
- Activity log reads from Cloud Logging, limited to 10 most recent agent events.

---

#### Page 2 — Updates Feed

**Purpose**: Browse, filter, and review all ingested regulatory updates.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  FILTERS BAR                                                │
│  [Source: CBK CMA CA EAC ALL]  [Level: HIGH MED LOW]       │
│  [Date range picker]  [Search by keyword...]                │
│                                                             │
│  UPDATES LIST (table / card view toggle)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ● [CBK]  Circular 15/2026 — Digital Credit Providers │  │
│  │   Date: Mar 15, 2026  |  Category: Circular          │  │
│  │   [HIGH] Score: 0.87  |  Clients affected: 5         │  │
│  │                          [View Details] [Override ▼] │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ ● [CMA]  Notice — REITs Amendment Regulations        │  │
│  │   Date: Mar 14, 2026  |  Category: Gazette Notice    │  │
│  │   [MEDIUM] Score: 0.52  |  Clients affected: 2       │  │
│  │                           [View Details] [Override ▼]│  │
│  └──────────────────────────────────────────────────────┘  │
│  [Load more]                                                │
└─────────────────────────────────────────────────────────────┘
```

**Update Detail Drawer / Modal**:
```
┌───────────────────────────────────────────────────────┐
│  CBK Circular 15/2026 — Digital Credit Providers  ✕   │
│  ───────────────────────────────────────────────────  │
│  Source: Central Bank of Kenya   Date: Mar 15, 2026   │
│  Reference: CBK/RD/15/2026       [View Source PDF ↗]  │
│                                                       │
│  MATERIALITY (per client)                             │
│  ┌──────────────────┬───────────┬──────────────────┐  │
│  │ Client           │ Score     │ Level            │  │
│  ├──────────────────┼───────────┼──────────────────┤  │
│  │ Acme Fintech     │ 0.87      │ [HIGH]           │  │
│  │ TelCo Kenya      │ 0.21      │ [LOW]            │  │
│  └──────────────────┴───────────┴──────────────────┘  │
│                                                       │
│  AGENT REASONING (Acme Fintech)                       │
│  "This circular directly applies to Digital Credit    │
│   Providers licensed under the CBK Act. Acme Fintech  │
│   holds an active DCP licence and must comply with    │
│   the new tier-based lending caps by June 2026..."   │
│                                                       │
│  EVIDENCE QUOTED                                      │
│  ┌───────────────────────────────────────────────┐   │
│  │ "All DCP licensees shall, with effect from    │   │
│  │  1 June 2026, cap individual loan amounts..."│   │
│  └───────────────────────────────────────────────┘   │
│                                                       │
│  [Override Score]  [Approve Notification Draft]       │
└───────────────────────────────────────────────────────┘
```

---

#### Page 3 — AI Assistant (Chat)

**Purpose**: Conversational access to the regulatory knowledge base.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
│  AI Compliance Assistant  [Session: #3]  [New Session +]    │
│                                                             │
│  CHAT AREA (scrollable)                                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  🤖  Hello. I can answer questions about regulatory   │  │
│  │      updates relevant to your compliance profile.    │  │
│  │                                                      │  │
│  │                                        👤 User       │  │
│  │      What does the CBK March 2026 DCP               │  │
│  │      circular mean for us?                ▶         │  │
│  │                                                      │  │
│  │  🤖  Based on Circular 15/2026 (CBK, Mar 15 2026),  │  │
│  │      your company — as a licensed DCP — must...     │  │
│  │      [Source: CBK/RD/15/2026 ↗]                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  INPUT BAR                                                  │
│  ┌─────────────────────────────────────────────┬────────┐  │
│  │  Ask about regulations, impacts, deadlines...│  Send  │  │
│  └─────────────────────────────────────────────┴────────┘  │
│  Suggested: "What are my key DCP obligations?" |           │
│             "Any EAC updates this month?"                  │
└─────────────────────────────────────────────────────────────┘
```

**Right Sidebar (Source Panel)**:
- Shows the RAG-retrieved source documents used in the last response.
- Each source is a collapsible card with title, date, and an excerpt quote.

---

#### Page 4 — Client Profiles

**Purpose**: Manage client compliance profiles.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  [+ Add Client]                           [Search clients]  │
│                                                             │
│  CLIENTS GRID (3 columns)                                   │
│  ┌────────────────────┐ ┌────────────────────┐             │
│  │ Acme Fintech       │ │ TelCo Kenya        │             │
│  │ Industry: Fintech  │ │ Industry: Telecom  │             │
│  │ Tags: DCP, AML, KYC│ │ Tags: Data, Lic.  │             │
│  │ Updates: 3 pending │ │ Updates: 1 pending │             │
│  │ [Edit] [Chat]      │ │ [Edit] [Chat]      │             │
│  └────────────────────┘ └────────────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

**Edit Client Profile Modal**:
- Form with fields: Name, Industry (dropdown), Compliance Requirements (multi-tag input), Notification Email, Active toggle.
- Save writes directly to `client_profiles` Firestore collection.

---

#### Page 5 — Notifications

**Purpose**: Review, approve, or suppress drafted client notifications.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  TABS: [Pending Review (3)] [Approved] [Sent] [Suppressed]  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ DRAFT — Acme Fintech                                 │  │
│  │ RE: CBK DCP Circular 15/2026  |  Level: [HIGH]       │  │
│  │                                                      │  │
│  │ Subject: Action Required — CBK DCP Lending Caps      │  │
│  │ Body: "Dear Acme Fintech, effective 1 June 2026,     │  │
│  │ the CBK has introduced tier-based lending caps..."   │  │
│  │ Recommended Action: Review and update loan          │  │
│  │ origination systems by 31 May 2026.                  │  │
│  │                                                      │  │
│  │ [✓ Approve & Send]  [✎ Edit Draft]  [✕ Suppress]     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

### 6.3 Component Library

| Component | Description |
|---|---|
| `<MaterialityBadge level>` | Coloured pill: HIGH / MEDIUM / LOW |
| `<SourceTag source>` | Logo + label for CBK / CMA / CA / EAC |
| `<ScoreBar score>` | Animated horizontal bar 0→1 with colour fill |
| `<RegUpdateCard update>` | Compact card with title, source, date, badge |
| `<ChatBubble role content>` | User vs agent styled message bubble |
| `<RAGSourcePanel sources>` | Collapsible list of cited RAG sources |
| `<ProfileTag text>` | Rounded tag chip for industries/compliance tags |
| `<ActivityTimeline events>` | Vertical timeline of agent activity logs |
| `<NotificationDraftCard>` | Approval card with edit/approve/suppress actions |

---

### 6.4 Interaction Patterns

#### Real-time Updates

- Firestore real-time listeners (onSnapshot) keep the Updates Feed and Dashboard stat cards live without full page refreshes.
- New HIGH-level updates trigger a toast notification in the UI and increment the bell badge counter.

#### Chat Streaming

- Agent responses stream token-by-token using Server-Sent Events (SSE) from the Vertex AI Reasoning Engine endpoint.
- A typing indicator appears while the agent is generating.

#### Override Flow

- Compliance Officers can open any materiality determination and click "Override Score".
- A modal appears with a numeric slider (0.0–1.0), a required reason text field, and a confirm button.
- The override is saved to `materiality_overrides` and the determination record is updated.

#### Optimistic UI

- Approving a notification draft immediately moves it to the "Approved" tab visually before the Firestore write completes. A spinner appears on the card during the write. On error, it rolls back with an error toast.

---

## 7. Access Control & Roles

| Feature | Compliance Officer | Legal Analyst | Client Admin | Platform Admin |
|---|---|---|---|---|
| View Updates Feed | ✅ | ✅ | ✅ (own profile only) | ✅ |
| Override Materiality | ✅ | ❌ | ❌ | ✅ |
| Approve Notifications | ✅ | ❌ | ❌ | ✅ |
| Manage Client Profiles | ✅ | ❌ | ✅ (own only) | ✅ |
| AI Assistant | ✅ | ✅ | ✅ | ✅ |
| View All Clients | ✅ | ✅ | ❌ | ✅ |
| Platform Settings | ❌ | ❌ | ❌ | ✅ |

- Authentication via **Firebase Authentication** (Google Sign-In or email/password).
- Role assignments stored in a `users` Firestore collection.
- Firestore Security Rules enforce field-level and collection-level access.

---

## 8. Error Handling & Edge Cases

| Scenario | System Behaviour |
|---|---|
| Tinyfish returns empty array | Alert Platform Admin via Pub/Sub; skip write; log `WARN` to Cloud Logging |
| LLM returns malformed JSON | Retry prompt up to 3 times; on 3rd failure, set update status to `"failed"` and alert admin |
| Client profile has empty `tags` | Materiality score defaults to 0.0 (Low) with note: "Insufficient profile data for analysis" |
| Notification daily cap reached | Notification held in `queued` status; retry attempted at midnight |
| Firestore Vector Search returns 0 results | Agent responds with grounded disclaimer per AR-03 |
| User session timeout | Session history is preserved; user is prompted to re-authenticate; session resumes from last state |
| Duplicate `reference_number` on ingest | Skip silently; log `INFO` — no alert required |

---

*Document maintained by the Engineering & Compliance Team. Last updated: March 2026.*
