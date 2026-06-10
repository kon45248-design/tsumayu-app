import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';

interface SectionTitleProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function SectionTitle({ title, style, textStyle }: SectionTitleProps) {
  return (
    <View style={[styles.row, style]}>
      <View style={styles.bar} />
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bar: {
    width: 3,
    height: 16,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
