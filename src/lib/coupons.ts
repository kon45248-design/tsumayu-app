import { supabase } from './supabase';
import { Coupon } from '../types';

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export async function getCoupons(memberId: string): Promise<Coupon[] | null> {
  const { data, error } = await supabase
    .from('coupons')
    .select('id, title, obtained_at, is_used')
    .eq('member_id', memberId)
    .order('obtained_at', { ascending: false });

  if (error || !data) {
    return null;
  }

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    description: 'スタンプ達成の特典です。レストランでご利用いただけます。',
    obtainedDate: formatDate(row.obtained_at),
    used: row.is_used,
  }));
}
