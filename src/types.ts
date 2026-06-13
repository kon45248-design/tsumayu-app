export type ScreenKey = 'passport' | 'places' | 'food' | 'perks' | 'account' | 'register' | 'login';

export type MemberType = 'saito' | 'general' | 'student';

export type ApprovalStatus = 'active' | 'pending';

export type CrowdLevel = 'free' | 'medium' | 'busy';

export interface CrowdDetail {
  area: string;
  status: string;
  level: CrowdLevel;
}

export interface Member {
  name: string;
  memberNumber: string;
  type: MemberType;
  status: ApprovalStatus;
  bathFee: number;
}

export interface StampProgress {
  current: number;
  setSize: number;
  completedSets: number;
}

export interface VisitRecord {
  id: string;
  date: string;
  description: string;
  stampsEarned: number;
  isGroupVisit?: boolean;
}

export interface Coupon {
  id: string;
  title: string;
  description: string;
  obtainedDate: string;
  used: boolean;
}

export interface FacilitySpot {
  id: string;
  name: string;
  icon: string;
  description: string;
  info: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  icon: string;
}

export const MEMBER_TYPE_LABELS: Record<MemberType, string> = {
  saito: '西都市民',
  general: '一般',
  student: '中高生',
};

export const APPROVAL_STATUS_LABELS: Record<ApprovalStatus, string> = {
  active: '有効',
  pending: '確認待ち',
};
