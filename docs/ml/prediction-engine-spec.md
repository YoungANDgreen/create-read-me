# GridIron IQ — ML Prediction Engine Specification

## Overview
The prediction engine uses historical college football data to predict game outcomes, generate spread predictions, and identify potential upsets. It serves both the Prediction Arena game mode and provides intelligence for fantasy football recommendations.

## Data Sources

### Primary: College Football Data API (CFBD)
- **URL**: api.collegefootballdata.com
- **Coverage**: FBS games from 2000-present
- **Data points**: Game results, team stats, player stats, recruiting, drive data, play-by-play
- **Rate limits**: 1000 requests/hour (free tier)

### Secondary Sources
- ESPN API (schedules, odds, weather)
- 247Sports (recruiting rankings, composite ratings)
- Sagarin/Massey ratings (historical)

## Feature Engineering

### Team-Level Features (per game)
```python
features_team = {
    # Performance metrics (rolling averages, last 3/5/10 games)
    'points_scored_avg': float,        # Offensive output
    'points_allowed_avg': float,       # Defensive strength
    'yards_per_play_offense': float,   # Offensive efficiency
    'yards_per_play_defense': float,   # Defensive efficiency
    'third_down_conv_rate': float,     # Situational execution
    'red_zone_scoring_pct': float,     # Finishing ability
    'turnover_margin': float,          # Ball security vs. takeaways
    'explosive_play_rate': float,      # Plays of 20+ yards
    'sack_rate_offense': float,        # OL quality
    'sack_rate_defense': float,        # Pass rush quality

    # Contextual features
    'home_away': int,                  # 1 = home, 0 = away
    'rest_days': int,                  # Days since last game
    'conference_game': bool,           # Conference vs. non-conference
    'rivalry_game': bool,              # Historical rivalry flag
    'altitude': float,                 # Venue altitude (for mountain schools)
    'temperature': float,             # Game day weather
    'precipitation_prob': float,       # Rain/snow probability

    # Historical / strength
    'elo_rating': float,              # Custom Elo rating
    'strength_of_schedule': float,     # SOS via opponent win %
    'recruiting_composite_3yr': float, # Average recruiting rank (3-year)
    'returning_production_pct': float, # % of production returning

    # Coaching
    'coach_tenure_years': int,         # Years at current school
    'coach_career_win_pct': float,     # Career winning percentage
    'coach_vs_spread_pct': float,      # ATS performance
}
```

### Matchup-Level Features
```python
features_matchup = {
    'elo_diff': float,                 # Team A Elo - Team B Elo
    'recruiting_diff': float,          # Talent gap
    'offensive_style_clash': str,      # e.g., "air_raid_vs_3_4_defense"
    'historical_series': tuple,        # (wins_A, wins_B, last_5_results)
    'rest_advantage': int,             # Rest day difference
    'travel_distance': float,          # Away team travel distance (miles)
}
```

### Derived Features
```python
features_derived = {
    'momentum_score': float,           # Win streak weight + margin trend
    'consistency_score': float,        # Variance in performance metrics
    'clutch_factor': float,            # Performance in close games (within 7 pts)
    'early_season_adjustment': float,  # Weeks 1-3 uncertainty multiplier
    'injury_impact_score': float,      # Estimated impact of key injuries
}
```

## Model Architecture

### Model 1: Spread Predictor (Primary)
- **Algorithm**: XGBoost Regressor
- **Target**: Point spread (home_score - away_score)
- **Training data**: All FBS games 2005-present (~10,000 games)
- **Validation**: Rolling window (train on years 1-N, validate on year N+1)
- **Hyperparameters**: Tuned via Bayesian optimization (Optuna)

```python
xgb_params = {
    'max_depth': 6,
    'learning_rate': 0.05,
    'n_estimators': 500,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'reg_alpha': 0.1,
    'reg_lambda': 1.0,
    'min_child_weight': 5,
}
```

### Model 2: Upset Classifier
- **Algorithm**: Neural Network (PyTorch)
- **Target**: Binary — did the underdog win? (using pre-game Elo as baseline)
- **Architecture**: 3-layer MLP (128 → 64 → 32 → 1) with dropout
- **Training**: Oversampled upsets to handle class imbalance
- **Output**: Probability of upset (0.0 to 1.0)

### Model 3: Total Points Predictor
- **Algorithm**: XGBoost Regressor
- **Target**: Total combined points
- **Purpose**: Over/under predictions
- **Same feature set as spread predictor, different target

## Training Pipeline

```
Weekly Schedule (Tuesday night):
1. Fetch latest game results from CFBD API
2. Update feature store with new game data
3. Recalculate Elo ratings
4. Retrain all 3 models on updated dataset
5. Run backtesting on hold-out set
6. If accuracy improves or stays stable → deploy new model
7. If accuracy degrades > 5% → alert, keep previous model
8. Generate predictions for upcoming week's games
9. Cache predictions in Redis

Friday Night:
1. Final injury/weather updates
2. Refresh predictions with latest context
3. Pre-compute all Prediction Arena content
```

## Evaluation Metrics

### Spread Predictor
- **Primary**: Mean Absolute Error (MAE) — target < 10 points
- **Secondary**: % of games predicted within 7 points of actual spread
- **Benchmark**: Must beat Vegas closing line MAE to be credible

### Upset Classifier
- **Primary**: AUC-ROC — target > 0.70
- **Secondary**: Precision at recall=0.5 (catch half the upsets without too many false alarms)
- **Calibration**: Predicted probabilities should match observed frequencies

### Total Points
- **Primary**: MAE — target < 8 points
- **Secondary**: % within 7 points of actual total

## Inference

### Server-Side (Primary)
- Pre-computed predictions cached in Redis
- API endpoint returns predictions with sub-50ms latency
- Predictions refreshed Friday night and on game day morning

### Prediction Response Format
```json
{
  "gameId": "2024-week5-alabama-georgia",
  "homeTeam": "Georgia",
  "awayTeam": "Alabama",
  "predictions": {
    "spread": {
      "value": -3.5,
      "favored": "Georgia",
      "confidence": 0.72,
      "mae_context": "Model MAE this season: 8.2 points"
    },
    "total": {
      "value": 48.5,
      "confidence": 0.68
    },
    "upset": {
      "probability": 0.38,
      "is_alert": true,
      "threshold": 0.35
    }
  },
  "topFactors": [
    {"name": "Home field advantage", "weight": 0.18, "direction": "favors_home"},
    {"name": "Defensive efficiency gap", "weight": 0.15, "direction": "favors_home"},
    {"name": "Alabama QB rating", "weight": 0.12, "direction": "favors_away"},
    {"name": "Recruiting talent composite", "weight": 0.10, "direction": "neutral"},
    {"name": "Historical rivalry trend", "weight": 0.08, "direction": "favors_away"}
  ],
  "generatedAt": "2024-10-04T02:00:00Z",
  "modelVersion": "v2.3.1"
}
```

## Backtesting Dashboard
- Season-by-season accuracy visualization
- Performance by game type (conference, non-conference, rivalry, bowl)
- Comparison vs. Vegas lines
- Upset detection accuracy over time
- Interactive: users can see how the model would have performed on any historical week

## Ethical Considerations
- Clear disclaimers: "For entertainment purposes only, not gambling advice"
- Model uncertainty always displayed (never show false confidence)
- No individual player injury exploitation
- Transparent about limitations (early season, first-year coaches, etc.)
- Age-gating for any features adjacent to betting
