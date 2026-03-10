import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameMode {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  playerCount: string;
}

const GAME_MODES: GameMode[] = [
  {
    id: 'blind-resume',
    title: 'Blind Resume',
    description: 'Anonymized team stats — guess the team and year',
    icon: '📄',
    difficulty: 'Hard',
    playerCount: 'Solo',
  },
  {
    id: 'stat-line-sleuth',
    title: 'Stat Line Sleuth',
    description: 'Given a stat line, guess the player with progressive hints',
    icon: '🔍',
    difficulty: 'Medium',
    playerCount: 'Solo',
  },
  {
    id: 'roster-roulette',
    title: 'Roster Roulette',
    description: 'Name as many roster players as possible in 60 seconds',
    icon: '🎰',
    difficulty: 'Variable',
    playerCount: 'Solo',
  },
  {
    id: 'film-room',
    title: "Coach's Film Room",
    description: 'Identify the game from a play or drive description',
    icon: '🎬',
    difficulty: 'Expert',
    playerCount: 'Solo',
  },
];

export default function ClashScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Conference Clash</Text>
        <Text style={styles.subtitle}>Test your deep CFB knowledge</Text>
      </View>

      {/* Matchmaking */}
      <Card style={styles.matchmakingCard}>
        <Text style={styles.matchmakingTitle}>1v1 Quick Match</Text>
        <Text style={styles.matchmakingDesc}>
          Find an opponent and battle head-to-head in real-time
        </Text>
        <TouchableOpacity style={styles.matchmakingButton} activeOpacity={0.7}>
          <Text style={styles.matchmakingButtonText}>Find Opponent</Text>
        </TouchableOpacity>
        <Text style={styles.matchmakingOnline}>12 players online</Text>
      </Card>

      {/* Game Modes */}
      <Text style={styles.sectionTitle}>Solo Modes</Text>
      {GAME_MODES.map((mode) => (
        <TouchableOpacity key={mode.id} style={styles.modeCard} activeOpacity={0.7}>
          <View style={styles.modeIconContainer}>
            <Text style={styles.modeIcon}>{mode.icon}</Text>
          </View>
          <View style={styles.modeInfo}>
            <Text style={styles.modeTitle}>{mode.title}</Text>
            <Text style={styles.modeDesc}>{mode.description}</Text>
            <View style={styles.modeMeta}>
              <Badge
                label={mode.difficulty}
                color={
                  mode.difficulty === 'Expert' ? colors.clashRed :
                  mode.difficulty === 'Hard' ? colors.predictionOrange :
                  colors.gridGreen
                }
                textColor="#fff"
              />
              <Text style={styles.modePlayerCount}>{mode.playerCount}</Text>
            </View>
          </View>
          <Text style={styles.modeArrow}>›</Text>
        </TouchableOpacity>
      ))}

      {/* Leaderboard Preview */}
      <Text style={styles.sectionTitle}>Conference Leaderboard</Text>
      <Card>
        <View style={styles.leaderboardHeader}>
          <Text style={styles.leaderboardHeaderText}>Rank</Text>
          <Text style={[styles.leaderboardHeaderText, { flex: 1 }]}>Conference</Text>
          <Text style={styles.leaderboardHeaderText}>Avg Elo</Text>
        </View>
        {['SEC', 'Big Ten', 'Big 12', 'ACC', 'Pac-12'].map((conf, i) => (
          <View key={conf} style={styles.leaderboardRow}>
            <Text style={styles.leaderboardRank}>#{i + 1}</Text>
            <Text style={styles.leaderboardName}>{conf}</Text>
            <Text style={styles.leaderboardScore}>{1450 - i * 35}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  header: { marginBottom: spacing.lg },
  title: {
    color: colors.clashRed,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.xs,
  },
  matchmakingCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderColor: colors.clashRed + '40',
    marginBottom: spacing.lg,
  },
  matchmakingTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  matchmakingDesc: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  matchmakingButton: {
    backgroundColor: colors.clashRed,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginTop: spacing.md,
    ...shadows.md,
  },
  matchmakingButtonText: {
    color: '#fff',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  matchmakingOnline: {
    color: colors.correct,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  modeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  modeIcon: { fontSize: 24 },
  modeInfo: { flex: 1 },
  modeTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },
  modeDesc: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    marginTop: 2,
  },
  modeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  modePlayerCount: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
  },
  modeArrow: {
    color: colors.textMuted,
    fontSize: 24,
    marginLeft: spacing.sm,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leaderboardHeaderText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    width: 50,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border + '50',
  },
  leaderboardRank: {
    color: colors.accent,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    width: 50,
  },
  leaderboardName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    flex: 1,
  },
  leaderboardScore: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    width: 50,
    textAlign: 'right',
  },
});
