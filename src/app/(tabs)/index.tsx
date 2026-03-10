import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  route: string;
  badge?: string;
}

const GAMES: GameCardData[] = [
  {
    id: 'grid',
    title: 'The Grid',
    subtitle: 'Daily 3x3 puzzle — match players to criteria',
    icon: '🔲',
    accentColor: colors.gridGreen,
    route: '/games/grid',
    badge: 'DAILY',
  },
  {
    id: 'stat-stack',
    title: 'Stat Stack',
    subtitle: 'Pick 5 players to maximize today\'s stat',
    icon: '📊',
    accentColor: colors.statStackBlue,
    route: '/games/stat-stack',
    badge: 'DAILY',
  },
  {
    id: 'clash',
    title: 'Conference Clash',
    subtitle: 'Head-to-head knowledge battles',
    icon: '⚔️',
    accentColor: colors.clashRed,
    route: '/games/clash',
    badge: 'MULTIPLAYER',
  },
  {
    id: 'dynasty',
    title: 'Dynasty Builder',
    subtitle: 'Build your all-time program roster',
    icon: '🏛️',
    accentColor: colors.dynastyPurple,
    route: '/games/dynasty',
  },
  {
    id: 'predictions',
    title: 'Prediction Arena',
    subtitle: 'Beat the ML model — predict game outcomes',
    icon: '🤖',
    accentColor: colors.predictionOrange,
    route: '/games/predictions',
    badge: 'ML-POWERED',
  },
];

export default function PlayScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Game Day</Text>
        <Text style={styles.heroSubtitle}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* Daily Challenge Banner */}
      <TouchableOpacity
        style={styles.dailyBanner}
        onPress={() => router.push('/games/grid' as never)}
        activeOpacity={0.8}
      >
        <View style={styles.dailyBannerContent}>
          <Text style={styles.dailyBannerIcon}>🏆</Text>
          <View style={styles.dailyBannerText}>
            <Text style={styles.dailyBannerTitle}>Daily Challenge</Text>
            <Text style={styles.dailyBannerSub}>
              Complete The Grid + Stat Stack for bonus XP
            </Text>
          </View>
          <Text style={styles.dailyBannerArrow}>→</Text>
        </View>
      </TouchableOpacity>

      {/* Game Cards */}
      <Text style={styles.sectionTitle}>Games</Text>
      {GAMES.map((game) => (
        <TouchableOpacity
          key={game.id}
          style={styles.gameCard}
          onPress={() => router.push(game.route as never)}
          activeOpacity={0.7}
        >
          <View style={[styles.gameIconContainer, { backgroundColor: game.accentColor + '20' }]}>
            <Text style={styles.gameIcon}>{game.icon}</Text>
          </View>
          <View style={styles.gameInfo}>
            <View style={styles.gameTitleRow}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              {game.badge && (
                <Badge label={game.badge} color={game.accentColor} textColor="#fff" size="sm" />
              )}
            </View>
            <Text style={styles.gameSubtitle}>{game.subtitle}</Text>
          </View>
          <Text style={styles.gameArrow}>›</Text>
        </TouchableOpacity>
      ))}

      {/* Quick Stats */}
      <Text style={styles.sectionTitle}>Your Stats</Text>
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>--</Text>
          <Text style={styles.statLabel}>Best Grid</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>--</Text>
          <Text style={styles.statLabel}>Prediction %</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  hero: {
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.hero,
    fontWeight: typography.fontWeight.heavy,
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.xs,
  },
  dailyBanner: {
    backgroundColor: colors.accent + '15',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent + '40',
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  dailyBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dailyBannerIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  dailyBannerText: {
    flex: 1,
  },
  dailyBannerTitle: {
    color: colors.accent,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  dailyBannerSub: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginTop: 2,
  },
  dailyBannerArrow: {
    color: colors.accent,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
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
  gameCard: {
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
  gameIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  gameIcon: {
    fontSize: 24,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  gameTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  gameSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    marginTop: 2,
  },
  gameArrow: {
    color: colors.textMuted,
    fontSize: 24,
    fontWeight: typography.fontWeight.regular,
    marginLeft: spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statNumber: {
    color: colors.accent,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
});
