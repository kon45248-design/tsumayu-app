import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

interface StampGridProps {
  current: number;
  setSize: number;
}

export default function StampGrid({ current, setSize }: StampGridProps) {
  const stamps = Array.from({ length: setSize }, (_, i) => i < current);

  return (
    <View style={styles.grid}>
      {stamps.map((filled, index) => (
        <View key={index} style={[styles.stamp, filled ? styles.stampFilled : styles.stampEmpty]}>
          {filled ? <Text style={styles.checkText}>✓</Text> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  stamp: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampFilled: {
    backgroundColor: colors.accent,
  },
  stampEmpty: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  checkText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
