# GridIron IQ — System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    iOS App (React Native + Expo)             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │  Games   │ │ Fantasy  │ │Prediction│ │    Social     │  │
│  │  Engine  │ │  System  │ │  Arena   │ │  & Profile    │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬────────┘  │
│       └─────────────┴────────────┴──────────────┘           │
│                          │                                   │
│                    Zustand Stores                            │
│                    Offline Cache                             │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / WebSocket
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                     API Gateway (Express)                     │
│              Rate Limiting · Auth · Logging                   │
└──────┬──────────┬──────────┬──────────┬─────────────────────┘
       │          │          │          │
┌──────┴───┐ ┌───┴────┐ ┌──┴───┐ ┌───┴──────┐
│  Game    │ │Fantasy │ │  ML  │ │  Social  │
│  Service │ │Service │ │Service│ │ Service  │
│          │ │        │ │      │ │          │
│ puzzles  │ │leagues │ │predict│ │ chat     │
│ scoring  │ │draft   │ │factors│ │ leaders  │
│ leaders  │ │scoring │ │backtest│ │ profile │
│ streaks  │ │waivers │ │      │ │ friends  │
└──────┬───┘ └───┬────┘ └──┬───┘ └───┬──────┘
       │         │         │         │
┌──────┴─────────┴─────────┴─────────┴────────────────────────┐
│                        Data Layer                             │
│  ┌──────────────┐  ┌─────────┐  ┌────────────────────────┐  │
│  │  PostgreSQL  │  │  Redis  │  │  ML Feature Store      │  │
│  │              │  │         │  │  (PostgreSQL + Redis)   │  │
│  │ users        │  │ cache   │  │                        │  │
│  │ games        │  │ sessions│  │ team_features          │  │
│  │ fantasy      │  │ live    │  │ matchup_features       │  │
│  │ predictions  │  │ scoring │  │ model_predictions      │  │
│  │ social       │  │ queues  │  │ model_versions         │  │
│  └──────────────┘  └─────────┘  └────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                    External Data Pipeline                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ CFBD API │  │ ESPN API │  │ Weather  │  │ 247Sports  │  │
│  │ (stats)  │  │(schedule)│  │   API    │  │(recruiting)│  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
│                                                              │
│              Cron Jobs: Daily sync + Game day live updates    │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema (Core Tables)

### Users & Auth
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    favorite_team VARCHAR(100),
    favorite_conference VARCHAR(50),
    elo_rating INTEGER DEFAULT 1200,
    streak_current INTEGER DEFAULT 0,
    streak_best INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Game Tables
```sql
CREATE TABLE grid_puzzles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    puzzle_date DATE UNIQUE NOT NULL,
    grid_size INTEGER NOT NULL DEFAULT 3,
    row_criteria JSONB NOT NULL,
    col_criteria JSONB NOT NULL,
    valid_answers JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE grid_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    puzzle_id UUID REFERENCES grid_puzzles(id),
    answers JSONB NOT NULL,
    score INTEGER NOT NULL,
    completion_time_seconds INTEGER,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, puzzle_id)
);

CREATE TABLE stat_stack_puzzles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    puzzle_date DATE UNIQUE NOT NULL,
    stat_category VARCHAR(50) NOT NULL,
    row_constraints JSONB NOT NULL,
    max_possible_score INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stat_stack_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    puzzle_id UUID REFERENCES stat_stack_puzzles(id),
    picks JSONB NOT NULL,
    total_stat_value INTEGER NOT NULL,
    penalties JSONB,
    final_score INTEGER NOT NULL,
    percentile FLOAT,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, puzzle_id)
);
```

### Fantasy Tables
```sql
CREATE TABLE fantasy_leagues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    commissioner_id UUID REFERENCES users(id),
    scoring_settings JSONB NOT NULL,
    roster_settings JSONB NOT NULL,
    max_teams INTEGER DEFAULT 10,
    draft_date TIMESTAMPTZ,
    draft_type VARCHAR(20) DEFAULT 'snake',
    season_year INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pre_draft',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fantasy_teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    league_id UUID REFERENCES fantasy_leagues(id),
    user_id UUID REFERENCES users(id),
    team_name VARCHAR(100) NOT NULL,
    roster JSONB NOT NULL DEFAULT '[]',
    record JSONB DEFAULT '{"wins": 0, "losses": 0, "ties": 0}',
    points_for FLOAT DEFAULT 0,
    points_against FLOAT DEFAULT 0,
    waiver_budget INTEGER DEFAULT 100,
    UNIQUE(league_id, user_id)
);

CREATE TABLE fantasy_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    league_id UUID REFERENCES fantasy_leagues(id),
    type VARCHAR(20) NOT NULL, -- 'trade', 'waiver', 'drop', 'add'
    details JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);
```

### ML Prediction Tables
```sql
CREATE TABLE ml_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id VARCHAR(100) NOT NULL,
    model_version VARCHAR(20) NOT NULL,
    spread_prediction FLOAT,
    spread_confidence FLOAT,
    total_prediction FLOAT,
    total_confidence FLOAT,
    upset_probability FLOAT,
    top_factors JSONB,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(game_id, model_version)
);

CREATE TABLE user_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    game_id VARCHAR(100) NOT NULL,
    prediction_type VARCHAR(20) NOT NULL,
    predicted_value JSONB NOT NULL,
    actual_result JSONB,
    points_earned INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, game_id, prediction_type)
);
```

## API Endpoints

### Games API
```
GET    /api/games/grid/today          — Get today's grid puzzle
POST   /api/games/grid/submit         — Submit grid answers
GET    /api/games/grid/history        — User's grid history
GET    /api/games/stat-stack/today    — Get today's Stat Stack
POST   /api/games/stat-stack/submit   — Submit Stat Stack picks
GET    /api/games/leaderboard/:game   — Game leaderboard
POST   /api/games/clash/matchmake     — Find opponent for Conference Clash
WS     /api/games/clash/play/:matchId — Real-time clash gameplay
```

### Fantasy API
```
POST   /api/fantasy/leagues           — Create league
GET    /api/fantasy/leagues/:id       — Get league details
POST   /api/fantasy/leagues/:id/join  — Join league
POST   /api/fantasy/draft/pick        — Make draft pick
GET    /api/fantasy/team/:id/roster   — Get team roster
POST   /api/fantasy/waivers/claim     — Submit waiver claim
POST   /api/fantasy/trades/propose    — Propose trade
PUT    /api/fantasy/trades/:id        — Accept/reject trade
WS     /api/fantasy/live/:leagueId   — Live scoring updates
```

### Predictions API
```
GET    /api/predictions/week/:week    — Get week's predictions
POST   /api/predictions/submit        — Submit user prediction
GET    /api/predictions/results/:week — Get results with scoring
GET    /api/predictions/model/accuracy — Model performance stats
GET    /api/predictions/leagues/:id   — Prediction league standings
```

### Social API
```
GET    /api/users/:id/profile         — User profile
GET    /api/leaderboard/global        — Global leaderboard
GET    /api/leaderboard/conference/:conf — Conference leaderboard
POST   /api/social/friends/add        — Add friend
GET    /api/social/feed               — Activity feed
WS     /api/social/chat/:roomId      — Chat room
```

## Game Day Scaling Strategy

### Traffic Pattern
- **Normal weekday**: ~1,000 concurrent users
- **Saturday game day**: ~10,000-15,000 concurrent users
- **Rivalry week / CFP**: ~25,000+ concurrent users

### Scaling Plan
1. **Read replicas**: PostgreSQL read replicas for leaderboards, stats queries
2. **Redis cluster**: Cached predictions, live scores, session data
3. **WebSocket scaling**: Redis pub/sub for cross-instance WS messages
4. **CDN**: Static assets, puzzle data (pre-generated)
5. **Pre-computation**: Friday night batch generates Saturday's predictions
6. **Queue**: Bull/BullMQ for fantasy scoring, waiver processing

### Caching Strategy
| Data | Cache Duration | Invalidation |
|------|---------------|--------------|
| Daily puzzle | 24 hours | Midnight ET |
| Leaderboards | 5 minutes | On new submission |
| ML predictions | Until game start | Friday refresh |
| Live scores | 10 seconds | WebSocket push |
| User profiles | 15 minutes | On update |
| Player database | 1 hour | Daily sync |
