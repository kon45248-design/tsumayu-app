import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { CrowdDetail, CrowdLevel } from '../types';

interface CrowdCardProps {
  details: CrowdDetail[];
}

const CROWD_LEVEL_COLORS: Record<CrowdLevel, string> = {
  free: colors.crowdFree,
  medium: colors.crowdMedium,
  busy: colors.crowdBusy,
};

export default function CrowdCard({ details }: CrowdCardProps) {
  return (
    <View style={styles.card}>
      {details.map((item) => (
        <View key={item.area} style={styles.item}>
          <View style={[styles.bar, { backgroundColor: CROWD_LEVEL_COLORS[item.level] }]} />
          <Text style={styles.area}>{item.area}</Text>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius,
    paddingHorizontal: spacing.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  bar: {
    width: 32,
    height: 4,
    borderRadius: 2,
  },
  area: {
    color: colors.textMuted,
    fontSize: 11,
  },
  status: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
});
