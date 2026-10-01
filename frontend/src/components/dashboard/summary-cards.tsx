import { AlertCircle, CheckCircle2, Circle, ClipboardList } from 'lucide-react';
import type { DashboardCounts } from './shared';

type SummaryCardsProps = {
  counts: DashboardCounts;
  loading: boolean;
};

export function SummaryCards({ counts, loading }: SummaryCardsProps) {
  return (
    <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {[
        {
          label: 'Total tasks',
          count: counts.total,
          icon: ClipboardList,
          theme: 'bg-blue-50 text-blue-600',
          bar: 'bg-blue-500',
          caption: 'All your tasks',
        },
        {
          label: 'Active tasks',
          count: counts.active,
          icon: Circle,
          theme: 'bg-amber-50 text-amber-600',
          bar: 'bg-amber-500',
          caption: 'Still in progress',
        },
        {
          label: 'Completed',
          count: counts.completed,
          icon: CheckCircle2,
          theme: 'bg-emerald-50 text-emerald-600',
          bar: 'bg-emerald-500',
          caption: 'Great work so far',
        },
        {
          label: 'Overdue',
          count: counts.overdue,
          icon: AlertCircle,
          theme: 'bg-rose-50 text-rose-600',
          bar: 'bg-rose-500',
          caption: 'Need your attention',
        },
      ].map((card) => (
        <div
          key={card.label}
          className="relative overflow-hidden rounded-2xl border border-[#EDF0F5] bg-white p-6 shadow-card"
        >
          <div className={`absolute left-0 top-0 h-full w-1 ${card.bar}`} />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted">{card.label}</p>
              <p className="mt-4 text-[34px] font-bold leading-none tracking-tight">
                {loading ? '—' : String(card.count).padStart(2, '0')}
              </p>
            </div>
            <div className={`grid h-11 w-11 place-items-center rounded-xl ${card.theme}`}>
              <card.icon size={21} />
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-400">{card.caption}</p>
        </div>
      ))}
    </div>
  );
}
