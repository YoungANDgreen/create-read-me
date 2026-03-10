# GridIron IQ — Game Modes Specification

## 1. The Grid

### Concept
A daily grid puzzle where each cell requires a college football player who satisfies both the row and column criteria. Inspired by CFB Grids and Immaculate Grid but with deeper college football specifics.

### Grid Structure
- **Daily Mode**: 3x3 grid, 9 guesses, new puzzle at midnight ET
- **Challenge Mode**: 4x4 grid, 16 guesses, unlimited plays
- **Rivalry Mode**: 2-player head-to-head on same grid, fastest correct wins

### Criteria Categories
| Category | Examples |
|----------|---------|
| **Conference** | SEC, Big Ten, Big 12, ACC, Group of 5 conferences |
| **Award** | Heisman winner, Biletnikoff, Doak Walker, Thorpe, Butkus |
| **Draft Round** | 1st round pick, undrafted, top 10 pick |
| **Stat Threshold** | 1000+ rush yards in a season, 30+ TDs, 3000+ pass yards |
| **Bowl Game** | Played in CFP, Rose Bowl, Sugar Bowl participant |
| **School** | Played for Alabama, Ohio State, any specific program |
| **Era** | Played before 2000, played 2010-2020, active player |
| **Transfer** | Transferred at least once, transferred within conference |
| **Position** | QB, RB, WR, OL, DL, LB, DB, K/P |
| **Coaching Tree** | Played under Saban, Dabo, Urban Meyer, etc. |

### Scoring System
- **Correct answer**: Base points
- **Rarity bonus**: Fewer people who picked the same player = more points
- **Speed bonus**: Faster completion = multiplier
- **Streak bonus**: Consecutive days played

### Data Model
```typescript
interface GridPuzzle {
  id: string;
  date: string; // YYYY-MM-DD
  size: 3 | 4;
  rows: GridCriteria[];
  columns: GridCriteria[];
  validAnswers: Map<string, Player[]>; // cellId → valid players
  rarityScores: Map<string, Map<string, number>>; // cellId → playerId → rarity
}

interface GridCriteria {
  type: CriteriaType;
  value: string;
  displayText: string;
}

interface GridAttempt {
  userId: string;
  puzzleId: string;
  answers: Map<string, string>; // cellId → playerId
  score: number;
  completionTime: number; // seconds
  completedAt: string;
}
```

---

## 2. Stat Stack

### Concept
Pick 5 players (and their specific seasons) that maximize a daily stat category. Each pick must meet the row's criteria. Your total score is the sum of the stat values for your picks. Inspired by StatPad Game.

### Daily Format
- New stat category each day (rotating through offense, defense, special teams)
- 5 rows, each with a different constraint
- Players must be from college football (FBS)
- Must specify the exact season (year) for each pick

### Stat Categories (Rotating Daily)
| Day | Category | Unit |
|-----|----------|------|
| Monday | Rushing Yards | Single season |
| Tuesday | Passing Touchdowns | Single season |
| Wednesday | Receiving Yards | Single season |
| Thursday | Sacks | Single season |
| Friday | Interceptions | Single season |
| Saturday | Total Touchdowns | Single season |
| Sunday | All-Purpose Yards | Single season |

### Row Constraints (Example)
```
Row 1: Player from a Group of 5 school
Row 2: Player who was a freshman or sophomore
Row 3: Player from before 2010
Row 4: Player who won a conference championship
Row 5: Player who went undrafted
```

### Special Mechanics
- **"Targeting" Penalty**: Wrong answer has 15% chance to trigger targeting — your highest-scoring pick is ejected and replaced with 0
- **"Transfer Portal" Power-up**: Once per game, swap out one pick for a different player (earned by daily streaks)
- **"Overtime" Bonus**: If your total is within 5% of the day's max possible score, get bonus points
- **"Garbage Time" Penalty**: If you take more than 10 minutes, score is reduced by 10%

### Scoring
```
Total Score = Σ(stat_value[i]) + streak_bonus + speed_bonus - penalties
Percentile = your_score / max_possible_score * 100
```

### Data Model
```typescript
interface StatStackPuzzle {
  id: string;
  date: string;
  statCategory: StatCategory;
  rows: RowConstraint[];
  maxPossibleScore: number;
  topAnswers: Map<number, PlayerSeason[]>; // rowIndex → top 5 answers
}

interface StatStackAttempt {
  userId: string;
  puzzleId: string;
  picks: PlayerSeasonPick[];
  totalStatValue: number;
  penalties: Penalty[];
  finalScore: number;
  percentile: number;
}

interface PlayerSeasonPick {
  rowIndex: number;
  playerId: string;
  season: number; // year
  statValue: number;
  isValid: boolean;
}
```

---

## 3. Conference Clash

### Concept
Head-to-head knowledge battles organized around conference knowledge. Multiple sub-games that test deep college football knowledge beyond basic trivia.

### Sub-Games

#### A. Blind Resume
- Given a team's anonymized season stats, guess which team and year
- Stats shown: W-L, points scored, points allowed, total offense, total defense, SOS
- 3 guesses per round, 10 rounds
- Difficulty increases: more recent seasons are harder (less time to memorize)

#### B. Stat Line Sleuth
- Given a single player's stat line for a game, guess the player
- Progressive hints revealed every 10 seconds
- Hint 1: Conference and position
- Hint 2: Opponent and year
- Hint 3: School
- Faster guess = more points

#### C. Roster Roulette
- Given a year and school, name as many roster players as possible in 60 seconds
- Points per player, bonus for starters
- Difficulty levels: powerhouse programs (easier) to mid-majors (harder)

#### D. Coach's Film Room
- Given a play description or drive summary, identify the game
- "Team A drove 75 yards in 12 plays, converting 3 third downs, scoring with 0:01 left to win 31-28"
- Multiple choice with 4 options, all from same era

### Multiplayer
- Real-time 1v1 matchups via WebSocket
- Matchmaking by skill rating (Elo system)
- Conference loyalty: represent your school/conference
- Weekly conference leaderboards

---

## 4. Dynasty Builder

### Concept
Build the greatest all-time roster from a single college football program, constrained by a salary cap. Then pit your roster against other users' rosters in simulated matchups.

### Mechanics
- Choose a program (any FBS school, all-time)
- Salary cap: $100M (fictional)
- Player costs based on their college career achievements
- Must fill: QB, 2 RB, 3 WR, 1 TE, 5 OL, 4 DL, 3 LB, 4 DB, 1 K, 1 P
- Each player locked to their actual college stats

### Salary Pricing Algorithm
```
Base Cost = career_stats_composite * position_weight
Modifiers:
  + Heisman winner: 2x
  + All-American: 1.5x
  + 1st round pick: 1.3x
  + National champion: 1.2x
  - Pre-2000 era: 0.8x (historical discount)
```

### Simulated Matchups
- Statistical simulation based on real career stats
- 1000 simulations per matchup for win probability
- Head-to-head leaderboard
- Weekly tournaments

---

## 5. Prediction Arena (ML-Powered)

### Concept
Users predict game outcomes and compete against the ML model and each other. The ML model shows its reasoning, and users can learn from the model's analysis.

### Prediction Types
| Type | Description | Points |
|------|-------------|--------|
| **Winner** | Pick the winning team | 10 pts |
| **Spread** | Predict within 3 points of final margin | 25 pts |
| **Over/Under** | Total points over or under model's line | 10 pts |
| **Upset Alert** | Correctly predict an upset (model gives < 35% chance) | 50 pts |
| **Exact Score** | Predict exact final score | 500 pts |

### ML Model Transparency
- Show top 5 factors driving each prediction
- Historical accuracy by game type (rivalry, conference, ranked vs unranked)
- Confidence level with visual indicator
- "The model says X because..." explainer for each prediction

### Season-Long Leagues
- Create/join prediction leagues
- Cumulative scoring across the season
- Bowl season bonus rounds
- Playoff prediction brackets

### Data Model
```typescript
interface GamePrediction {
  gameId: string;
  userId: string;
  predictionType: PredictionType;
  userPick: PredictionValue;
  mlPrediction: PredictionValue;
  mlConfidence: number;
  mlFactors: PredictionFactor[];
  result?: PredictionResult;
  pointsEarned?: number;
}

interface PredictionFactor {
  name: string;
  weight: number;
  direction: 'favors_home' | 'favors_away' | 'neutral';
  description: string;
}
```
