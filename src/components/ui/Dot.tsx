interface DotProps {
  color?: 'green' | 'amber' | 'red';
}

const colorMap = {
  green: '#22C55E',
  amber: '#F59E0B',
  red:   '#EF4444',
};

export function Dot({ color = 'green' }: DotProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: colorMap[color],
        flexShrink: 0,
      }}
    />
  );
}
