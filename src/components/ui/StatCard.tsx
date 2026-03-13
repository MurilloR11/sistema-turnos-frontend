import type { ReactNode } from 'react';

type Accent = 'blue' | 'green' | 'amber' | 'neutral';

interface StatCardProps {
  label: string;
  accent?: Accent;
  children: ReactNode;
}

const accentColor: Record<Accent, string> = {
  blue:    '#3B82F6',
  green:   '#22C55E',
  amber:   '#F59E0B',
  neutral: '#27272A',
};

export function StatCard({ label, accent = 'neutral', children }: StatCardProps) {
  return (
    <div className="stat-card">
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 14,
          right: 14,
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${accentColor[accent]}55 50%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />
      <div className="micro-label" style={{ marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}
