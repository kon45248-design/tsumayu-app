import { supabase } from './supabase';
import { StampProgress, VisitRecord } from '../types';

const STAMP_SET_SIZE = 10;

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export async function getStampProgress(memberId: string): Promise<StampProgress | null> {
  const { data, error } = await supabase.from('stamps').select('stamp_count').eq('member_id', memberId);

  if (error || !data) {
    return null;
  }

  const total = data.reduce((sum, row) => sum + (row.stamp_count ?? 0), 0);

  return {
    current: total % STAMP_SET_SIZE,
    setSize: STAMP_SET_SIZE,
    completedSets: Math.floor(total / STAMP_SET_SIZE),
  };
}

export async function getVisitHistory(memberId: string): Promise<VisitRecord[] | null> {
  const { data, error } = await supabase
    .from('stamps')
    .select('id, visited_at, stamp_count, is_group_visit')
    .eq('member_id', memberId)
    .order('visited_at', { ascending: false });

  if (error || !data) {
    return null;
  }

  return data.map((row) => ({
    id: row.id,
    date: formatDate(row.visited_at),
    description: row.is_group_visit ? '中高生グループ来館（3人以上）' : '通常来館',
    stampsEarned: row.stamp_count,
    isGroupVisit: row.is_group_visit,
  }));
}
