import {
  Coupon,
  CrowdDetail,
  FacilitySpot,
  Member,
  MenuItem,
  StampProgress,
  VisitRecord,
} from '../types';

export const member: Member = {
  name: '黒木 さくら',
  memberNumber: 'TY-2026-00458',
  type: 'student',
  status: 'pending',
  bathFee: 700,
};

export const stampProgress: StampProgress = {
  current: 6,
  setSize: 10,
  completedSets: 1,
};

export const visitHistory: VisitRecord[] = [
  {
    id: 'v1',
    date: '2026/06/08',
    description: '通常来館',
    stampsEarned: 1,
  },
  {
    id: 'v2',
    date: '2026/06/02',
    description: '中高生グループ来館（3人以上）',
    stampsEarned: 2,
    isGroupVisit: true,
  },
  {
    id: 'v3',
    date: '2026/05/25',
    description: '通常来館',
    stampsEarned: 1,
  },
  {
    id: 'v4',
    date: '2026/05/18',
    description: '通常来館',
    stampsEarned: 1,
  },
  {
    id: 'v5',
    date: '2026/05/10',
    description: '通常来館',
    stampsEarned: 1,
  },
];

export const coupons: Coupon[] = [
  {
    id: 'c1',
    title: 'お食事1000円クーポン',
    description: 'スタンプ10個達成の特典です。レストランでご利用いただけます。',
    obtainedDate: '2026/05/02',
    used: false,
  },
  {
    id: 'c2',
    title: 'お食事1000円クーポン',
    description: '前回のスタンプセット達成分です。',
    obtainedDate: '2026/03/14',
    used: true,
  },
];

export const facilityStatus = {
  isOpen: true,
  hours: '10:00〜22:00（最終受付21:30）',
  crowdLevel: 'medium' as const,
  crowdLabel: 'やや混雑',
  notice: '本日は浴室清掃のため15:00〜15:30は一部設備を休止します。',
};

export const crowdDetails: CrowdDetail[] = [
  { area: '温泉', status: 'やや混雑', level: 'medium' },
  { area: 'サウナ', status: '空き', level: 'free' },
  { area: '駐車場', status: '普通', level: 'free' },
];

export const places: FacilitySpot[] = [
  {
    id: 'onsen',
    name: '温泉（源泉掛け流し）',
    icon: '♨️',
    description: '地下から湧き出る源泉を加水せずそのままかけ流し。やわらかい泉質が自慢です。',
    info: '営業時間 10:00〜21:30 / 男女入替制',
  },
  {
    id: 'sauna',
    name: 'サウナ',
    icon: '🔥',
    description: '高温サウナと水風呂を完備。整いスペースもございます。',
    info: '利用時間 10:00〜21:00 / タオル持参推奨',
  },
  {
    id: 'rest',
    name: '休憩スペース',
    icon: '🛌',
    description: '広々とした畳敷きの休憩室。お食事後はゆっくりお寛ぎいただけます。',
    info: '利用時間 10:00〜22:00 / 無料Wi-Fiあり',
  },
  {
    id: 'parking',
    name: '駐車場',
    icon: '🅿️',
    description: '館内専用駐車場を完備。大型車両用のスペースもございます。',
    info: '台数 普通車50台 / 大型車5台・無料',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    name: '妻湯定食',
    price: 1100,
    description: '日替わり焼き魚と小鉢、ご飯、味噌汁のセット',
    category: '定食',
    icon: '🍱',
  },
  {
    id: 'm2',
    name: 'チャンポン麺',
    price: 850,
    description: '野菜たっぷりの宮崎名物チャンポン',
    category: '麺類',
    icon: '🍜',
  },
  {
    id: 'm3',
    name: '冷やし湯上りうどん',
    price: 750,
    description: '入浴後にぴったりの冷たいうどん',
    category: '麺類',
    icon: '🥢',
  },
  {
    id: 'm4',
    name: 'フルーツ牛乳',
    price: 200,
    description: '湯上りの定番ドリンク',
    category: 'ドリンク',
    icon: '🥛',
  },
  {
    id: 'm5',
    name: 'ソフトクリーム',
    price: 350,
    description: '濃厚ミルクのソフトクリーム',
    category: 'デザート',
    icon: '🍦',
  },
];
