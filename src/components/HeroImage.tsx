import React, { ReactNode } from 'react';
import { ImageBackground, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { spacing } from '../theme';

interface HeroImageProps {
  source: ImageSourcePropType;
  height: number;
  overlayColor: string;
  title: string;
  titleSize?: number;
  subtitle?: string;
  badges?: ReactNode;
  borderRadius?: number;
}

export default function HeroImage({
  source,
  height,
  overlayColor,
  title,
  titleSize = 22,
  subtitle,
  badges,
  borderRadius = 0,
}: HeroImageProps) {
  return (
    <ImageBackground
      source={source}
      style={[styles.hero, { height, borderRadius, overflow: 'hidden' }]}
      resizeMode="cover"
    >
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      {badges ? <View style={styles.badgeRow}>{badges}</View> : null}
      <View style={styles.textBlock}>
        <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
  },
  badgeRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    padding: spacing.lg,
  },
  textBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
