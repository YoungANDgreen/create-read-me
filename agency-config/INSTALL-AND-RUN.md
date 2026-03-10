# GridIron IQ — Agency Installation & Autonomous Execution Guide

## Step 1: Install Agency Agents

### For Claude Code (Primary)
```bash
cd agency-agents
bash scripts/install.sh
# Select "Claude Code" when prompted
# This copies all 68 agents to ~/.claude/agents/
```

### For Cursor
```bash
cd agency-agents
bash scripts/convert.sh cursor
# Copies .mdc rule files to .cursor/rules/
```

### Manual Installation (Any Tool)
Copy the agents you need from these directories into your tool's agent directory:
- `agency-agents/engineering/` — All engineering agents
- `agency-agents/design/` — All design agents
- `agency-agents/product/` — All product agents
- `agency-agents/testing/` — All testing agents
- `agency-agents/specialized/` — Orchestrator + specialized agents
- `agency-agents/marketing/` — All marketing agents (for launch phase)

## Step 2: Activate the Pipeline

### Option A: Full Autonomous Pipeline (NEXUS-Full)
Copy the activation prompt from `agency-config/NEXUS-ACTIVATION.md` and paste it to your AI coding tool.

The Agents Orchestrator will:
1. Read all specification documents in `docs/`
2. Execute Phase 0 (Discovery) with market research agents
3. Gate-check Phase 0 deliverables
4. Proceed through all 7 phases autonomously
5. Quality-gate every phase transition
6. Run Dev↔QA loops for all implementation

### Option B: Sprint-by-Sprint (Recommended for Hands-On)
```
Activate Agents Orchestrator in NEXUS-Sprint mode.

Project: GridIron IQ
Specification: See CLAUDE.md, docs/game-design/, docs/ml/, docs/architecture/

Sprint 1 — The Grid Game (2 weeks):
- Backend Architect: Grid puzzle data model, CFBD API integration, answer validation
- Frontend Developer: Grid UI component, daily puzzle screen, rarity scoring display
- UX Architect: Grid interaction design, mobile-first layout
- Evidence Collector: QA all grid functionality
- Deliverable: Playable daily grid puzzle with college football data

Begin at Phase 2 (Foundation) for Sprint 1.
Quality gate: A user can play today's grid puzzle, submit answers, and see their score.
```

### Option C: Single Agent Activation (Targeted Work)
```
# Example: Just build the ML prediction engine
Activate AI Engineer for GridIron IQ prediction engine.
Specification: docs/ml/prediction-engine-spec.md
Task: Implement the XGBoost spread predictor with CFBD API data pipeline.
Deliver: Working model with backtesting results on 2023 season.
```

## Step 3: Sprint Roadmap

### Sprint 1: The Grid (Weeks 1-2)
**Goal**: Playable daily grid puzzle
**Agents**: Backend Architect, Frontend Developer, UX Architect, Evidence Collector
**Key tasks**:
- [ ] CFBD API integration (players, teams, conferences, stats)
- [ ] Grid puzzle generation algorithm
- [ ] Grid UI with touch interactions
- [ ] Answer validation with rarity scoring
- [ ] Daily puzzle rotation (midnight ET)
- [ ] Basic leaderboard

### Sprint 2: Stat Stack (Weeks 3-4)
**Goal**: Stat Stack game fully playable
**Agents**: Backend Architect, Frontend Developer, Evidence Collector
**Key tasks**:
- [ ] Stat Stack puzzle generation from historical data
- [ ] Player search with autocomplete
- [ ] Row constraint validation
- [ ] Targeting/Transfer Portal mechanics
- [ ] Scoring engine with percentile calculation
- [ ] Leaderboard integration

### Sprint 3: Conference Clash + Dynasty Builder (Weeks 5-7)
**Goal**: Multiplayer knowledge battles + roster builder
**Agents**: Backend Architect, Frontend Developer, AI Engineer, Evidence Collector
**Key tasks**:
- [ ] Blind Resume game logic
- [ ] Stat Line Sleuth progressive hints
- [ ] Real-time 1v1 matchmaking (WebSocket)
- [ ] Dynasty Builder salary cap algorithm
- [ ] Roster simulation engine
- [ ] Elo rating system

### Sprint 4: Fantasy Football Core (Weeks 8-11)
**Goal**: Full college fantasy football
**Agents**: Backend Architect, Frontend Developer, Mobile App Builder, API Tester
**Key tasks**:
- [ ] League creation and management
- [ ] Snake/auction draft engine
- [ ] Live scoring engine
- [ ] Waiver wire with FAAB
- [ ] Trade system with analyzer
- [ ] In-league chat

### Sprint 5: ML Prediction Engine (Weeks 12-14)
**Goal**: Working prediction model + Prediction Arena
**Agents**: AI Engineer, Backend Architect, Frontend Developer, Test Results Analyzer
**Key tasks**:
- [ ] CFBD data pipeline for feature engineering
- [ ] XGBoost spread predictor training
- [ ] Upset classifier training
- [ ] Backtesting framework
- [ ] Prediction Arena UI
- [ ] Season-long prediction leagues

### Sprint 6: Social & Polish (Weeks 15-17)
**Goal**: Social features, notifications, polish
**Agents**: Frontend Developer, Mobile App Builder, UX Architect, Brand Guardian
**Key tasks**:
- [ ] User profiles and friends
- [ ] Activity feed
- [ ] Push notifications
- [ ] Animations and transitions
- [ ] Onboarding flow
- [ ] Dark mode

### Sprint 7: Hardening & Launch Prep (Weeks 18-20)
**Goal**: Production-ready, App Store submission
**Agents**: Reality Checker, Performance Benchmarker, App Store Optimizer, DevOps Automator
**Key tasks**:
- [ ] Load testing (game day simulation)
- [ ] Security audit
- [ ] App Store listing optimization
- [ ] Analytics instrumentation
- [ ] Crash reporting setup
- [ ] Beta testing (TestFlight)

## Step 4: Monitor & Iterate

After launch, keep these agents active:
- **Analytics Reporter**: Weekly engagement reports
- **AI Engineer**: Weekly model retraining
- **Infrastructure Maintainer**: Game day scaling
- **Support Responder**: User feedback triage
- **Content Creator**: Social media content from game results
- **Growth Hacker**: User acquisition optimization

## Key Files Reference
| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project overview, tech stack, conventions |
| `docs/game-design/game-modes-spec.md` | All game mode specifications |
| `docs/ml/prediction-engine-spec.md` | ML prediction engine design |
| `docs/architecture/system-architecture.md` | System architecture, DB schema, APIs |
| `agency-config/NEXUS-ACTIVATION.md` | Full NEXUS activation prompts |
| `agency-agents/` | The 68 AI agent definitions |
| `agency-agents/strategy/` | NEXUS orchestration playbooks |
