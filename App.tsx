import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import BottomNav from './src/components/BottomNav';
import { member as mockMember } from './src/data/mockData';
import { getCurrentMember, signOut } from './src/lib/auth';
import { supabase } from './src/lib/supabase';
import AccountScreen from './src/screens/AccountScreen';
import FoodScreen from './src/screens/FoodScreen';
import LoginScreen from './src/screens/LoginScreen';
import PassportScreen from './src/screens/PassportScreen';
import PerksScreen from './src/screens/PerksScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { colors } from './src/theme';
import { Member, ScreenKey } from './src/types';

const VALID_SCREENS: ScreenKey[] = ['passport', 'places', 'food', 'perks', 'account', 'register', 'login'];

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
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [member, setMember] = useState<Member>(mockMember);

  const navigateTo = (key: ScreenKey) => {
    setScreen(key);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('screen', key);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setMember(mockMember);
      return;
    }
    getCurrentMember().then((fetched) => {
      setMember(fetched ?? mockMember);
    });
  }, [session]);

  useEffect(() => {
    if (session === undefined) {
      return;
    }
    const hasScreenParam =
      Platform.OS === 'web' &&
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has('screen');

    if (!session && !hasScreenParam && screen !== 'login' && screen !== 'register') {
      navigateTo('login');
    }
    if (session && screen === 'login') {
      navigateTo('passport');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleSignOut = async () => {
    await signOut();
    navigateTo('login');
  };

  if (session === undefined) {
    return <SafeAreaView style={styles.safeArea} />;
  }

  const showBottomNav = screen !== 'register' && screen !== 'login';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        {screen === 'login' && <LoginScreen onNavigate={navigateTo} />}
        {screen === 'register' && <RegisterScreen onNavigate={navigateTo} />}
        {screen === 'passport' && <PassportScreen onNavigate={navigateTo} member={member} />}
        {screen === 'places' && <PlacesScreen />}
        {screen === 'food' && <FoodScreen />}
        {screen === 'perks' && <PerksScreen />}
        {screen === 'account' && <AccountScreen member={member} onSignOut={handleSignOut} />}
      </View>
      {showBottomNav && <BottomNav active={screen} onChange={navigateTo} />}
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
