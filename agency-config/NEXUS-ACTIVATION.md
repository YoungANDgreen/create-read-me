# NEXUS Activation — GridIron IQ

## Mode: NEXUS-Full
## Project: GridIron IQ — College Football Super App (iOS)

---

## Activation Prompt

```
Activate Agents Orchestrator in NEXUS-Full mode.

Project: GridIron IQ — College Football Super App
Specification: See CLAUDE.md and docs/ directory for full specification.

This is an iOS-first college football app combining:
1. Interactive stat-based puzzle games (grid games, stat-matching, blind resume challenges)
2. Full college fantasy football with Sleeper-style UX
3. ML-powered game prediction engine
4. Social features, leaderboards, and multiplayer

Target audience: College football fans aged 18-35 who want deeper engagement
than basic trivia — challenging, data-driven, community-focused games.

Execute the complete NEXUS pipeline:

- Phase 0: Discovery (Trend Researcher, Feedback Synthesizer, UX Researcher,
  Analytics Reporter, Legal Compliance Checker, Tool Evaluator)
  FOCUS: College football app market, competitor analysis (CFB Grids, StatPad,
  Sleeper, Sporcle), data source evaluation (CFBD API, ESPN), monetization models

- Phase 1: Strategy (Studio Producer, Senior Project Manager, Sprint Prioritizer,
  UX Architect, Brand Guardian, Backend Architect, AI Engineer, Finance Tracker)
  FOCUS: App architecture, game engine design, ML pipeline design, fantasy system
  architecture, brand identity for college football audience

- Phase 2: Foundation (DevOps Automator, Frontend Developer, Backend Architect,
  Mobile App Builder, UX Architect, Infrastructure Maintainer)
  FOCUS: React Native + Expo setup, API scaffolding, database schema, auth flow,
  design system implementation, CI/CD pipeline

- Phase 3: Build (Dev↔QA loops — all engineering + Evidence Collector)
  Sprint 1: The Grid game engine + daily puzzle system
  Sprint 2: Stat Stack game engine + leaderboards
  Sprint 3: Conference Clash + Dynasty Builder games
  Sprint 4: Fantasy football core (leagues, drafting, scoring)
  Sprint 5: ML prediction engine + Prediction Arena
  Sprint 6: Social features, chat, notifications
  Sprint 7: Polish, animations, performance optimization

- Phase 4: Harden (Reality Checker, Performance Benchmarker, API Tester,
  Legal Compliance Checker, Accessibility Auditor)
  FOCUS: Load testing for game day traffic spikes, data accuracy validation,
  fantasy scoring accuracy, ML model backtesting

- Phase 5: Launch (Growth Hacker, Content Creator, App Store Optimizer,
  Social Media Strategist, TikTok Strategist, Reddit Community Builder)
  FOCUS: App Store listing, college football subreddit strategy,
  TikTok/Instagram content showing game clips, influencer partnerships

- Phase 6: Operate (Analytics Reporter, Infrastructure Maintainer,
  Support Responder, AI Engineer for model retraining)
  FOCUS: Weekly model retraining, daily puzzle generation, game day scaling,
  user feedback loops, content freshness

Quality gates between every phase. Evidence required for all assessments.
Maximum 3 retries per task before escalation.
```

---

## Phase 0: Discovery — Agent Assignments

### Trend Researcher
```
Activate Trend Researcher for market intelligence on college football gaming apps.

Research scope:
1. Competitive landscape: CFB Grids, Immaculate Grid, StatPad Game, Sporcle sports,
   Sleeper Fantasy, ESPN Fantasy, Yahoo Fantasy, PFF
2. Market sizing: College football fan demographics, mobile gaming engagement,
   fantasy sports market (college specifically)
3. Trend forecast: NIL impact on college fantasy, transfer portal dynamics,
   conference realignment effects on trivia/games, AI in sports prediction
4. Monetization models: Freemium, subscription, in-app purchases, ad-supported
5. Data sources: CFBD API capabilities, ESPN API, sports-reference.com

Deliverables:
- Competitive landscape matrix (features vs competitors)
- Market opportunity assessment
- Data source evaluation with API limitations
- Monetization recommendation
```

### UX Researcher
```
Activate UX Researcher to analyze user behavior in sports gaming apps.

Research scope:
1. How users interact with grid-based sports trivia (CFB Grids, Immaculate Grid)
2. What makes StatPad-style games sticky (daily engagement, scoring, social sharing)
3. Pain points in existing college fantasy football (ESPN, Sleeper for NFL)
4. What college football fans want that doesn't exist yet
5. Engagement patterns: daily puzzles vs. on-demand play vs. game-day surges

Deliverables:
- User persona profiles (3-5 personas)
- Journey maps for each game mode
- Engagement pattern analysis
- Feature priority matrix based on user needs
```

### Legal Compliance Checker
```
Activate Legal Compliance Checker for college football app compliance audit.

Scope:
1. NCAA NIL rules and how they affect using player names/likenesses
2. Fantasy sports legality by state (college sports specifically)
3. App Store guidelines for sports/gaming apps
4. Data privacy (COPPA considerations for college-age users)
5. Sports data licensing requirements
6. Gambling vs. skill-based game classification

Deliverables:
- Compliance risk matrix
- Recommended legal framework
- Data licensing requirements summary
- State-by-state fantasy legality assessment
```

---

## Phase 1: Strategy — Agent Assignments

### AI Engineer
```
Activate AI Engineer to design the ML prediction engine architecture.

Specification: See docs/ml/prediction-engine-spec.md

Design scope:
1. Feature engineering pipeline (team stats, player stats, historical matchups,
   weather, injuries, coaching tenure, recruiting rankings, home/away)
2. Model architecture: XGBoost for spread prediction, neural net for upset probability
3. Training pipeline: weekly retraining on latest results
4. Inference: on-device via TensorFlow Lite or server-side with caching
5. Evaluation: backtesting framework, confidence calibration
6. Data pipeline: CFBD API → feature store → model training → prediction serving

Deliverables:
- ML system architecture document
- Feature engineering specification
- Model evaluation framework
- Data pipeline design
- Inference latency requirements (< 200ms)
```

### Mobile App Builder
```
Activate Mobile App Builder to design the React Native iOS app architecture.

Specification: See CLAUDE.md

Design scope:
1. React Native + Expo architecture for iOS-first development
2. Navigation structure (tab-based with nested stacks)
3. State management (Zustand stores for games, fantasy, predictions)
4. Offline-first strategy for daily puzzles
5. Real-time architecture for live fantasy scoring (WebSockets)
6. Performance optimization for game day traffic
7. Push notification architecture

Deliverables:
- App architecture document
- Navigation flow diagram
- State management design
- Offline/caching strategy
- Performance budget
```

### Brand Guardian
```
Activate Brand Guardian for GridIron IQ brand identity development.

Target audience: College football fans aged 18-35

Brand requirements:
1. Name: GridIron IQ (or suggest alternatives)
2. Visual identity: Bold, energetic, college football culture
   - Think Saturday gameday energy, not corporate ESPN
   - Colors that work across all 130+ FBS programs (neutral but spirited)
3. Voice: Knowledgeable but fun, competitive but inclusive, stats-savvy
4. Typography: Modern, readable on mobile, works in game UI
5. Icon/logo concept: Grid + football + intelligence

Deliverables:
- Brand foundation document
- Color system (CSS variables, hex values)
- Typography system (Google Fonts or system fonts)
- Voice guidelines with examples
- App icon concepts
```

---

## Key Coordination Points

### Data Pipeline (Critical Path)
```
CFBD API → Data Ingestion Service → PostgreSQL
                                  → Feature Store (ML)
                                  → Game Content Generator
                                  → Fantasy Scoring Engine
```

### Game Day Architecture (Peak Load)
```
Saturday 12pm-12am ET: 10-15x normal traffic
- Redis caching for all read-heavy operations
- WebSocket connections for live fantasy scoring
- Pre-computed ML predictions (generated Friday night)
- CDN for static game assets
- Auto-scaling backend instances
```

### Agent Coordination Matrix
| Component | Primary Agent | QA Agent | Support Agents |
|-----------|--------------|----------|----------------|
| Grid Game Engine | Frontend Developer | Evidence Collector | Backend Architect |
| Stat Stack Engine | Frontend Developer | Evidence Collector | Backend Architect |
| Fantasy System | Backend Architect | API Tester | Frontend Developer |
| ML Pipeline | AI Engineer | Test Results Analyzer | Backend Architect |
| Mobile UI | Mobile App Builder | Evidence Collector | UX Architect |
| Data Pipeline | Backend Architect | API Tester | DevOps Automator |
| Auth & Social | Backend Architect | API Tester | Security Engineer |
| DevOps/Infra | DevOps Automator | Performance Benchmarker | Infrastructure Maintainer |
