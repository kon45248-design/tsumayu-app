import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Badge from '../components/Badge';
import Card from '../components/Card';
import ScreenContainer from '../components/ScreenContainer';
import SectionTitle from '../components/SectionTitle';
import { colors, radius, spacing } from '../theme';
import { MEMBER_TYPE_LABELS, MemberType, ScreenKey } from '../types';

interface RegisterScreenProps {
  onNavigate: (key: ScreenKey) => void;
}

interface MemberTypeOption {
  type: MemberType;
  label: string;
  fee: number;
  note: string;
}

const MEMBER_TYPE_OPTIONS: MemberTypeOption[] = [
  {
    type: 'saito',
    label: '西都市民会員',
    fee: 700,
    note: '住所確認書類をフロントでご提示ください。確認後、スタッフが承認します。',
  },
  {
    type: 'general',
    label: '一般会員',
    fee: 900,
    note: 'アプリ登録のみで即時有効になります。',
  },
  {
    type: 'student',
    label: '中高生会員',
    fee: 700,
    note: '学生証をフロントでご提示ください。確認後、スタッフが承認します。',
  },
];

type Step = 1 | 2 | 3 | 4;

export default function RegisterScreen({ onNavigate }: RegisterScreenProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedType, setSelectedType] = useState<MemberType | null>(null);
  const [name, setName] = useState('');

  const selectedOption = MEMBER_TYPE_OPTIONS.find((option) => option.type === selectedType) ?? null;
  const canProceedStep1 = selectedType !== null;
  const canProceedStep2 = name.trim().length > 0;

  return (
    <ScreenContainer title="会員登録" subtitle={`ステップ ${Math.min(step, 3)} / 3`}>
      <Pressable onPress={() => onNavigate('passport')}>
        <Text style={styles.backLink}>← ホームに戻る</Text>
      </Pressable>

      {step === 1 ? (
        <>
          <SectionTitle title="会員種別を選択" />
          {MEMBER_TYPE_OPTIONS.map((option) => {
            const isSelected = option.type === selectedType;
            return (
              <Pressable
                key={option.type}
                onPress={() => setSelectedType(option.type)}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionFee}>入浴 {option.fee.toLocaleString()}円</Text>
                </View>
                <Text style={styles.optionNote}>{option.note}</Text>
              </Pressable>
            );
          })}
          <Pressable
            style={[styles.primaryButton, !canProceedStep1 && styles.primaryButtonDisabled]}
            disabled={!canProceedStep1}
            onPress={() => setStep(2)}
          >
            <Text style={styles.primaryButtonText}>次へ</Text>
          </Pressable>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <SectionTitle title="お名前を入力" />
          <Card>
            <Text style={styles.inputLabel}>お名前</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="例：宮崎 花子"
              placeholderTextColor={colors.textFaint}
            />
          </Card>
          <View style={styles.buttonRow}>
            <Pressable style={styles.secondaryButton} onPress={() => setStep(1)}>
              <Text style={styles.secondaryButtonText}>戻る</Text>
            </Pressable>
            <Pressable
              style={[
                styles.primaryButton,
                styles.flexButton,
                !canProceedStep2 && styles.primaryButtonDisabled,
              ]}
              disabled={!canProceedStep2}
              onPress={() => setStep(3)}
            >
              <Text style={styles.primaryButtonText}>次へ</Text>
            </Pressable>
          </View>
        </>
      ) : null}

      {step === 3 && selectedOption ? (
        <>
          <SectionTitle title="登録内容の確認" />
          <Card>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>会員種別</Text>
              <Badge label={MEMBER_TYPE_LABELS[selectedOption.type]} variant="accent" />
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>お名前</Text>
              <Text style={styles.summaryValue}>{name}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryRowLast]}>
              <Text style={styles.summaryLabel}>入浴料金</Text>
              <Text style={styles.summaryValue}>{selectedOption.fee.toLocaleString()}円</Text>
            </View>
          </Card>
          <Card style={styles.noteCard}>
            <Text style={styles.noteText}>
              {selectedOption.type === 'general'
                ? 'アプリ登録のみで即時有効になります。登録後すぐに会員証をご利用いただけます。'
                : `${selectedOption.note}承認されるまでは会員証に「確認待ち」と表示されます。`}
            </Text>
          </Card>
          <View style={styles.buttonRow}>
            <Pressable style={styles.secondaryButton} onPress={() => setStep(2)}>
              <Text style={styles.secondaryButtonText}>戻る</Text>
            </Pressable>
            <Pressable style={[styles.primaryButton, styles.flexButton]} onPress={() => setStep(4)}>
              <Text style={styles.primaryButtonText}>登録する</Text>
            </Pressable>
          </View>
        </>
      ) : null}

      {step === 4 && selectedOption ? (
        <>
          <SectionTitle title="登録完了" />
          <Card>
            <Text style={styles.completeTitle}>
              {selectedOption.type === 'general'
                ? 'ご登録ありがとうございました'
                : 'ご登録を受け付けました'}
            </Text>
            <Text style={styles.completeText}>
              {selectedOption.type === 'general'
                ? '会員証は即時ご利用いただけます。'
                : 'スタッフが確認後、承認されます。承認されるまでは会員証に「確認待ち」と表示されます。'}
            </Text>
          </Card>
          <Pressable style={styles.primaryButton} onPress={() => onNavigate('account')}>
            <Text style={styles.primaryButtonText}>会員証を見る</Text>
          </Pressable>
        </>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backLink: {
    color: colors.accent,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
  },
  optionCardSelected: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  optionLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  optionFee: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  optionNote: {
    color: colors.textMuted,
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
  secondaryButton: {
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  flexButton: {
    flex: 1,
  },
  inputLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: spacing.sm,
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  summaryRowLast: {
    borderBottomWidth: 0,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  noteCard: {
    backgroundColor: 'rgba(200,170,100,0.10)',
    borderColor: colors.accent,
  },
  noteText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  completeTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  completeText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});
