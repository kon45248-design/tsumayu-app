import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import HeroImage from '../components/HeroImage';
import ScreenContainer from '../components/ScreenContainer';
import { places } from '../data/mockData';
import { colors, spacing } from '../theme';

export default function PlacesScreen() {
  return (
    <ScreenContainer
      hero={
        <HeroImage
          source={require('../../assets/photos/onsen-indoor.jpg')}
          height={200}
          overlayColor="rgba(10,20,40,0.45)"
          title="大きな湯へ。"
          titleSize={24}
          subtitle="温泉 / サウナ / 休憩 / 駐車場"
        />
      }
    >
      {places.map((spot) => (
        <Card key={spot.id}>
          <View style={styles.headerRow}>
            <Text style={styles.icon}>{spot.icon}</Text>
            <Text style={styles.name}>{spot.name}</Text>
          </View>
          <Text style={styles.description}>{spot.description}</Text>
          <Text style={styles.info}>{spot.info}</Text>
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 22,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.sm,
  },
  info: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
});
