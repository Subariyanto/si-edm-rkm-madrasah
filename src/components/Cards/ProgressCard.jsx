export default function ProgressCard({ title, current, max, label, color = 'primary', className }) {
  const pct = max > 0 ? Math.round((current / max) * 100) : 0;
  const barColors = {
    primary: 'bg-primary-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };
  const barColor = barColors[color] || barColors.primary;

  return (
    <div className={`card ${className || ''}`}>
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <span className="text-sm font-bold">{pct}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      {label && <p className="text-xs text-gray-400 mt-1">{label}</p>}
    </div>
  );
}