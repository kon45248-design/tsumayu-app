import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { APPROVAL_STATUS_LABELS, MEMBER_TYPE_LABELS, Member } from '../types';
import Badge from './Badge';
import QRCodeMock from './QRCodeMock';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image
          source={require('../../assets/photos/logo-tsumayu.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.badgeGroup}>
          <Badge label={MEMBER_TYPE_LABELS[member.type]} variant="accent" />
          <Badge
            label={APPROVAL_STATUS_LABELS[member.status]}
            variant={member.status === 'active' ? 'success' : 'warning'}
          />
        </View>
      </View>

      <Text style={styles.appName}>妻湯パスポート</Text>

      <View style={styles.bodyRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.name}>{member.name} 様</Text>
          <Text style={styles.memberNumberLabel}>会員番号</Text>
          <Text style={styles.memberNumber}>{member.memberNumber}</Text>

          <View style={styles.feeBox}>
            <Text style={styles.feeLabel}>あなたの入浴料金</Text>
            <Text style={styles.feeValue}>{member.bathFee.toLocaleString()}円</Text>
          </View>
        </View>

        <View style={styles.qrColumn}>
          <QRCodeMock />
          <Text style={styles.qrCaption}>提示用QR（モック）</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.accent,
    padding: spacing.lg,
    gap: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  badgeGroup: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  appName: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  bodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  infoColumn: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  memberNumberLabel: {
    color: colors.textMuted,
    fontSize: 11,
  },
  memberNumber: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  feeBox: {
    backgroundColor: 'rgba(200,170,100,0.12)',
    borderRadius: radius,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: 'flex-start',
  },
  feeLabel: {
    color: colors.textMuted,
    fontSize: 11,
    opacity: 0.7,
  },
  feeValue: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '700',
  },
  qrColumn: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  qrCaption: {
    color: colors.textFaint,
    fontSize: 10,
  },
});
