import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Badge from '../components/Badge';
import Card from '../components/Card';
import MemberCard from '../components/MemberCard';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import { member, visitHistory } from '../data/mockData';
import { colors, spacing } from '../theme';

const SETTINGS_ITEMS = [
  { id: 's1', icon: '🔔', label: '通知設定' },
  { id: 's2', icon: '✏️', label: '会員情報の変更' },
  { id: 's3', icon: '❓', label: 'ヘルプ・お問い合わせ' },
  { id: 's4', icon: '🚪', label: 'ログアウト' },
];

export default function AccountScreen() {
  return (
    <ScreenContainer title="マイページ" subtitle="デジタル会員証・来館履歴">
      <MemberCard member={member} />

      <Card>
        <SectionTitle title="来館履歴" style={styles.sectionTitle} />
        {visitHistory.map((visit, index) => (
          <View
            key={visit.id}
            style={[styles.historyRow, index === 0 && styles.historyRowFirst]}
          >
            <View style={styles.historyInfo}>
              <Text style={styles.historyDate}>{visit.date}</Text>
              <Text style={styles.historyDescription}>{visit.description}</Text>
            </View>
            <View style={styles.historyStamps}>
              <Text style={styles.historyStampValue}>+{visit.stampsEarned}</Text>
              {visit.isGroupVisit ? (
                <Badge label="×2" variant="accent" style={styles.x2Badge} />
              ) : null}
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <SectionTitle title="設定" style={styles.sectionTitle} />
        {SETTINGS_ITEMS.map((item) => (
          <Pressable key={item.id} style={styles.settingRow}>
            <Text style={styles.settingIcon}>{item.icon}</Text>
            <Text style={styles.settingLabel}>{item.label}</Text>
            <Text style={styles.settingArrow}>›</Text>
          </Pressable>
        ))}
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  historyRowFirst: {
    borderTopWidth: 0,
    paddingTop: 0,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    color: colors.textFaint,
    fontSize: 11,
  },
  historyDescription: {
    color: colors.text,
    fontSize: 13,
    marginTop: 2,
  },
  historyStamps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  historyStampValue: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  x2Badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    gap: spacing.sm,
  },
  settingIcon: {
    fontSize: 16,
  },
  settingLabel: {
    color: colors.text,
    fontSize: 14,
    flex: 1,
  },
  settingArrow: {
    color: colors.textFaint,
    fontSize: 18,
  },
});
