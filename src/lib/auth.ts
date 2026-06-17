import { supabase } from './supabase';
import { ApprovalStatus, Member, MemberType } from '../types';

const BATH_FEE_BY_TYPE: Record<MemberType, number> = {
  saito: 700,
  general: 900,
  student: 700,
};

function generateMemberNumber(): string {
  const year = new Date().getFullYear();
  const serial = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0');
  return `TY-${year}-${serial}`;
}

export interface AuthResult {
  error: string | null;
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  memberType: MemberType
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return { error: error.message };
  }

  const userId = data.user?.id;
  if (!userId) {
    return { error: 'ユーザーの作成に失敗しました。' };
  }

  const status: ApprovalStatus = memberType === 'general' ? 'active' : 'pending';

  const { error: insertError } = await supabase.from('members').insert({
    user_id: userId,
    name,
    member_number: generateMemberNumber(),
    member_type: memberType,
    status,
    bath_fee: BATH_FEE_BY_TYPE[memberType],
  });

  if (insertError) {
    return { error: insertError.message };
  }

  return { error: null };
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error: error ? error.message : null };
}

export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
  return { error: error ? error.message : null };
}

export async function getCurrentMember(): Promise<Member | null> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (userError || !userId) {
    return null;
  }

  const { data, error } = await supabase
    .from('members')
    .select('id, name, member_number, member_type, status, bath_fee')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    memberNumber: data.member_number,
    type: data.member_type,
    status: data.status,
    bathFee: data.bath_fee,
  };
}
