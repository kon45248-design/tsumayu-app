export const colors = {
  background: '#0a1628',
  accent: '#c8aa64',
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.65)',
  textFaint: 'rgba(255,255,255,0.4)',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.12)',
  success: '#6fcf97',
  warning: '#f2c94c',
  danger: '#eb5757',
  crowdFree: '#6fcf97',
  crowdMedium: '#fb923c',
  crowdBusy: '#eb5757',
  navBackground: '#0d1d33',
  statusBarBackground: '#0d1f3c',
} as const;

export const radius = 12;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
