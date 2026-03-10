// ============================================================
// GridIron IQ — Core Type Definitions
// ============================================================

// --- Players & Teams ---

export interface Player {
  id: string;
  name: string;
  position: Position;
  school: string;
  conference: Conference;
  seasons: PlayerSeason[];
  draftInfo?: DraftInfo;
  awards: Award[];
}

export type Position =
  | 'QB' | 'RB' | 'WR' | 'TE' | 'OL'
  | 'DL' | 'LB' | 'CB' | 'S' | 'DB'
  | 'K' | 'P' | 'ATH';

export type Conference =
  | 'SEC' | 'Big Ten' | 'Big 12' | 'ACC' | 'Pac-12'
  | 'AAC' | 'Mountain West' | 'Sun Belt' | 'MAC' | 'CUSA'
  | 'Independent';

export interface PlayerSeason {
  year: number;
  school: string;
  conference: Conference;
  stats: SeasonStats;
}

export interface SeasonStats {
  gamesPlayed: number;
  passingYards?: number;
  passingTDs?: number;
  rushingYards?: number;
  rushingTDs?: number;
  receivingYards?: number;
  receivingTDs?: number;
  tackles?: number;
  sacks?: number;
  interceptions?: number;
  totalTouchdowns?: number;
  allPurposeYards?: number;
}

export interface DraftInfo {
  year: number;
  round: number;
  pick: number;
  team: string;
}

export type Award =
  | 'Heisman'
  | 'Maxwell'
  | 'Biletnikoff'
  | 'Doak Walker'
  | 'Thorpe'
  | 'Butkus'
  | 'Outland'
  | 'Nagurski'
  | 'Bednarik'
  | 'All-American'
  | 'Conference POY';

export interface Team {
  id: string;
  name: string;
  mascot: string;
  conference: Conference;
  abbreviation: string;
  color: string;
  altColor: string;
  logoUrl: string;
}

// --- The Grid Game ---

export type CriteriaType =
  | 'conference'
  | 'school'
  | 'award'
  | 'draft_round'
  | 'stat_threshold'
  | 'bowl_game'
  | 'era'
  | 'position'
  | 'coaching_tree'
  | 'transfer';

export interface GridCriteria {
  type: CriteriaType;
  value: string;
  displayText: string;
}

export interface GridPuzzle {
  id: string;
  date: string;
  size: 3 | 4;
  rows: GridCriteria[];
  columns: GridCriteria[];
  validAnswers: Record<string, string[]>; // cellKey → playerIds
}

export interface GridCell {
  rowIndex: number;
  colIndex: number;
  rowCriteria: GridCriteria;
  colCriteria: GridCriteria;
  answer?: Player;
  isCorrect?: boolean;
  isLocked: boolean;
}

export interface GridAttempt {
  userId: string;
  puzzleId: string;
  answers: Record<string, string>; // cellKey → playerId
  score: number;
  completionTimeSeconds: number;
  completedAt: string;
}

export interface GridGameState {
  puzzle: GridPuzzle | null;
  cells: GridCell[][];
  currentCell: { row: number; col: number } | null;
  guessesRemaining: number;
  score: number;
  isComplete: boolean;
  startTime: number;
}

// --- Stat Stack Game ---

export type StatCategory =
  | 'rushing_yards'
  | 'passing_tds'
  | 'receiving_yards'
  | 'sacks'
  | 'interceptions'
  | 'total_tds'
  | 'all_purpose_yards';

export interface RowConstraint {
  index: number;
  description: string;
  validator: string; // serialized validation rule
}

export interface StatStackPuzzle {
  id: string;
  date: string;
  statCategory: StatCategory;
  statLabel: string;
  rows: RowConstraint[];
  maxPossibleScore: number;
}

export interface StatStackPick {
  rowIndex: number;
  playerId: string;
  playerName: string;
  season: number;
  statValue: number;
  isValid: boolean;
}

export interface StatStackGameState {
  puzzle: StatStackPuzzle | null;
  picks: (StatStackPick | null)[];
  currentRow: number;
  totalStatValue: number;
  penalties: Penalty[];
  isComplete: boolean;
  hasUsedTransferPortal: boolean;
}

export interface Penalty {
  type: 'targeting' | 'garbage_time';
  description: string;
  pointsLost: number;
}

// --- Fantasy Football ---

export interface FantasyLeague {
  id: string;
  name: string;
  commissionerId: string;
  scoringSettings: ScoringSettings;
  rosterSettings: RosterSettings;
  maxTeams: number;
  draftDate?: string;
  draftType: 'snake' | 'auction' | 'linear';
  seasonYear: number;
  status: 'pre_draft' | 'drafting' | 'in_season' | 'playoffs' | 'complete';
}

export interface ScoringSettings {
  passingYardsPerPoint: number;
  passingTD: number;
  interception: number;
  rushingYardsPerPoint: number;
  rushingTD: number;
  receivingYardsPerPoint: number;
  receivingTD: number;
  reception: number; // 0 for standard, 0.5 or 1 for PPR
  fumbleLost: number;
}

export interface RosterSettings {
  qb: number;
  rb: number;
  wr: number;
  te: number;
  flex: number;
  dst: number;
  k: number;
  bench: number;
}

export interface FantasyTeam {
  id: string;
  leagueId: string;
  userId: string;
  teamName: string;
  roster: RosterSlot[];
  record: { wins: number; losses: number; ties: number };
  pointsFor: number;
  pointsAgainst: number;
  waiverBudget: number;
}

export interface RosterSlot {
  position: string;
  playerId: string | null;
  playerName?: string;
  isStarter: boolean;
}

// --- ML Predictions ---

export interface GamePrediction {
  gameId: string;
  homeTeam: string;
  awayTeam: string;
  predictions: {
    spread: { value: number; favored: string; confidence: number };
    total: { value: number; confidence: number };
    upset: { probability: number; isAlert: boolean };
  };
  topFactors: PredictionFactor[];
  modelVersion: string;
  generatedAt: string;
}

export interface PredictionFactor {
  name: string;
  weight: number;
  direction: 'favors_home' | 'favors_away' | 'neutral';
  description: string;
}

export interface UserPrediction {
  userId: string;
  gameId: string;
  predictionType: 'winner' | 'spread' | 'over_under' | 'upset' | 'exact_score';
  predictedValue: string | number;
  pointsEarned?: number;
}

// --- User & Social ---

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  favoriteTeam?: string;
  favoriteConference?: Conference;
  eloRating: number;
  streakCurrent: number;
  streakBest: number;
  stats: UserStats;
}

export interface UserStats {
  gridGamesPlayed: number;
  gridBestScore: number;
  statStackGamesPlayed: number;
  statStackBestPercentile: number;
  predictionAccuracy: number;
  fantasyChampionships: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  score: number;
  favoriteTeam?: string;
}
