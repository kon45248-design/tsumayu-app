import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CrowdCard from '../components/CrowdCard';
import HeroImage from '../components/HeroImage';
import HomeStatusBar from '../components/HomeStatusBar';
import MemberCompact from '../components/MemberCompact';
import { crowdDetails, facilityStatus, member } from '../data/mockData';
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
  { key: 'places', icon: '湯', label: '館内案内' },
  { key: 'food', icon: '食', label: '食事メニュー' },
  { key: 'perks', icon: '印', label: 'スタンプ' },
  { key: 'perks', icon: '券', label: 'クーポン' },
];

export default function PassportScreen({ onNavigate }: PassportScreenProps) {
  return (
    <View style={styles.container}>
      <HomeStatusBar
        isOpen={facilityStatus.isOpen}
        hoursLabel="22:00まで"
        crowdLevel={facilityStatus.crowdLevel}
        crowdLabel={facilityStatus.crowdLabel}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.section}>
            <MemberCompact member={member} />
          </View>

          <View style={styles.section}>
            <CrowdCard details={crowdDetails} />
          </View>

          <View style={[styles.shortcutGrid, styles.section]}>
            {SHORTCUTS.map((item) => (
              <Pressable
                key={`${item.key}-${item.label}`}
                style={styles.shortcut}
                onPress={() => onNavigate(item.key)}
              >
                <Text style={styles.shortcutIcon}>{item.icon}</Text>
                <Text style={styles.shortcutLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.heroSection}>
            <HeroImage
              source={require('../../assets/photos/onsen-openair.jpg')}
              height={160}
              overlayColor="rgba(10,20,40,0.40)"
              title="太古の湯へ、今日。"
              titleSize={20}
              borderRadius={radius}
            />
          </View>

          <Pressable style={styles.registerLinkRow} onPress={() => onNavigate('register')}>
            <Text style={styles.registerLinkText}>
              はじめての方はこちら → <Text style={styles.registerLinkAccent}>会員登録</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  section: {
    marginBottom: spacing.md,
  },
  heroSection: {
    marginBottom: 8,
  },
  shortcutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  shortcut: {
    flexBasis: '47%',
    flexGrow: 1,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(200,170,100,0.25)',
    borderRadius: radius,
  },
  shortcutIcon: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '700',
  },
  shortcutLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  registerLinkRow: {
    alignItems: 'center',
    paddingVertical: 8,
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
