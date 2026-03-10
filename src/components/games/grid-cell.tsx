import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, typography, shadows } from '@/lib/theme';
import type { GridCell as GridCellType } from '@/types';

interface GridCellProps {
  cell: GridCellType;
  isSelected: boolean;
  onPress: () => void;
}

export function GridCellComponent({ cell, isSelected, onPress }: GridCellProps) {
  const getCellStyle = () => {
    if (cell.isLocked && cell.isCorrect) return styles.correct;
    if (cell.isLocked && !cell.isCorrect) return styles.incorrect;
    if (isSelected) return styles.selected;
    return styles.empty;
  };

  return (
    <TouchableOpacity
      style={[styles.cell, getCellStyle()]}
      onPress={onPress}
      disabled={cell.isLocked}
      activeOpacity={0.7}
    >
      {cell.answer ? (
        <View style={styles.answerContent}>
          <Text style={styles.playerName} numberOfLines={2}>
            {cell.answer.name}
          </Text>
          <Text style={styles.playerSchool} numberOfLines={1}>
            {cell.answer.school}
          </Text>
        </View>
      ) : (
        <View style={styles.emptyContent}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  empty: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  selected: {
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 2,
    borderColor: colors.accent,
    ...shadows.glow(colors.accent),
  },
  correct: {
    backgroundColor: '#1a3d2a',
    borderWidth: 2,
    borderColor: colors.correct,
  },
  incorrect: {
    backgroundColor: '#3d1a1a',
    borderWidth: 2,
    borderColor: colors.incorrect,
  },
  answerContent: {
    alignItems: 'center',
    padding: spacing.xs,
  },
  playerName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
  playerSchool: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    textAlign: 'center',
    marginTop: 2,
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.regular,
  },
});
