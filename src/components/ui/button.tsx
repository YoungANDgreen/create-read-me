import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, borderRadius, spacing, typography } from '@/lib/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        sizeStyles[size],
        variantContainerStyles[variant],
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? colors.accent : colors.primary}
          size="small"
        />
      ) : (
        <Text style={[styles.text, sizeTextStyles[size], variantTextStyles[variant]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: typography.fontWeight.semibold,
  },
});

const sizeStyles: Record<string, ViewStyle> = {
  sm: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, minHeight: 32 },
  md: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, minHeight: 44 },
  lg: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, minHeight: 52 },
};

const sizeTextStyles: Record<string, TextStyle> = {
  sm: { fontSize: typography.fontSize.sm },
  md: { fontSize: typography.fontSize.md },
  lg: { fontSize: typography.fontSize.lg },
};

const variantContainerStyles: Record<string, ViewStyle> = {
  primary: { backgroundColor: colors.accent },
  secondary: { backgroundColor: colors.surfaceLight },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.accent },
  ghost: { backgroundColor: 'transparent' },
};

const variantTextStyles: Record<string, TextStyle> = {
  primary: { color: colors.primary },
  secondary: { color: colors.textPrimary },
  outline: { color: colors.accent },
  ghost: { color: colors.accent },
};
