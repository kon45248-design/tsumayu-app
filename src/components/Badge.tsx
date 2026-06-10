import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

interface BadgeProps {
  label: string;
  variant?: 'accent' | 'success' | 'warning' | 'outline' | 'photo';
  style?: StyleProp<ViewStyle>;
}

export default function Badge({ label, variant = 'accent', style }: BadgeProps) {
  return (
    <View style={[styles.badge, variantStyles[variant], style]}>
      <Text style={[styles.label, variant === 'accent' ? styles.labelDark : styles.labelLight]}>
        {label}
      </Text>
    </View>
  );
}

const variantStyles = StyleSheet.create({
  accent: {
    backgroundColor: colors.accent,
  },
  success: {
    backgroundColor: 'rgba(111,207,151,0.18)',
    borderWidth: 1,
    borderColor: colors.success,
  },
  warning: {
    backgroundColor: 'rgba(242,201,76,0.18)',
    borderWidth: 1,
    borderColor: colors.warning,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  photo: {
    backgroundColor: 'rgba(10,22,40,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
  labelDark: {
    color: colors.background,
  },
  labelLight: {
    color: colors.text,
  },
});
