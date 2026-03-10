import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/lib/theme';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function FantasyScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>College Fantasy</Text>
        <Text style={styles.heroSubtitle}>Draft. Trade. Dominate.</Text>
      </View>

      {/* Create/Join League */}
      <View style={styles.actionRow}>
        <Button
          title="Create League"
          onPress={() => {}}
          variant="primary"
          style={styles.actionButton}
        />
        <Button
          title="Join League"
          onPress={() => {}}
          variant="outline"
          style={styles.actionButton}
        />
      </View>

      {/* My Leagues */}
      <Text style={styles.sectionTitle}>My Leagues</Text>
      <Card style={styles.emptyState}>
        <Text style={styles.emptyIcon}>🏈</Text>
        <Text style={styles.emptyTitle}>No leagues yet</Text>
        <Text style={styles.emptySubtitle}>
          Create or join a college fantasy football league to get started
        </Text>
      </Card>

      {/* Features Preview */}
      <Text style={styles.sectionTitle}>Features</Text>
      {[
        { icon: '📋', title: 'Custom Scoring', desc: 'PPR, standard, or build your own' },
        { icon: '🔄', title: 'Snake & Auction Drafts', desc: 'Draft with friends or AI opponents' },
        { icon: '📊', title: 'Live Scoring', desc: 'Real-time play-by-play updates on game day' },
        { icon: '💬', title: 'League Chat', desc: 'Talk trash and share highlights' },
        { icon: '🔁', title: 'Trade Analyzer', desc: 'AI-powered trade evaluation' },
        { icon: '💰', title: 'FAAB Waivers', desc: 'Bid on free agents with your budget' },
      ].map((feature, i) => (
        <View key={i} style={styles.featureRow}>
          <Text style={styles.featureIcon}>{feature.icon}</Text>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDesc}>{feature.desc}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  hero: { marginBottom: spacing.lg, marginTop: spacing.sm },
  heroTitle: {
    color: colors.fantasyTeal,
    fontSize: typography.fontSize.hero,
    fontWeight: typography.fontWeight.heavy,
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    marginTop: spacing.xs,
  },
  actionRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  actionButton: { flex: 1 },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xl },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: { fontSize: 24, marginRight: spacing.md },
  featureText: { flex: 1 },
  featureTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  featureDesc: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    marginTop: 2,
  },
});
