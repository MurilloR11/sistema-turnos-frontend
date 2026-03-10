import type { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
}

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <div className="info-card">
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: '#71717A',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
