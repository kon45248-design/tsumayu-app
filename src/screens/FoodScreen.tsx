import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import HeroImage from '../components/HeroImage';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import { menuItems } from '../data/mockData';
import { colors, spacing } from '../theme';
import { MenuItem } from '../types';

const CATEGORY_ORDER = ['定食', '麺類', 'ドリンク', 'デザート'];

function groupByCategory(items: MenuItem[]) {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);
}

export default function FoodScreen() {
  const groups = groupByCategory(menuItems);

  return (
    <ScreenContainer
      hero={
        <HeroImage
          source={require('../../assets/photos/restaurant-hero.jpg')}
          height={200}
          overlayColor="rgba(10,20,40,0.40)"
          title="西都の恵み、ここにある。"
          titleSize={22}
          subtitle="地産地消 / 都萬牛 / 妻地鶏 / 西都野菜"
        />
      }
    >
      <Card style={styles.couponCard}>
        <Text style={styles.couponTitle}>🎫 お食事クーポンが使えます</Text>
        <Text style={styles.couponText}>
          スタンプ10個達成で発行される「お食事1000円クーポン」は、こちらのレストランでご利用いただけます。会計時にスタッフへ会員証画面をご提示ください。
        </Text>
      </Card>

      {groups.map((group) => (
        <View key={group.category} style={styles.group}>
          <SectionTitle title={group.category} />
          {group.items.map((item) => (
            <Card key={item.id} style={styles.menuCard}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuInfo}>
                <View style={styles.menuHeader}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuPrice}>{item.price.toLocaleString()}円</Text>
                </View>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
            </Card>
          ))}
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  couponCard: {
    backgroundColor: 'rgba(200,170,100,0.10)',
    borderColor: colors.accent,
  },
  couponTitle: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  couponText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  group: {
    gap: spacing.sm,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuIcon: {
    fontSize: 28,
  },
  menuInfo: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  menuPrice: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  menuDescription: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
});
