import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FEATURED_PROGRAMS = [
  { name: 'Alabama', color: '#9E1B32', wins: 953 },
  { name: 'Ohio State', color: '#BB0000', wins: 943 },
  { name: 'Michigan', color: '#00274C', wins: 976 },
  { name: 'Oklahoma', color: '#841617', wins: 919 },
  { name: 'Notre Dame', color: '#0C2340', wins: 929 },
  { name: 'USC', color: '#990000', wins: 854 },
  { name: 'Texas', color: '#BF5700', wins: 923 },
  { name: 'Georgia', color: '#BA0C2F', wins: 870 },
  { name: 'LSU', color: '#461D7C', wins: 808 },
  { name: 'Penn State', color: '#041E42', wins: 903 },
  { name: 'Clemson', color: '#F56600', wins: 774 },
  { name: 'Florida State', color: '#782F40', wins: 590 },
];

const ROSTER_POSITIONS = [
  { pos: 'QB', count: 1, filled: 0 },
  { pos: 'RB', count: 2, filled: 0 },
  { pos: 'WR', count: 3, filled: 0 },
  { pos: 'TE', count: 1, filled: 0 },
  { pos: 'OL', count: 5, filled: 0 },
  { pos: 'DL', count: 4, filled: 0 },
  { pos: 'LB', count: 3, filled: 0 },
  { pos: 'DB', count: 4, filled: 0 },
  { pos: 'K', count: 1, filled: 0 },
  { pos: 'P', count: 1, filled: 0 },
];

export default function DynastyScreen() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Dynasty Builder</Text>
        <Text style={styles.subtitle}>
          Build the greatest all-time roster from one program
        </Text>
      </View>

      {!selectedProgram ? (
        <>
          <Text style={styles.sectionTitle}>Choose Your Program</Text>
          <View style={styles.programGrid}>
            {FEATURED_PROGRAMS.map((program) => (
              <TouchableOpacity
                key={program.name}
                style={[styles.programCard, { borderColor: program.color + '60' }]}
                onPress={() => setSelectedProgram(program.name)}
                activeOpacity={0.7}
              >
                <View style={[styles.programBadge, { backgroundColor: program.color }]}>
                  <Text style={styles.programInitial}>
                    {program.name.charAt(0)}
                  </Text>
                </View>
                <Text style={styles.programName}>{program.name}</Text>
                <Text style={styles.programWins}>{program.wins} all-time wins</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <>
          {/* Selected Program Header */}
          <View style={styles.selectedHeader}>
            <Text style={styles.selectedProgram}>{selectedProgram}</Text>
            <TouchableOpacity onPress={() => setSelectedProgram(null)}>
              <Text style={styles.changeProgram}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Salary Cap */}
          <Card style={styles.salaryCard}>
            <View style={styles.salaryRow}>
              <Text style={styles.salaryLabel}>Salary Cap</Text>
              <Text style={styles.salaryValue}>$100M</Text>
            </View>
            <View style={styles.salaryRow}>
              <Text style={styles.salaryLabel}>Spent</Text>
              <Text style={styles.salarySpent}>$0</Text>
            </View>
            <View style={styles.salaryRow}>
              <Text style={styles.salaryLabel}>Remaining</Text>
              <Text style={styles.salaryRemaining}>$100M</Text>
            </View>
            <View style={styles.capBar}>
              <View style={[styles.capBarFill, { width: '0%' }]} />
            </View>
          </Card>

          {/* Roster Slots */}
          <Text style={styles.sectionTitle}>Roster (0/25)</Text>
          {ROSTER_POSITIONS.map((slot) => (
            <TouchableOpacity key={slot.pos} style={styles.rosterSlot} activeOpacity={0.7}>
              <View style={styles.rosterSlotLeft}>
                <Text style={styles.rosterPos}>{slot.pos}</Text>
                <Text style={styles.rosterCount}>
                  {slot.filled}/{slot.count}
                </Text>
              </View>
              <View style={styles.rosterSlotRight}>
                {Array.from({ length: slot.count }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.rosterDot,
                      i < slot.filled ? styles.rosterDotFilled : styles.rosterDotEmpty,
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.rosterArrow}>+</Text>
            </TouchableOpacity>
          ))}

          <Button
            title="Simulate Matchup"
            onPress={() => {}}
            variant="primary"
            disabled
            style={styles.simulateButton}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg },
  title: {
    color: colors.dynastyPurple,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  programGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  programCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  programBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  programInitial: {
    color: '#fff',
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
  },
  programName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  programWins: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  selectedProgram: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
  },
  changeProgram: {
    color: colors.accent,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  salaryCard: { marginBottom: spacing.lg },
  salaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  salaryLabel: { color: colors.textSecondary, fontSize: typography.fontSize.sm },
  salaryValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  salarySpent: {
    color: colors.incorrect,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  salaryRemaining: {
    color: colors.correct,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  capBar: {
    height: 6,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 3,
    marginTop: spacing.sm,
  },
  capBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  rosterSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  rosterSlotLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  rosterPos: {
    color: colors.dynastyPurple,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    width: 32,
  },
  rosterCount: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
  },
  rosterSlotRight: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  rosterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  rosterDotFilled: { backgroundColor: colors.correct },
  rosterDotEmpty: { backgroundColor: colors.surfaceHighlight },
  rosterArrow: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xl,
    marginLeft: spacing.md,
  },
  simulateButton: { marginTop: spacing.lg },
});
