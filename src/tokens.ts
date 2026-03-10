export const tokens = {
  bg:           '#09090B',
  bgSubtle:     '#0F0F12',
  surface:      '#111114',
  surfaceHover: '#16161A',
  border:       '#1C1C21',
  text1:        '#FAFAFA',
  text2:        '#A0A0AB',
  text3:        '#52525B',
  accent:       '#3B82F6',
  accentDim:    'rgba(59,130,246,0.08)',
  green:        '#22C55E',
  greenDim:     'rgba(34,197,94,0.08)',
  amber:        '#F59E0B',
  amberDim:     'rgba(245,158,11,0.08)',
  red:          '#EF4444',
  redDim:       'rgba(239,68,68,0.08)',
} as const;

export type Tokens = typeof tokens;
