// ============================================================
// GridIron IQ — The Grid Game Engine
// ============================================================
// Generates daily grid puzzles, validates answers, scores rarity

import type {
  GridPuzzle,
  GridCriteria,
  GridCell,
  GridGameState,
  CriteriaType,
  Player,
} from '@/types';

// --- Criteria Pool ---
// These are the building blocks for generating grid puzzles

const CONFERENCE_CRITERIA: GridCriteria[] = [
  { type: 'conference', value: 'SEC', displayText: 'SEC' },
  { type: 'conference', value: 'Big Ten', displayText: 'Big Ten' },
  { type: 'conference', value: 'Big 12', displayText: 'Big 12' },
  { type: 'conference', value: 'ACC', displayText: 'ACC' },
  { type: 'conference', value: 'Pac-12', displayText: 'Pac-12' },
];

const AWARD_CRITERIA: GridCriteria[] = [
  { type: 'award', value: 'Heisman', displayText: 'Heisman Winner' },
  { type: 'award', value: 'All-American', displayText: 'All-American' },
  { type: 'award', value: 'Biletnikoff', displayText: 'Biletnikoff Award' },
  { type: 'award', value: 'Butkus', displayText: 'Butkus Award' },
  { type: 'award', value: 'Doak Walker', displayText: 'Doak Walker Award' },
];

const STAT_CRITERIA: GridCriteria[] = [
  { type: 'stat_threshold', value: 'rushing_yards_1000', displayText: '1,000+ Rush Yds (Season)' },
  { type: 'stat_threshold', value: 'passing_tds_30', displayText: '30+ Pass TDs (Season)' },
  { type: 'stat_threshold', value: 'receiving_yards_1000', displayText: '1,000+ Rec Yds (Season)' },
  { type: 'stat_threshold', value: 'passing_yards_3000', displayText: '3,000+ Pass Yds (Season)' },
  { type: 'stat_threshold', value: 'total_tds_20', displayText: '20+ Total TDs (Season)' },
];

const DRAFT_CRITERIA: GridCriteria[] = [
  { type: 'draft_round', value: '1', displayText: '1st Round Pick' },
  { type: 'draft_round', value: 'top10', displayText: 'Top 10 Pick' },
  { type: 'draft_round', value: 'undrafted', displayText: 'Undrafted' },
];

const POSITION_CRITERIA: GridCriteria[] = [
  { type: 'position', value: 'QB', displayText: 'Quarterback' },
  { type: 'position', value: 'RB', displayText: 'Running Back' },
  { type: 'position', value: 'WR', displayText: 'Wide Receiver' },
  { type: 'position', value: 'DL', displayText: 'Defensive Lineman' },
  { type: 'position', value: 'LB', displayText: 'Linebacker' },
];

const SCHOOL_CRITERIA: GridCriteria[] = [
  { type: 'school', value: 'Alabama', displayText: 'Alabama' },
  { type: 'school', value: 'Ohio State', displayText: 'Ohio State' },
  { type: 'school', value: 'LSU', displayText: 'LSU' },
  { type: 'school', value: 'Clemson', displayText: 'Clemson' },
  { type: 'school', value: 'Oklahoma', displayText: 'Oklahoma' },
  { type: 'school', value: 'Michigan', displayText: 'Michigan' },
  { type: 'school', value: 'Georgia', displayText: 'Georgia' },
  { type: 'school', value: 'USC', displayText: 'USC' },
  { type: 'school', value: 'Texas', displayText: 'Texas' },
  { type: 'school', value: 'Notre Dame', displayText: 'Notre Dame' },
];

const ALL_CRITERIA_POOLS: GridCriteria[][] = [
  CONFERENCE_CRITERIA,
  AWARD_CRITERIA,
  STAT_CRITERIA,
  DRAFT_CRITERIA,
  POSITION_CRITERIA,
  SCHOOL_CRITERIA,
];

// --- Puzzle Generation ---

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (state >>> 0) / 0xFFFFFFFF;
  };
}

function dateToSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function shuffleWithRng<T>(array: T[], rng: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickCriteria(rng: () => number, count: number, exclude: CriteriaType[]): GridCriteria[] {
  const availablePools = ALL_CRITERIA_POOLS.filter(pool =>
    pool.length > 0 && !exclude.includes(pool[0].type)
  );

  const selected: GridCriteria[] = [];
  const usedTypes = new Set<CriteriaType>();

  while (selected.length < count && availablePools.length > 0) {
    const shuffledPools = shuffleWithRng(availablePools, rng);

    for (const pool of shuffledPools) {
      if (selected.length >= count) break;
      if (usedTypes.has(pool[0].type)) continue;

      const shuffled = shuffleWithRng(pool, rng);
      selected.push(shuffled[0]);
      usedTypes.add(pool[0].type);
    }

    // If we still need more, allow duplicate types
    if (selected.length < count) {
      const allCriteria = availablePools.flat();
      const remaining = shuffleWithRng(
        allCriteria.filter(c => !selected.includes(c)),
        rng
      );
      while (selected.length < count && remaining.length > 0) {
        selected.push(remaining.shift()!);
      }
    }
  }

  return selected;
}

export function generateDailyPuzzle(dateStr: string, size: 3 | 4 = 3): GridPuzzle {
  const rng = seededRandom(dateToSeed(dateStr));

  const rows = pickCriteria(rng, size, []);
  const usedRowTypes = rows.map(r => r.type);
  const columns = pickCriteria(rng, size, usedRowTypes);

  return {
    id: `grid-${dateStr}`,
    date: dateStr,
    size,
    rows,
    columns,
    validAnswers: {}, // populated by backend with real player data
  };
}

// --- Game State ---

export function createInitialGameState(puzzle: GridPuzzle): GridGameState {
  const cells: GridCell[][] = [];

  for (let row = 0; row < puzzle.size; row++) {
    const cellRow: GridCell[] = [];
    for (let col = 0; col < puzzle.size; col++) {
      cellRow.push({
        rowIndex: row,
        colIndex: col,
        rowCriteria: puzzle.rows[row],
        colCriteria: puzzle.columns[col],
        isLocked: false,
      });
    }
    cells.push(cellRow);
  }

  const maxGuesses = puzzle.size === 3 ? 9 : 16;

  return {
    puzzle,
    cells,
    currentCell: null,
    guessesRemaining: maxGuesses,
    score: 0,
    isComplete: false,
    startTime: Date.now(),
  };
}

// --- Answer Validation ---

export function getCellKey(row: number, col: number): string {
  return `${row}-${col}`;
}

export function validateAnswer(
  puzzle: GridPuzzle,
  row: number,
  col: number,
  playerId: string
): boolean {
  const cellKey = getCellKey(row, col);
  const validPlayers = puzzle.validAnswers[cellKey];
  if (!validPlayers) return false;
  return validPlayers.includes(playerId);
}

// --- Scoring ---

export function calculateRarityScore(
  totalSubmissions: number,
  playerSubmissions: number
): number {
  if (totalSubmissions === 0) return 100;
  const percentage = (playerSubmissions / totalSubmissions) * 100;

  if (percentage <= 1) return 100;  // Legendary
  if (percentage <= 5) return 80;   // Epic
  if (percentage <= 15) return 60;  // Rare
  if (percentage <= 40) return 40;  // Uncommon
  return 20;                        // Common
}

export function calculateGridScore(
  cells: GridCell[][],
  completionTimeSeconds: number
): number {
  let baseScore = 0;
  let correctCount = 0;

  for (const row of cells) {
    for (const cell of row) {
      if (cell.isCorrect) {
        baseScore += 100; // base per correct cell
        correctCount++;
      }
    }
  }

  // Speed bonus: up to 50% extra for fast completion
  const speedMultiplier = Math.max(0, 1.5 - (completionTimeSeconds / 300)); // 5 min baseline
  const speedBonus = Math.floor(baseScore * Math.max(0, speedMultiplier - 1));

  // Completion bonus
  const totalCells = cells.length * cells[0].length;
  const completionBonus = correctCount === totalCells ? 200 : 0;

  return baseScore + speedBonus + completionBonus;
}

// --- Submission ---

export function submitGuess(
  state: GridGameState,
  row: number,
  col: number,
  player: Player
): GridGameState {
  if (state.isComplete || state.guessesRemaining <= 0) return state;

  const cell = state.cells[row][col];
  if (cell.isLocked) return state;

  const isCorrect = state.puzzle
    ? validateAnswer(state.puzzle, row, col, player.id)
    : false;

  const newCells = state.cells.map((r, ri) =>
    r.map((c, ci) => {
      if (ri === row && ci === col) {
        return {
          ...c,
          answer: player,
          isCorrect,
          isLocked: true,
        };
      }
      return c;
    })
  );

  const newGuessesRemaining = state.guessesRemaining - 1;
  const allFilled = newCells.every(r => r.every(c => c.isLocked));
  const noGuessesLeft = newGuessesRemaining <= 0;

  const isComplete = allFilled || noGuessesLeft;
  const completionTime = isComplete
    ? Math.floor((Date.now() - state.startTime) / 1000)
    : 0;

  return {
    ...state,
    cells: newCells,
    guessesRemaining: newGuessesRemaining,
    score: isComplete ? calculateGridScore(newCells, completionTime) : state.score,
    isComplete,
    currentCell: null,
  };
}
