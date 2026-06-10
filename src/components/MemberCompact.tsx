import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { APPROVAL_STATUS_LABELS, MEMBER_TYPE_LABELS, Member } from '../types';
import Badge from './Badge';
import QRCodeMock from './QRCodeMock';

interface MemberCompactProps {
  member: Member;
}

export default function MemberCompact({ member }: MemberCompactProps) {
  return (
    <View style={styles.card}>
      <Image
        source={require('../../assets/photos/logo-tsumayu.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.infoColumn}>
        <Text style={styles.name} numberOfLines={1}>
          {member.name} 様
        </Text>
        <View style={styles.badgeRow}>
          <Badge label={MEMBER_TYPE_LABELS[member.type]} variant="accent" style={styles.badge} />
          <Badge
            label={APPROVAL_STATUS_LABELS[member.status]}
            variant={member.status === 'active' ? 'success' : 'warning'}
            style={styles.badge}
          />
        </View>
      </View>
      <View style={styles.feeColumn}>
        <Text style={styles.feeLabel}>入浴料金</Text>
        <Text style={styles.feeValue}>{member.bathFee.toLocaleString()}円</Text>
      </View>
      <QRCodeMock />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(200,170,100,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(200,170,100,0.60)',
    borderRadius: radius,
    paddingHorizontal: spacing.md,
  },
  logo: {
    width: 32,
    height: 32,
  },
  infoColumn: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  feeColumn: {
    alignItems: 'flex-end',
  },
  feeLabel: {
    color: colors.textMuted,
    fontSize: 10,
    opacity: 0.7,
  },
  feeValue: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: '700',
  },
});
