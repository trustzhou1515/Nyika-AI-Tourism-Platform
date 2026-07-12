interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="metric">
      <b>{value}</b>
      <span className="muted">{label}</span>
    </div>
  );
}
