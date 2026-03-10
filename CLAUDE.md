# GridIron IQ — College Football Super App

## Project Overview
GridIron IQ is an all-in-one college football iOS app combining interactive stat-based games, college fantasy football, ML-powered game predictions, and social features. It is NOT a basic trivia app — it features challenging grid-based puzzles, stat-matching games, and deep college football knowledge challenges inspired by CFB Grids, StatPad Game, Sporcle, and Sleeper Fantasy.

## Tech Stack
- **Frontend**: React Native (iOS-first) with Expo
- **Backend**: Node.js + Express API
- **Database**: PostgreSQL + Redis (caching)
- **ML Engine**: Python (scikit-learn / TensorFlow Lite for on-device inference)
- **Auth**: Clerk or Firebase Auth
- **Real-time**: WebSockets (Socket.io) for live scoring & multiplayer
- **Data Sources**: College football stats APIs (cfbd.com API, ESPN API)
- **State Management**: Zustand
- **UI Framework**: React Native Paper + custom design system

## Architecture
```
src/
├── app/                  # Navigation & screens
│   ├── (tabs)/           # Tab-based navigation
│   ├── games/            # Game screens
│   ├── fantasy/          # Fantasy football screens
│   ├── predictions/      # ML prediction screens
│   └── social/           # Social & leaderboards
├── components/           # Reusable UI components
├── lib/                  # Utilities, API clients
├── services/             # Business logic
│   ├── games/            # Game engines
│   ├── fantasy/          # Fantasy scoring & leagues
│   ├── ml/               # Prediction engine
│   └── data/             # Data fetching & caching
├── stores/               # Zustand state stores
└── types/                # TypeScript definitions
```

## Game Modes

### 1. The Grid (inspired by CFB Grids / Immaculate Grid)
- 3x3 or 4x4 grid with row/column criteria (conference, draft round, stat thresholds, awards, etc.)
- Daily puzzle + unlimited practice mode
- Rarity scoring — more obscure correct answers = higher score
- College football specific: conferences, bowl games, Heisman candidates, transfer portal

### 2. Stat Stack (inspired by StatPad Game)
- Pick 5 players + their seasons that maximize a daily stat category
- Categories: rushing yards, passing TDs, interceptions, sacks, receiving yards, punt return TDs, etc.
- "Targeting" penalty mechanic: wrong answer has chance to eject your best pick
- "Transfer Portal" power-up: swap one pick per game
- Leaderboard with percentile ranking

### 3. Conference Clash (original)
- Head-to-head knowledge battles organized by conference
- Given a stat line, guess the player and year
- "Blind Resume" mode: given anonymous team stats, guess which team
- Timed rounds with escalating difficulty

### 4. Dynasty Builder (original)
- Build the best all-time roster from a single program
- Salary cap constraints force tough choices
- Compare your roster vs. other users' rosters in simulated matchups
- Historical accuracy scoring

### 5. Prediction Arena (ML-powered)
- ML model trained on historical college football data
- Users make game predictions and compete against the model
- Features: spread predictions, over/under, upset alerts
- Model transparency: shows which factors drove each prediction
- Season-long prediction leagues

## Fantasy Football (College)
- Full college fantasy football leagues (Sleeper-style UX)
- Custom scoring, dynasty/keeper formats
- Live scoring with play-by-play
- In-app chat with GIF support
- Trade analyzer
- Waiver wire with FAAB bidding
- Mock drafts with AI opponents

## ML Prediction Engine
- Features: team stats, player stats, historical matchups, home/away, weather, injuries, coaching tenure, recruiting rankings
- Models: Gradient Boosted Trees (XGBoost) for spread prediction, Neural net for upset probability
- Weekly retraining on latest results
- Confidence intervals on all predictions
- Backtesting dashboard showing historical accuracy

## Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint
npm run lint
```

## Code Conventions
- TypeScript strict mode
- Functional components with hooks
- File naming: kebab-case for files, PascalCase for components
- Tests colocated with source files (*.test.ts)
- No `any` types — use proper typing
- All API calls through service layer, never directly in components
