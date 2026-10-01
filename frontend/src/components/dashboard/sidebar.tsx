import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Circle,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Brand } from '@/components/brand';
import type { DashboardCounts, Filter } from './shared';

type SidebarProps = {
  filter: Filter;
  counts: DashboardCounts;
  setFilter: (filter: Filter) => void;
  openCreate: () => void;
  logout: () => void;
};

export function DashboardSidebar({ filter, counts, setFilter, openCreate, logout }: SidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col border-r border-[#E9EDF4] bg-white px-5 py-7 lg:sticky lg:top-0 lg:h-screen lg:w-[246px]">
      <div className="px-3">
        <Brand href="/dashboard" />
      </div>
      <div className="mt-11 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">
        Workspace
      </div>
      <nav className="mt-4 space-y-1">
        <button
          onClick={() => setFilter('all')}
          className="flex w-full items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-left text-sm font-semibold text-primary"
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button
          onClick={() => {
            setFilter('all');
            document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-500 hover:bg-slate-50"
        >
          <ClipboardList size={18} /> My tasks
        </button>
      </nav>
      <div className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">
        Task views
      </div>
      <nav className="mt-4 space-y-1">
        {[
          { id: 'active' as const, label: 'Active tasks', icon: Circle },
          { id: 'completed' as const, label: 'Completed', icon: CheckCircle2 },
          { id: 'overdue' as const, label: 'Overdue', icon: AlertCircle },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setFilter(item.id);
              document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm ${filter === item.id ? 'bg-blue-50 font-semibold text-primary' : 'font-medium text-slate-500 hover:bg-slate-50'}`}
          >
            <span className="flex items-center gap-3">
              <item.icon size={18} />
              {item.label}
            </span>
            <span className="text-xs text-slate-400">{counts[item.id]}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto hidden rounded-2xl bg-[#EEF4FF] p-5 lg:block">
        <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-white text-primary">
          <Sparkles size={18} />
        </div>
        <p className="text-sm font-bold">Make progress today</p>
        <p className="mt-2 text-xs leading-5 text-muted">
          One completed task at a time. You’ve got this!
        </p>
        <button
          onClick={openCreate}
          className="mt-4 flex items-center gap-1 text-xs font-bold text-primary"
        >
          Add a task <ArrowRight size={13} />
        </button>
      </div>
      <button
        onClick={logout}
        className="mt-7 hidden items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-500 hover:bg-slate-50 lg:flex"
      >
        <LogOut size={18} /> Log out
      </button>
    </aside>
  );
}
