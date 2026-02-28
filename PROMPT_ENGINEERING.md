# Prompt Engineering Showcase: Building CodeForge

This document demonstrates the prompt engineering approach used to build CodeForge — a 15,800-line, full-stack TypeScript application — from an empty directory to a feature-complete platform in a single development session. It highlights how structured context-setting, iterative feedback, and deliberate guardrails guided an AI agent (Claude Code) through 22 pull requests across 141 source files.

## The Approach

The development followed a pattern of **specification → clarification → iteration → verification → refinement**. Rather than writing code manually, every feature was built through natural language prompts that established context, defined constraints, and provided real-time feedback. The key insight: **the quality of the output is directly proportional to the quality of the input**.

---

## Phase 1: Context Setting — The Project Specification

The session began with a comprehensive project specification document that established:

- **Who the users are**: Incarcerated students in DOC classroom environments
- **The core constraint**: Completely offline — no internet, no CDN, no cloud services
- **Architecture decisions**: Monorepo, specific tech stack, workspace structure
- **Data models**: Users, Cohorts, Exercises, Progress, Ratings, Achievements, Assignments
- **Scoring mechanics**: Tier-based points, attempt modifiers, solution penalties
- **Design principles**: Accessibility, theme support, role-based access

The specification concluded with an explicit invitation for the agent to ask clarifying questions before writing any code.

**Why this works**: By front-loading the domain knowledge, constraints, and architectural decisions, the AI agent had a complete mental model of the project before writing a single line of code. The invitation for questions ensured alignment before implementation began.

## Phase 2: Answering Clarifying Questions

Claude asked seven clarifying questions about the project setup, repository location, build process, testing strategy, dependency versions, theming, and exercise data format. The responses were direct and specific:

- The project would start from an empty repository in a local directory, with the agent responsible for initialization and GitHub setup.
- The exercise source data (jsFun-v2) was identified as living in an adjacent repository on the local filesystem.
- Rather than prescribing specific dependency versions, the developer deferred to the agent's judgment — requesting the latest stable, non-experimental versions that were mutually compatible.

A critical process guardrail was established here — the **code review workflow**:

A two-phase commit workflow was defined: each feature branch would first receive a commit adding explanatory code comments throughout the new work, followed by a cleanup commit that stripped the comments and retained only the code and relevant JSDoc annotations.

**Why this works**: This established a built-in review mechanism. By requiring the AI to add explanatory comments and then remove them, it forced a two-pass review cycle where the developer could read annotated code before merging clean code. This pattern was used for every feature branch through PR #17.

## Phase 3: Iterative Feature Development

### Skepticism as Quality Control

After the initial build phases progressed rapidly, the developer applied a healthy skepticism check — directly challenging the agent's completion claims and pressing for confirmation that the code had been genuinely tested, not just compiled.

**Why this works**: Rather than blindly accepting progress reports, these prompts forced the agent to be honest about the state of the code and triggered actual testing rather than just compilation checks.

### Asking Architectural Questions

Instead of just accepting the output, the developer asked probing questions about design decisions. For example, the developer questioned whether instructors should have access to the exercise-solving UI — acknowledging the pedagogical value for classroom demonstrations while probing for potential data integrity concerns from instructor-generated progress records.

**Why this works**: This prompted the agent to articulate trade-offs and consider edge cases (data integrity, role separation) rather than making silent assumptions. The collaborative tone also established that the developer was an engaged partner in the design process, not just issuing commands.

### Feature Discovery Through Observation

Several features emerged from the developer actually using the application and noticing gaps:

- After hands-on testing, the developer identified a missing exercise creation interface in the instructor dashboard and proposed a step-by-step wizard pattern, referencing an existing implementation in the jsFun-v2 project.
- Usage also revealed that the student dashboard lacked the filtering granularity present in the predecessor application, specifically around tier and collection-based progress views.

**Why this works**: By using the application between build phases, the developer caught missing features and UX gaps that a specification alone wouldn't cover. This created a natural feedback loop where each build cycle informed the next.

### Progressive Refinement — Getting Specific

When the initial response to a request was close but not quite right, the developer refined with increasing specificity:

**First pass** (broad): A general observation that the student dashboard lacked the filtering depth of the predecessor application.

**Second pass** (specific): Clarification that the request targeted dropdown-based filtering that dynamically updates a progress bar — along with the realization that the progress bar itself was also missing. Both features were requested together.

**Third pass** (targeted enhancement): A final refinement specifying that tier and collection dropdown filters should cascade to update the progress bars within the Collection Progress section below.

**Why this works**: Rather than trying to specify everything upfront, this iterative narrowing approach started broad, evaluated the result, and refined. Each prompt built on the previous output, creating a dialog rather than a monologue.

### Decisive Approval and Task Chaining

When the output met expectations, the developer gave clear, decisive approval and immediately chained the next task in the same prompt. For example, after approving a feature, the developer would direct the agent to commit, create a PR, merge, and then immediately begin the next feature branch — such as creating mock assignment seed data with varied configurations to validate both the instructor and student dashboard rendering.

**Why this works**: Explicit approval eliminated ambiguity about whether the agent should continue iterating or move on. Chaining tasks in a single prompt maintained momentum and reduced back-and-forth.

## Phase 4: Complex Feature Specification — The Chat System

The chat feature prompt (Prompt #27) demonstrates the most sophisticated prompt engineering in the session. Before specifying any requirements, the developer first asked the agent to evaluate whether the remaining work was stable enough to introduce a major new subsystem without disrupting existing functionality — demonstrating awareness of build-order dependencies.

Once the timing was confirmed, the prompt provided 11 specific behavioral requirements:

1. **Date-partitioned persistence** — chats survive server restarts within the same day
2. **Late-joiner history** — students see all previous messages from that day
3. **Lobby UX** — rules, active users, help examples, display name, enter button
4. **Rotating norms** — automated system messages every ~90 seconds, not persisted
5. **Accountability disclaimer** — visible notice about logging
6. **Daily archival** — logs saved for future reference by both students and instructors
7. **Cascade deletion** — logs deleted when cohorts are deleted
8. **Unread badges** — message count bubble on nav when away from chat
9. **@mentions** — tagging with cross-tab notifications
10. **iMessage-style UI** — rounded bubbles, own messages on one side
11. **Active user display** — live presence in chat room

The specification closed by inviting the agent to identify gaps or propose additional features beyond the 11 requirements listed.

**Why this works**: The prompt balanced specificity (exact UX behaviors) with flexibility (inviting additions). The behavioral descriptions used concrete scenarios (e.g., a student joining four hours after the server starts should see all prior conversation from that day) rather than abstract requirements, making implementation unambiguous. The strategic framing question at the top also demonstrated understanding of build-order dependencies.

## Phase 5: Testing and Quality Assurance

### Pushing for Comprehensive Testing

The developer requested a comprehensive multi-user test simulation, asking whether the agent could authenticate and operate multiple accounts concurrently within the chat system.

This single prompt triggered:
- A 300+ line multi-user test harness (`test-chat.cjs`)
- Authentication of 3 different user accounts
- 10 automated test suites covering all chat features
- 4 iterative test runs that caught and fixed real bugs:
  - Mongoose `type` keyword collision (server crash)
  - Unhandled async errors in socket handlers (server crash)
  - Missing minimum length validation on messages
  - Exercise type enum mismatch
  - REST response envelope parsing

**Why this works**: Rather than accepting surface-level validation, the developer pushed for multi-user simulation — the exact scenario that exposed real concurrency bugs. The open-ended framing gave the agent latitude to design the testing approach while making the expectation clear.

## Phase 6: Process Control and Documentation

At the end of the session, the developer directed a three-step close-out: commit and merge all remaining changes, update the technical README to reflect the complete feature set, and create a separate document showcasing the prompt engineering methodology used throughout the build.

**Why this works**: This prompt demonstrated awareness of the full development lifecycle — code isn't done when it compiles. It needs to be committed, reviewed, merged, and documented. The request for two distinct documentation types (technical README and process showcase) showed meta-awareness of the development process itself.

---

## Prompt Engineering Patterns Summary

### 1. Front-Load Context
Start with a comprehensive specification that establishes domain, constraints, architecture, and terminology. The more context the AI has upfront, the fewer corrections are needed later.

### 2. Invite Questions Before Building
Explicitly ask the agent to clarify unknowns. This catches misalignments early when they're cheap to fix.

### 3. Establish Process Guardrails
The code-comments-then-cleanup workflow created a built-in review cycle without requiring manual code inspection of every line. Define your review process upfront.

### 4. Be Skeptical
Challenge completion claims and demand proof of testing. Trust but verify. Healthy skepticism catches overconfident claims.

### 5. Use the Application Between Builds
Actually run and interact with the software. The best feature requests come from noticing gaps during real usage, not from re-reading specifications.

### 6. Refine Progressively
Start broad, evaluate, get specific. Three focused prompts produce better results than one massive specification.

### 7. Chain Tasks with Clear Approval
Give decisive approval and immediately queue the next task in the same prompt. This eliminates ambiguity and maintains momentum.

### 8. Describe Behaviors, Not Implementations
Describe what the user should experience (e.g., a student joining mid-day sees all prior conversation) rather than dictating technical implementation (e.g., date-partitioned message persistence). Let the agent choose the implementation; define the user experience.

### 9. Ask Architectural Questions
Probe design decisions with genuine curiosity. Questioning why a role has certain access surfaces hidden assumptions and trade-offs before they become bugs.

### 10. Push for Real Testing
Demand multi-user simulation and real-world scenarios. The request for concurrent account testing found 5 real bugs, including 2 that would crash the server in production.

---

## Results

| Metric | Value |
|--------|-------|
| Total user prompts | 20 substantive + 14 continuations/system |
| Pull requests merged | 22 |
| Source files created | 141 |
| Lines of code | ~15,800 |
| Features shipped | Auth, Exercises, Dashboards, Assignments, Achievements, Ratings, Exercise Wizard, Chat |
| Bugs found via testing | 5 (including 2 server-crash severity) |
| Themes | 8 |
| Mongoose models | 11 |
| API routes | 10 resource groups |
| Redux slices | 10 |
| Socket.IO events | 8 client + 10 server |

The entire platform — from `git init` to merged PR #22 — was built through prompt engineering: no manual code writing, just structured communication with an AI agent.
