import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';
import { CrowdLevel } from '../types';

interface HomeStatusBarProps {
  isOpen: boolean;
  hoursLabel: string;
  crowdLevel: CrowdLevel;
}

const CROWD_LEVEL_COLORS: Record<CrowdLevel, string> = {
  free: colors.crowdFree,
  medium: colors.crowdMedium,
  busy: colors.crowdBusy,
};

export default function HomeStatusBar({ isOpen, hoursLabel, crowdLevel }: HomeStatusBarProps) {
  return (
    <View style={styles.bar}>
      <Image
        source={require('../../assets/photos/logo-tsumayu.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.statusGroup}>
        <View style={[styles.dot, { backgroundColor: isOpen ? colors.success : colors.danger }]} />
        <Text style={styles.statusText}>
          {isOpen ? '営業中' : '営業時間外'} {hoursLabel}
        </Text>
      </View>
      <View style={[styles.crowdBadge, { backgroundColor: CROWD_LEVEL_COLORS[crowdLevel] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.statusBarBackground,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  logo: {
    width: 32,
    height: 32,
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  crowdBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});
