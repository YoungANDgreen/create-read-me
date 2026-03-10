import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MockPrediction {
  homeTeam: string;
  awayTeam: string;
  spread: number;
  favored: string;
  confidence: number;
  upsetProb: number;
  isUpsetAlert: boolean;
  gameTime: string;
}

const MOCK_PREDICTIONS: MockPrediction[] = [
  {
    homeTeam: 'Georgia',
    awayTeam: 'Alabama',
    spread: -3.5,
    favored: 'Georgia',
    confidence: 0.72,
    upsetProb: 0.38,
    isUpsetAlert: true,
    gameTime: 'SAT 3:30 PM',
  },
  {
    homeTeam: 'Ohio State',
    awayTeam: 'Michigan',
    spread: -7,
    favored: 'Ohio State',
    confidence: 0.65,
    upsetProb: 0.28,
    isUpsetAlert: false,
    gameTime: 'SAT 12:00 PM',
  },
  {
    homeTeam: 'Texas',
    awayTeam: 'Oklahoma',
    spread: -2.5,
    favored: 'Texas',
    confidence: 0.58,
    upsetProb: 0.42,
    isUpsetAlert: true,
    gameTime: 'SAT 7:00 PM',
  },
];

export default function PredictScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Prediction Arena</Text>
        <Text style={styles.heroSubtitle}>Beat the model. Prove your football IQ.</Text>
      </View>

      {/* Model Stats */}
      <Card style={styles.modelCard}>
        <Text style={styles.modelTitle}>ML Model Performance</Text>
        <View style={styles.modelStats}>
          <View style={styles.modelStat}>
            <Text style={styles.modelStatValue}>67%</Text>
            <Text style={styles.modelStatLabel}>ATS Accuracy</Text>
          </View>
          <View style={styles.modelStat}>
            <Text style={styles.modelStatValue}>8.4</Text>
            <Text style={styles.modelStatLabel}>Avg MAE (pts)</Text>
          </View>
          <View style={styles.modelStat}>
            <Text style={styles.modelStatValue}>24%</Text>
            <Text style={styles.modelStatLabel}>Upset Detection</Text>
          </View>
        </View>
      </Card>

      {/* This Week's Games */}
      <Text style={styles.sectionTitle}>This Week</Text>
      {MOCK_PREDICTIONS.map((game, i) => (
        <Card key={i} style={styles.gameCard}>
          <View style={styles.gameHeader}>
            <Text style={styles.gameTime}>{game.gameTime}</Text>
            {game.isUpsetAlert && (
              <View style={styles.upsetBadge}>
                <Text style={styles.upsetBadgeText}>UPSET ALERT</Text>
              </View>
            )}
          </View>

          <View style={styles.matchup}>
            <View style={styles.teamCol}>
              <Text style={styles.teamName}>{game.awayTeam}</Text>
              <Text style={styles.teamLabel}>AWAY</Text>
            </View>
            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>@</Text>
            </View>
            <View style={[styles.teamCol, styles.teamColRight]}>
              <Text style={styles.teamName}>{game.homeTeam}</Text>
              <Text style={styles.teamLabel}>HOME</Text>
            </View>
          </View>

          <View style={styles.predictionRow}>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>Spread</Text>
              <Text style={styles.predictionValue}>
                {game.favored} {game.spread}
              </Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>Confidence</Text>
              <Text style={styles.predictionValue}>
                {Math.round(game.confidence * 100)}%
              </Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>Upset %</Text>
              <Text style={[
                styles.predictionValue,
                game.isUpsetAlert && styles.upsetValue,
              ]}>
                {Math.round(game.upsetProb * 100)}%
              </Text>
            </View>
          </View>

          <Button
            title="Make Your Prediction"
            onPress={() => {}}
            variant="outline"
            size="sm"
          />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  hero: { marginBottom: spacing.lg, marginTop: spacing.sm },
  heroTitle: {
    color: colors.predictionOrange,
    fontSize: typography.fontSize.hero,
    fontWeight: typography.fontWeight.heavy,
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.xs,
  },
  modelCard: {
    marginBottom: spacing.lg,
    borderColor: colors.predictionOrange + '40',
  },
  modelTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  modelStats: { flexDirection: 'row', justifyContent: 'space-around' },
  modelStat: { alignItems: 'center' },
  modelStatValue: {
    color: colors.predictionOrange,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
  },
  modelStatLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  gameCard: { marginBottom: spacing.md },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gameTime: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  upsetBadge: {
    backgroundColor: colors.clashRed + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.clashRed + '40',
  },
  upsetBadgeText: {
    color: colors.clashRed,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  matchup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  teamCol: { flex: 1 },
  teamColRight: { alignItems: 'flex-end' },
  teamName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  teamLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  vsContainer: {
    width: 40,
    alignItems: 'center',
  },
  vsText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  predictionItem: { alignItems: 'center' },
  predictionLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
  },
  predictionValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    marginTop: 2,
  },
  upsetValue: {
    color: colors.clashRed,
  },
});
