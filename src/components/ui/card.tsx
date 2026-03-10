import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, shadows, spacing } from '@/lib/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'highlighted' | 'game';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
});

const variantStyles: Record<string, ViewStyle> = {
  default: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  highlighted: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  game: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 2,
    borderColor: colors.border,
  },
};
