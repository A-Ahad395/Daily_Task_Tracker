import type { Priority, Task } from '@/lib/api';

export type Filter = 'all' | 'active' | 'completed' | 'overdue';

export type DashboardCounts = {
  total: number;
  active: number;
  completed: number;
  overdue: number;
};

export const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All tasks' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'overdue', label: 'Overdue' },
];

export const priorityStyles = {
  low: 'bg-emerald-50 text-emerald-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-rose-50 text-rose-700',
};

export const safePriority = (value: unknown): Priority =>
  value === 'low' || value === 'medium' || value === 'high' ? value : 'medium';

export const priorityLabel = (value: unknown) => {
  const priority = safePriority(value);
  return priority[0].toUpperCase() + priority.slice(1);
};

export const formatDate = (value: string) =>
  new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const isOverdue = (task: Task) =>
  task.status === 'active' && !!task.dueDate && task.dueDate.slice(0, 10) < today();
