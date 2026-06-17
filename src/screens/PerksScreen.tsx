import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Badge from '../components/Badge';
import Card from '../components/Card';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import StampGrid from '../components/StampGrid';
import {
  coupons as mockCoupons,
  member,
  stampProgress as mockStampProgress,
} from '../data/mockData';
import { colors, spacing } from '../theme';
import { Coupon, StampProgress } from '../types';

interface PerksScreenProps {
  stampProgress?: StampProgress;
  coupons?: Coupon[];
}

export default function PerksScreen({
  stampProgress: stampProgressProp,
  coupons: couponsProp,
}: PerksScreenProps) {
  const stampProgress = stampProgressProp ?? mockStampProgress;
  const coupons = couponsProp ?? mockCoupons;
  const unusedCoupons = coupons.filter((c) => !c.used);
  const usedCoupons = coupons.filter((c) => c.used);

  return (
    <ScreenContainer title="スタンプ・クーポン">
      <Card>
        <View style={styles.cardHeader}>
          <SectionTitle title="スタンプカード" />
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
        <SectionTitle title="スタンプのたまり方" />
        <View style={styles.ruleRow}>
          <Text style={styles.ruleText}>来館1回でスタンプ1個</Text>
        </View>
        <View style={styles.ruleRow}>
          <Text style={styles.ruleText}>中高生会員：3人以上のグループ来館で</Text>
          <Badge label="×2" variant="accent" />
        </View>
        <View style={styles.ruleRow}>
          <Text style={styles.ruleText}>スタンプ10個でお食事1000円クーポンに変換</Text>
        </View>
      </Card>

      <Card>
        <SectionTitle title="今日使える特典" />
        {member.status === 'active' ? (
          <Text style={styles.helperText}>
            会員証を受付でご提示いただくと、ご入浴料金{member.bathFee.toLocaleString()}円が適用されます。
          </Text>
        ) : (
          <Text style={styles.helperTextWarning}>
            現在「確認待ち」のため、特典のご利用にはスタッフの承認が必要です。受付までお声がけください。
          </Text>
        )}
        {unusedCoupons.length > 0 ? (
          <Text style={styles.helperText}>
            未使用のお食事クーポンが{unusedCoupons.length}枚あります。レストランでご利用いただけます。
          </Text>
        ) : null}
      </Card>

      <Card>
        <SectionTitle title="未使用クーポン一覧" />
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

      {usedCoupons.length > 0 ? (
        <Card>
          <SectionTitle title="利用済みクーポン" />
          {usedCoupons.map((coupon) => (
            <View key={coupon.id} style={styles.couponItem}>
              <View style={styles.couponHeader}>
                <Text style={styles.couponTitleUsed}>{coupon.title}</Text>
                <Badge label="利用済み" variant="outline" />
              </View>
              <Text style={styles.couponDate}>獲得日：{coupon.obtainedDate}</Text>
            </View>
          ))}
        </Card>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
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
  helperTextWarning: {
    color: colors.warning,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  ruleText: {
    color: colors.textMuted,
    fontSize: 13,
    flexShrink: 1,
  },
  couponItem: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
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
  couponTitleUsed: {
    color: colors.textFaint,
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
});
