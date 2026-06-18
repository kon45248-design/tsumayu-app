import React, { ReactNode } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

interface ScreenContainerProps {
  title?: string;
  subtitle?: string;
  hero?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

export default function ScreenContainer({ title, subtitle, hero, loading, children }: ScreenContainerProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.contentContainer, hero ? styles.contentNoPadding : null]}
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={colors.accent} />
        </View>
      ) : null}
      {hero}
      <View style={styles.content}>
        {title ? (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        ) : null}
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingTop: 0,
  },
  contentNoPadding: {
    paddingBottom: 0,
  },
  loadingRow: {
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
    gap: spacing.md,
  },
  header: {
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs,
  },
});
