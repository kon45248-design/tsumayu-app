import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Card from '../components/Card';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import { signIn } from '../lib/auth';
import { colors, radius, spacing } from '../theme';
import { ScreenKey } from '../types';

interface LoginScreenProps {
  onNavigate: (key: ScreenKey) => void;
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !loading;

  const handleLogin = async () => {
    setErrorMessage(null);
    setLoading(true);
    const { error } = await signIn(email.trim(), password);
    setLoading(false);
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <ScreenContainer title="ログイン" subtitle="妻湯パスポート">
      <SectionTitle title="メールアドレス・パスワード" />
      <Card>
        <Text style={styles.inputLabel}>メールアドレス</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="例：sakura@example.com"
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={[styles.inputLabel, styles.inputLabelSpaced]}>パスワード</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="パスワード"
          placeholderTextColor={colors.textFaint}
          secureTextEntry
        />
      </Card>

      {errorMessage ? (
        <Card style={styles.errorCard}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </Card>
      ) : null}

      <Pressable
        style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
        disabled={!canSubmit}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={styles.primaryButtonText}>ログイン</Text>
        )}
      </Pressable>

      <Pressable style={styles.registerLinkRow} onPress={() => onNavigate('register')}>
        <Text style={styles.registerLinkText}>
          会員登録は<Text style={styles.registerLinkAccent}>こちら</Text>
        </Text>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  inputLabelSpaced: {
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 15,
  },
  errorCard: {
    backgroundColor: 'rgba(235,87,87,0.10)',
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    borderRadius: radius,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.4,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '700',
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
