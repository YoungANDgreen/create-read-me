import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/theme';
import { getRarityColor } from '@/lib/theme';

interface ScoreDisplayProps {
  label: string;
  score: number;
  percentile?: number;
  streak?: number;
  guessesRemaining?: number;
  maxGuesses?: number;
  compact?: boolean;
}

export function ScoreDisplay({
  label,
  score,
  percentile,
  streak,
  guessesRemaining,
  maxGuesses,
  compact = false,
}: ScoreDisplayProps) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.scoreValue}>{score.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Score</Text>
        </View>

        {percentile !== undefined && (
          <View style={styles.statItem}>
            <Text style={[styles.percentileValue, { color: getRarityColor(percentile) }]}>
              {percentile}%
            </Text>
            <Text style={styles.statLabel}>Percentile</Text>
          </View>
        )}

        {streak !== undefined && streak > 0 && (
          <View style={styles.statItem}>
            <Text style={styles.streakValue}>{streak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        )}

        {guessesRemaining !== undefined && maxGuesses !== undefined && (
          <View style={styles.statItem}>
            <Text style={styles.guessesValue}>
              {guessesRemaining}/{maxGuesses}
            </Text>
            <Text style={styles.statLabel}>Guesses</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadows.sm,
  },
  compact: {
    padding: spacing.sm,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  scoreValue: {
    color: colors.accent,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
  },
  percentileValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
  },
  streakValue: {
    color: colors.predictionOrange,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
  },
  guessesValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
});
