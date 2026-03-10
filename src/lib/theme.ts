// ============================================================
// GridIron IQ — Design System & Theme
// ============================================================

export const colors = {
  // Primary palette — deep navy + electric gold
  primary: '#1A1A2E',
  primaryLight: '#16213E',
  accent: '#E2B714',
  accentLight: '#F5D547',

  // Game-specific accent colors
  gridGreen: '#2ECC71',
  statStackBlue: '#3498DB',
  clashRed: '#E74C3C',
  dynastyPurple: '#9B59B6',
  predictionOrange: '#E67E22',
  fantasyTeal: '#1ABC9C',

  // Feedback colors
  correct: '#27AE60',
  incorrect: '#E74C3C',
  warning: '#F39C12',

  // Neutrals
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceLight: '#252542',
  surfaceHighlight: '#2F2F52',
  border: '#3A3A5C',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0C0',
  textMuted: '#6A6A8E',

  // Rarity tiers (for Grid game answer rarity)
  rarityCommon: '#95A5A6',
  rarityUncommon: '#3498DB',
  rarityRare: '#9B59B6',
  rarityEpic: '#E67E22',
  rarityLegendary: '#E2B714',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  // Font families — system fonts for fast loading
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    mono: 'Courier',
  },

  // Font sizes
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    hero: 32,
    display: 40,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  }),
} as const;

export function getRarityColor(percentile: number): string {
  if (percentile >= 95) return colors.rarityLegendary;
  if (percentile >= 80) return colors.rarityEpic;
  if (percentile >= 60) return colors.rarityRare;
  if (percentile >= 30) return colors.rarityUncommon;
  return colors.rarityCommon;
}

export function getStatCategoryColor(category: string): string {
  const map: Record<string, string> = {
    rushing_yards: colors.gridGreen,
    passing_tds: colors.statStackBlue,
    receiving_yards: colors.predictionOrange,
    sacks: colors.clashRed,
    interceptions: colors.dynastyPurple,
    total_tds: colors.accent,
    all_purpose_yards: colors.fantasyTeal,
  };
  return map[category] ?? colors.accent;
}
