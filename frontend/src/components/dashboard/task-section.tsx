import {
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import type { Task } from '@/lib/api';
import {
  filters,
  formatDate,
  isOverdue,
  priorityLabel,
  priorityStyles,
  safePriority,
  type DashboardCounts,
  type Filter,
} from './shared';

type TaskSectionProps = {
  tasks: Task[];
  visible: Task[];
  loading: boolean;
  search: string;
  setSearch: (search: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  counts: DashboardCounts;
  openCreate: () => void;
  toggleTask: (task: Task) => Promise<void>;
  openEdit: (task: Task) => void;
  menuId: string | null;
  setMenuId: (id: string | null) => void;
  setDeleting: (task: Task | null) => void;
};

export function TaskSection({
  tasks,
  visible,
  loading,
  search,
  setSearch,
  filter,
  setFilter,
  counts,
  openCreate,
  toggleTask,
  openEdit,
  menuId,
  setMenuId,
  setDeleting,
}: TaskSectionProps) {
  return (
    <section
      id="tasks"
      className="mt-10 overflow-visible rounded-2xl border border-[#EDF0F5] bg-white shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-slate-100 px-7 py-6">
        <div>
          <h2 className="text-xl font-bold">My tasks</h2>
          <p className="mt-1 text-sm text-muted">Stay on top of everything on your list.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className="h-10 w-64 rounded-xl border border-slate-200 pl-10 pr-3 text-sm placeholder:text-slate-400"
            />
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500">
            <SlidersHorizontal size={17} />
          </span>
        </div>
      </div>
      <div className="flex gap-7 overflow-x-auto border-b border-slate-100 px-7">
        {filters.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`whitespace-nowrap border-b-2 py-4 text-sm font-semibold ${filter === item.id ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-ink'}`}
          >
            {item.label}
            {item.id === 'all' && (
              <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                {counts.total}
              </span>
            )}
          </button>
        ))}
      </div>
      {loading ? (
        <div
          className="space-y-4 p-7"
          aria-label="Loading tasks"
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-20 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="px-7 py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-blue-50 text-primary">
            <ClipboardList size={29} />
          </div>
          <h3 className="mt-5 text-lg font-bold">
            {tasks.length === 0 ? 'Your task list is ready' : 'No matching tasks'}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
            {tasks.length === 0
              ? 'Add your first task and start making progress today.'
              : 'Try another search or choose a different view.'}
          </p>
          {tasks.length === 0 ? (
            <button
              onClick={openCreate}
              className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              Add your first task
            </button>
          ) : (
            <button
              onClick={() => {
                setSearch('');
                setFilter('all');
              }}
              className="mt-5 text-sm font-bold text-primary"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {visible.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-4 px-7 py-5 hover:bg-[#FAFBFE]"
            >
              <button
                onClick={() => void toggleTask(task)}
                title={task.status === 'active' ? 'Mark complete' : 'Mark active'}
                aria-label={
                  task.status === 'active'
                    ? `Mark ${task.title} complete`
                    : `Mark ${task.title} active`
                }
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${task.status === 'completed' ? 'border-primary bg-primary text-white' : 'border-slate-300 text-transparent hover:border-primary'}`}
              >
                <Check
                  size={12}
                  strokeWidth={3}
                />
              </button>
              <div className="min-w-0 flex-1">
                <button
                  onClick={() => openEdit(task)}
                  className={`block max-w-full truncate text-left text-sm font-semibold hover:text-primary ${task.status === 'completed' ? 'text-slate-400 line-through' : ''}`}
                >
                  {task.title}
                </button>
                <p className="mt-1 truncate text-xs text-muted">
                  {task.description || 'No description added'}
                </p>
              </div>
              <span
                className={`hidden rounded-lg px-3 py-1.5 text-xs font-bold sm:inline-flex ${priorityStyles[safePriority(task.priority)]}`}
              >
                {priorityLabel(task.priority)}
              </span>
              <div
                className={`hidden w-32 items-center gap-1.5 text-xs md:flex ${isOverdue(task) ? 'font-semibold text-rose-600' : 'text-muted'}`}
              >
                <CalendarDays size={14} />
                {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
              </div>
              <span
                className={`hidden w-24 items-center justify-center rounded-full px-2 py-1.5 text-xs font-semibold lg:inline-flex ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}
              >
                {task.status === 'completed' ? 'Completed' : 'Active'}
              </span>
              <div className="relative">
                <button
                  onClick={() => setMenuId(menuId === task.id ? null : task.id)}
                  aria-label={`Actions for ${task.title}`}
                  aria-expanded={menuId === task.id}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-ink"
                >
                  <MoreHorizontal size={20} />
                </button>
                {menuId === task.id && (
                  <>
                    <button
                      className="fixed inset-0 z-10 cursor-default"
                      aria-label="Close menu"
                      onClick={() => setMenuId(null)}
                    />
                    <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl">
                      <button
                        onClick={() => openEdit(task)}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
                      >
                        Edit task
                      </button>
                      <button
                        onClick={() => {
                          setMenuId(null);
                          setDeleting(task);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 size={14} /> Delete task
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between border-t border-slate-100 px-7 py-4 text-xs text-muted">
        <span>
          Showing {visible.length} of {tasks.length} tasks
        </span>
        <span className="flex items-center gap-1">
          {filter === 'all' ? 'All tasks' : filters.find((f) => f.id === filter)?.label}
          <ChevronDown size={13} />
        </span>
      </div>
    </section>
  );
}
