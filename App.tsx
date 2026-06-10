import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import BottomNav from './src/components/BottomNav';
import AccountScreen from './src/screens/AccountScreen';
import FoodScreen from './src/screens/FoodScreen';
import PassportScreen from './src/screens/PassportScreen';
import PerksScreen from './src/screens/PerksScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { colors } from './src/theme';
import { ScreenKey } from './src/types';

const VALID_SCREENS: ScreenKey[] = ['passport', 'places', 'food', 'perks', 'account', 'register'];

function getInitialScreen(): ScreenKey {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('screen');
    if (VALID_SCREENS.includes(requested as ScreenKey)) {
      return requested as ScreenKey;
    }
  }
  return 'passport';
}

export default function App() {
  const [screen, setScreen] = useState<ScreenKey>(getInitialScreen);

  const navigateTo = (key: ScreenKey) => {
    setScreen(key);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('screen', key);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {screen === 'passport' && <PassportScreen onNavigate={navigateTo} />}
        {screen === 'places' && <PlacesScreen />}
        {screen === 'food' && <FoodScreen />}
        {screen === 'perks' && <PerksScreen />}
        {screen === 'account' && <AccountScreen />}
        {screen === 'register' && <RegisterScreen onNavigate={navigateTo} />}
      </View>
      {screen !== 'register' && <BottomNav active={screen} onChange={navigateTo} />}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
});
