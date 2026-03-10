import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/theme';
import type { RowConstraint, StatStackPick } from '@/types';

interface StatStackRowProps {
  constraint: RowConstraint;
  pick: StatStackPick | null;
  isActive: boolean;
  canUseTransferPortal: boolean;
  statUnit: string;
  onPress: () => void;
  onTransferPortal: () => void;
}

export function StatStackRow({
  constraint,
  pick,
  isActive,
  canUseTransferPortal,
  statUnit,
  onPress,
  onTransferPortal,
}: StatStackRowProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.active,
        pick && (pick.isValid ? styles.filled : styles.invalid),
      ]}
      onPress={onPress}
      disabled={pick !== null && !canUseTransferPortal}
      activeOpacity={0.7}
    >
      <View style={styles.constraintSection}>
        <Text style={styles.rowNumber}>R{constraint.index + 1}</Text>
        <Text style={styles.constraintText}>{constraint.description}</Text>
      </View>

      {pick ? (
        <View style={styles.pickSection}>
          <View style={styles.pickInfo}>
            <Text style={styles.pickName}>{pick.playerName}</Text>
            <Text style={styles.pickSeason}>{pick.season}</Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statValue}>
              {pick.isValid ? pick.statValue.toLocaleString() : '---'}
            </Text>
            <Text style={styles.statUnit}>{statUnit}</Text>
          </View>
          {canUseTransferPortal && (
            <TouchableOpacity
              style={styles.transferButton}
              onPress={onTransferPortal}
            >
              <Text style={styles.transferText}>PORTAL</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.emptyPickSection}>
          <Text style={styles.emptyText}>
            {isActive ? 'Search for a player...' : 'Tap to select'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  active: {
    borderColor: colors.statStackBlue,
    borderWidth: 2,
    ...shadows.glow(colors.statStackBlue),
  },
  filled: {
    borderColor: colors.correct,
    backgroundColor: '#1a2d1a',
  },
  invalid: {
    borderColor: colors.incorrect,
    backgroundColor: '#2d1a1a',
  },
  constraintSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rowNumber: {
    color: colors.statStackBlue,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  constraintText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    flex: 1,
  },
  pickSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickInfo: {
    flex: 1,
  },
  pickName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  pickSeason: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
  },
  statBadge: {
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  statValue: {
    color: colors.accent,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
  },
  statUnit: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
  },
  transferButton: {
    marginLeft: spacing.sm,
    backgroundColor: colors.dynastyPurple,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  transferText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  emptyPickSection: {
    paddingVertical: spacing.xs,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    fontStyle: 'italic',
  },
});
