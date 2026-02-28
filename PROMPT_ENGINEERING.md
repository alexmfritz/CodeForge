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

The specification ended with an explicit invitation for dialogue:

> *"Here is the project specification document for the CodeForge project. Please ask any clarifying questions that you have before beginning."*

**Why this works**: By front-loading the domain knowledge, constraints, and architectural decisions, the AI agent had a complete mental model of the project before writing a single line of code. The invitation for questions ensured alignment before implementation began.

## Phase 2: Answering Clarifying Questions

Claude asked seven clarifying questions about the project setup, repository location, build process, testing strategy, dependency versions, theming, and exercise data format. The responses were direct and specific:

> *"Yes, we are creating this from a blank repo that will exist inside of the repos directory on my Desktop. It has not been created yet, and you will need to do so and link it to my GH."*

> *"The jsFun-v2 repository is located in the same repos folder on my Desktop."*

> *"I can't confirm that for sure, so just use the most recent, non-experimental or potentially-breaking versions that work together."*

A critical process guardrail was established here — the **code review workflow**:

> *"As part of the build process, after each section of functionality (branch) is implemented, I want a commit that adds code comments to all the work being committed that briefly breaks down purposes. After that commit and PR, I would like a cleanup branch used to remove those code comments and leaves only the code and any related JS Docs commentary."*

**Why this works**: This established a built-in review mechanism. By requiring the AI to add explanatory comments and then remove them, it forced a two-pass review cycle where the developer could read annotated code before merging clean code. This pattern was used for every feature branch through PR #17.

## Phase 3: Iterative Feature Development

### Skepticism as Quality Control

After the initial build phases progressed rapidly, a healthy skepticism check:

> *"Are you suggesting the ENTIRE project is complete already?"*

> *"And you've tested everything so far on your end and it runs clean?"*

**Why this works**: Rather than blindly accepting progress reports, these prompts forced the agent to be honest about the state of the code and triggered actual testing rather than just compilation checks.

### Asking Architectural Questions

Instead of just accepting the output, the developer asked probing questions about design decisions:

> *"Out of curiosity, is there a reason the instructor profile would need access to doing the exercises themselves? I legitimately don't mind, it is kind of cool, especially because giving them access to the exercise UI just as the students is going to be great for tutorial purposes when introducing the application. Alternatively, is there anything destructive or harmful to the data that could happen by the teacher being able to do exercises themselves?"*

**Why this works**: This prompted the agent to articulate trade-offs and consider edge cases (data integrity, role separation) rather than making silent assumptions. The conversational tone also established that the developer was an engaged collaborator, not just issuing commands.

### Feature Discovery Through Observation

Several features emerged from the developer actually using the application and noticing gaps:

> *"All excellent points. One thing I noticed is there is no UI in the instructor dashboard for creating new exercises via a form. The jsFun-v2 has a version of this, and it would be nice to be included in the instructor dashboard, but perhaps in the form of a step-by-step wizard..."*

> *"I noticed the student dashboard doesn't provide the same level of filtering that the jsFun-v2 repo does. Can we provide some of that filtering coverage between tier, collection, etc?"*

**Why this works**: By using the application between build phases, the developer caught missing features and UX gaps that a specification alone wouldn't cover. This created a natural feedback loop where each build cycle informed the next.

### Progressive Refinement — Getting Specific

When the initial response to a request was close but not quite right, the developer refined with increasing specificity:

**First pass** (broad):
> *"I noticed the student dashboard doesn't provide the same level of filtering that the jsFun-v2 repo does."*

**Second pass** (specific):
> *"I was specifically talking about the drop down filtering on the progress dashboard provided in jsFun-v2 that modifies the progress bar based on the filter. I also just noticed as I typed this, there is no progress bar. I would really like both of these features to be implemented."*

**Third pass** (targeted enhancement):
> *"I would like it if when you use a filter from either the Tier selection or the collection drop down, the progress bars underneath Collection Progress should be modified to represent those filters."*

**Why this works**: Rather than trying to specify everything upfront, this iterative narrowing approach started broad, evaluated the result, and refined. Each prompt built on the previous output, creating a dialog rather than a monologue.

### Decisive Approval and Task Chaining

When the output met expectations, the developer gave clear approval and immediately chained the next task:

> *"This is EXCELLENT. Please commit, create a great PR, and merge all this."*

> *"Go ahead and commit, create PR, and merge. Afterwards, I'd like you to begin the next branch to start two mock assignments with a single exercise and then one with many exercises with different data points to just see a visual from both the instructors and students dashboards for the sake of testing functionality and UI."*

**Why this works**: Explicit approval eliminated ambiguity about whether the agent should continue iterating or move on. Chaining tasks in a single prompt maintained momentum and reduced back-and-forth.

## Phase 4: Complex Feature Specification — The Chat System

The chat feature prompt (Prompt #27) demonstrates the most sophisticated prompt engineering in the session. It opened with a strategic question, then provided a detailed feature list:

> *"Do you think it is an appropriate time to implement the chat? It seems like the remaining functionality that might be included, modified, and improved upon moving forward will be nuance and subtle, so the chat can be included since it is the last major feature and it won't effect the rest of the core functionality."*

Then followed with 11 specific behavioral requirements:

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

The prompt closed with an open invitation:

> *"Am I missing anything? Thoughts? Any additional features you can think of to make this super cool?"*

**Why this works**: The prompt balanced specificity (exact UX behaviors) with flexibility (inviting additions). The behavioral descriptions used concrete scenarios ("if the server goes live and 4 hours later a student joins...") rather than abstract requirements, making implementation unambiguous. The strategic framing question at the top also demonstrated understanding of build order dependencies.

## Phase 5: Testing and Quality Assurance

### Pushing for Comprehensive Testing

> *"I'd like you to do a much more comprehensive test run of the chat if you can. Is there any way for you to simulate multiple accounts in the chat at once?"*

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

**Why this works**: Rather than accepting "it works on my machine," the developer pushed for multi-user simulation — the exact scenario that exposed real concurrency bugs. The question format ("Is there any way...") gave the agent latitude to design the testing approach while making the expectation clear.

## Phase 6: Process Control and Documentation

> *"Are you saying you are done for now? If so, please commit these changes, complete a PR, and merge them. Afterwards, the last task for the night is to update the project documentation to include everything you've done so far, as well as separate documentation that encapsulates the back-and-forth of our prompts that showcases my ability to create context and provide guardrails and feedback."*

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
Ask "is this really done?" and "does it actually work?" Trust but verify. Healthy skepticism catches overconfident claims.

### 5. Use the Application Between Builds
Actually run and interact with the software. The best feature requests come from noticing gaps during real usage, not from re-reading specifications.

### 6. Refine Progressively
Start broad, evaluate, get specific. Three focused prompts produce better results than one massive specification.

### 7. Chain Tasks with Clear Approval
"This is excellent. Commit, merge, and start X next." Decisive approval eliminates ambiguity and maintains momentum.

### 8. Describe Behaviors, Not Implementations
"If the server goes live and 4 hours later a student joins, they will see all the previous conversation from that day" is better than "implement message persistence with date partitioning." Let the agent choose the implementation; define the user experience.

### 9. Ask Architectural Questions
"Is there a reason the instructor would need access to exercises?" surfaces hidden assumptions and trade-offs before they become bugs.

### 10. Push for Real Testing
"Can you simulate multiple accounts at once?" — the prompt that found 5 real bugs, including 2 that would crash the server in production.

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
