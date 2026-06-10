import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Badge from '../components/Badge';
import Card from '../components/Card';
import MemberCompact from '../components/MemberCompact';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import StampGrid from '../components/StampGrid';
import { coupons, member, stampProgress, visitHistory } from '../data/mockData';
import { colors, spacing } from '../theme';

const SETTINGS_ITEMS = [
  { id: 's1', icon: '🔔', label: '通知設定' },
  { id: 's2', icon: '✏️', label: '会員情報の変更' },
  { id: 's3', icon: '❓', label: 'ヘルプ・お問い合わせ' },
  { id: 's4', icon: '🚪', label: 'ログアウト' },
];

export default function AccountScreen() {
  const unusedCoupons = coupons.filter((c) => !c.used);

  return (
    <ScreenContainer title="マイページ" subtitle="会員証・スタンプ・来館履歴">
      <MemberCompact member={member} />

      <Card>
        <View style={styles.cardHeader}>
          <SectionTitle title="スタンプカード" style={styles.sectionTitle} />
          <Text style={styles.progressText}>
            {stampProgress.current} / {stampProgress.setSize}
          </Text>
        </View>
        <StampGrid current={stampProgress.current} setSize={stampProgress.setSize} />
        <Text style={styles.helperText}>
          スタンプ{stampProgress.setSize}個でお食事1000円クーポンを1枚進呈します。
          {stampProgress.completedSets > 0
            ? `（これまでに${stampProgress.completedSets}セット達成済み）`
            : ''}
        </Text>
      </Card>

      <Card>
        <SectionTitle title="未使用クーポン一覧" style={styles.sectionTitle} />
        {unusedCoupons.length === 0 ? (
          <Text style={styles.helperText}>現在ご利用いただけるクーポンはありません。</Text>
        ) : (
          unusedCoupons.map((coupon) => (
            <View key={coupon.id} style={styles.couponItem}>
              <View style={styles.couponHeader}>
                <Text style={styles.couponTitle}>{coupon.title}</Text>
                <Badge label="未使用" variant="success" />
              </View>
              <Text style={styles.couponDescription}>{coupon.description}</Text>
              <Text style={styles.couponDate}>獲得日：{coupon.obtainedDate}</Text>
            </View>
          ))
        )}
      </Card>

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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.md,
  },
  couponItem: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  couponDescription: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
    lineHeight: 17,
  },
  couponDate: {
    color: colors.textFaint,
    fontSize: 11,
    marginTop: spacing.xs,
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
