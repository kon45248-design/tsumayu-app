import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Badge from '../components/Badge';
import Card from '../components/Card';
import HeroImage from '../components/HeroImage';
import SectionTitle from '../components/SectionTitle';
import { crowdDetails, facilityStatus } from '../data/mockData';
import { colors, radius, spacing } from '../theme';
import { ScreenKey } from '../types';

interface PassportScreenProps {
  onNavigate: (key: ScreenKey) => void;
}

interface Shortcut {
  key: ScreenKey;
  icon: string;
  label: string;
}

const SHORTCUTS: Shortcut[] = [
  { key: 'account', icon: '🪪', label: '会員証' },
  { key: 'places', icon: '♨️', label: '館内' },
  { key: 'food', icon: '🍴', label: '食事' },
  { key: 'perks', icon: '🎁', label: '特典' },
];

export default function PassportScreen({ onNavigate }: PassportScreenProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <HeroImage
        source={require('../../assets/photos/onsen-openair.jpg')}
        height={260}
        overlayColor="rgba(10,20,40,0.35)"
        title="太古の湯へ、今日。"
        titleSize={28}
        badges={
          <>
            <Badge label="営業中" variant="photo" />
            <Badge label="22時まで" variant="photo" />
            <Badge label="やや混雑" variant="photo" />
          </>
        }
      />

      <View style={styles.content}>
        <View style={styles.shortcutRow}>
          {SHORTCUTS.map((item) => (
            <Pressable
              key={item.key}
              style={styles.shortcut}
              onPress={() => onNavigate(item.key)}
            >
              <Text style={styles.shortcutIcon}>{item.icon}</Text>
              <Text style={styles.shortcutLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <SectionTitle title="今日の妻湯" />

        <Card>
          <Text style={styles.cardLabel}>今の混雑</Text>
          <View style={styles.crowdRow}>
            {crowdDetails.map((item) => (
              <View key={item.area} style={styles.crowdItem}>
                <Text style={styles.crowdArea}>{item.area}</Text>
                <Text style={styles.crowdStatus}>{item.status}</Text>
              </View>
            ))}
          </View>
        </Card>

        <HeroImage
          source={require('../../assets/photos/perk-drink.jpg')}
          height={120}
          overlayColor="rgba(10,20,40,0.45)"
          title="湯上がりドリンク"
          titleSize={18}
          subtitle="サウナ後の一杯。今日使える特典"
          borderRadius={radius}
        />

        <Pressable onPress={() => onNavigate('food')}>
          <HeroImage
            source={require('../../assets/photos/restaurant-hero.jpg')}
            height={120}
            overlayColor="rgba(10,20,40,0.40)"
            title="食事も、妻湯。"
            titleSize={18}
            subtitle="レストラン 10:00〜21:30"
            borderRadius={radius}
          />
        </Pressable>

        <SectionTitle title="お知らせ" />
        <Card>
          <Text style={styles.statusText}>営業時間：{facilityStatus.hours}</Text>
          {facilityStatus.notice ? (
            <Text style={styles.notice}>※ {facilityStatus.notice}</Text>
          ) : null}
        </Card>

        <Pressable style={styles.registerLinkRow} onPress={() => onNavigate('register')}>
          <Text style={styles.registerLinkText}>
            はじめての方はこちら → <Text style={styles.registerLinkAccent}>会員登録</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: 0,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
    gap: spacing.md,
  },
  shortcutRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  shortcut: {
    flex: 1,
    minHeight: 72,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(200,170,100,0.25)',
    borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  shortcutIcon: {
    fontSize: 24,
  },
  shortcutLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  cardLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  crowdRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  crowdItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius,
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  crowdArea: {
    color: colors.textMuted,
    fontSize: 12,
  },
  crowdStatus: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '700',
  },
  statusText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  notice: {
    color: colors.warning,
    fontSize: 12,
    marginTop: spacing.sm,
  },
  registerLinkRow: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  registerLinkText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  registerLinkAccent: {
    color: colors.accent,
    fontWeight: '700',
  },
});
