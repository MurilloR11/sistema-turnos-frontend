import type { ReactNode } from 'react';

type Accent = 'blue' | 'green' | 'amber' | 'neutral';

interface StatCardProps {
  label: string;
  accent?: Accent;
  children: ReactNode;
}

const accentBar: Record<Accent, string> = {
  blue:    '#3B82F6',
  green:   '#22C55E',
  amber:   '#F59E0B',
  neutral: '#27272A',
};

export function StatCard({ label, accent = 'neutral', children }: StatCardProps) {
  return (
    <div className="stat-card">
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 16,
          right: 16,
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${accentBar[accent]}44 50%, transparent 100%)`,
        }}
      />
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: '#71717A',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}
