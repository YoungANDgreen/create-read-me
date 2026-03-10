import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/lib/theme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🏈</Text>
        </View>
        <Text style={styles.username}>GridIron Player</Text>
        <Text style={styles.subtitle}>Joined today</Text>
        <Button title="Edit Profile" onPress={() => {}} variant="outline" size="sm" />
      </View>

      {/* Stats Grid */}
      <Text style={styles.sectionTitle}>Lifetime Stats</Text>
      <View style={styles.statsGrid}>
        {[
          { label: 'Games Played', value: '0', color: colors.accent },
          { label: 'Day Streak', value: '0', color: colors.predictionOrange },
          { label: 'Best Streak', value: '0', color: colors.gridGreen },
          { label: 'Elo Rating', value: '1200', color: colors.statStackBlue },
          { label: 'Grid Best', value: '--', color: colors.gridGreen },
          { label: 'Prediction %', value: '--', color: colors.predictionOrange },
        ].map((stat, i) => (
          <Card key={i} style={styles.statCard}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      {/* Achievements */}
      <Text style={styles.sectionTitle}>Achievements</Text>
      <Card style={styles.emptyAchievements}>
        <Text style={styles.emptyIcon}>🏆</Text>
        <Text style={styles.emptyText}>Play games to unlock achievements</Text>
      </Card>

      {/* Settings */}
      <Text style={styles.sectionTitle}>Settings</Text>
      {['Favorite Team', 'Notifications', 'Dark Mode', 'About'].map((item, i) => (
        <View key={i} style={styles.settingsRow}>
          <Text style={styles.settingsText}>{item}</Text>
          <Text style={styles.settingsArrow}>›</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  avatarText: { fontSize: 36 },
  username: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  emptyAchievements: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyIcon: { fontSize: 32, marginBottom: spacing.sm },
  emptyText: { color: colors.textMuted, fontSize: typography.fontSize.sm },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingsText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
  },
  settingsArrow: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xl,
  },
});
