'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Trash2, X } from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { TaskSection } from '@/components/dashboard/task-section';
import { isOverdue, type Filter } from '@/components/dashboard/shared';
import { TaskModal } from '@/components/task-modal';
import { api, session, type Task, type TaskInput, type User } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Task | null>(null);

  const load = useCallback(async () => {
    if (!session.get()) {
      router.replace('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const [me, items] = await Promise.all([api<User>('/auth/me'), api<Task[]>('/tasks')]);
      setUser(me);
      setTasks(items);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not load your tasks.';
      if (
        message.toLowerCase().includes('session') ||
        message.toLowerCase().includes('unauthorized')
      ) {
        session.clear();
        router.replace('/login');
        return;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [router]);
  useEffect(() => {
    void load();
  }, [load]);

  const counts = useMemo(
    () => ({
      total: tasks.length,
      active: tasks.filter((t) => t.status === 'active').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      overdue: tasks.filter(isOverdue).length,
    }),
    [tasks],
  );
  const visible = useMemo(
    () =>
      tasks.filter(
        (t) =>
          (filter === 'all' || (filter === 'overdue' ? isOverdue(t) : t.status === filter)) &&
          `${t.title} ${t.description || ''}`.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [tasks, filter, search],
  );
  const firstName = user?.name.split(' ')[0] || 'there';
  const greeting =
    new Date().getHours() < 12
      ? 'Good morning'
      : new Date().getHours() < 17
        ? 'Good afternoon'
        : 'Good evening';

  function logout() {
    session.clear();
    router.replace('/login');
  }
  function openCreate() {
    setEditing(null);
    setActionError('');
    setModalOpen(true);
  }
  function openEdit(task: Task) {
    setEditing(task);
    setMenuId(null);
    setActionError('');
    setModalOpen(true);
  }
  async function saveTask(input: TaskInput) {
    setSaving(true);
    setActionError('');
    try {
      const saved = await api<Task>(editing ? `/tasks/${editing.id}` : '/tasks', {
        method: editing ? 'PATCH' : 'POST',
        body: JSON.stringify(input),
      });
      setTasks((current) =>
        editing
          ? current.map((t) => (t.id === saved.id ? { ...t, ...saved } : t))
          : [saved, ...current],
      );
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not save task.');
    } finally {
      setSaving(false);
    }
  }
  async function toggleTask(task: Task) {
    setMenuId(null);
    setActionError('');
    try {
      const saved = await api<Task>(`/tasks/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: task.status === 'active' ? 'completed' : 'active' }),
      });
      setTasks((current) => current.map((t) => (t.id === saved.id ? { ...t, ...saved } : t)));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not update task.');
    }
  }
  async function deleteTask() {
    if (!deleting) return;
    setSaving(true);
    setActionError('');
    try {
      await api(`/tasks/${deleting.id}`, { method: 'DELETE' });
      setTasks((current) => current.filter((t) => t.id !== deleting.id));
      setDeleting(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Could not delete task.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-canvas lg:flex">
      <DashboardSidebar
        filter={filter}
        counts={counts}
        setFilter={setFilter}
        openCreate={openCreate}
        logout={logout}
      />
      <div className="min-w-0 flex-1">
        <header className="flex h-[82px] items-center justify-between border-b border-[#E9EDF4] bg-white px-8 lg:px-12">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-right sm:block">
              <span className="block text-sm font-semibold">{user?.name || 'My account'}</span>
              <span className="block text-xs text-muted">My workspace</span>
            </span>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-100 text-sm font-bold text-primary">
              {user?.name?.slice(0, 1).toUpperCase() || '?'}
            </div>
            <button
              onClick={logout}
              title="Log out"
              aria-label="Log out"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <LogOut size={19} />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1450px] px-8 pb-16 pt-10 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-primary">
                YOUR DASHBOARD
              </p>
              <h1 className="text-[32px] font-bold tracking-[-.04em] lg:text-[36px]">
                {greeting}, {firstName} <span className="text-amber-400">✳</span>
              </h1>
              <p className="mt-2 text-sm text-muted">
                Here’s an overview of your tasks. Let’s make today productive.
              </p>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,.18)] hover:bg-blue-700"
            >
              <Plus size={18} /> Add new task
            </button>
          </div>
          {error && (
            <div
              role="alert"
              className="mt-7 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
            >
              <span>{error}</span>
              <button
                onClick={() => void load()}
                className="font-bold underline"
              >
                Retry
              </button>
            </div>
          )}
          {actionError && !modalOpen && (
            <div
              role="alert"
              className="mt-7 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700"
            >
              <span>{actionError}</span>
              <button
                aria-label="Dismiss error"
                onClick={() => setActionError('')}
              >
                <X size={16} />
              </button>
            </div>
          )}
          <SummaryCards
            counts={counts}
            loading={loading}
          />
          <TaskSection
            tasks={tasks}
            visible={visible}
            loading={loading}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            counts={counts}
            openCreate={openCreate}
            toggleTask={toggleTask}
            openEdit={openEdit}
            menuId={menuId}
            setMenuId={setMenuId}
            setDeleting={setDeleting}
          />
        </main>
      </div>
      {modalOpen && (
        <TaskModal
          task={editing}
          onClose={() => {
            setModalOpen(false);
            setActionError('');
          }}
          onSave={saveTask}
          saving={saving}
          error={actionError}
        />
      )}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213D]/45 p-5">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-rose-50 text-rose-600">
              <Trash2 size={22} />
            </div>
            <h2
              id="delete-title"
              className="text-xl font-bold"
            >
              Delete this task?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              “{deleting.title}” will be permanently removed from your list.
            </p>
            {actionError && (
              <p
                role="alert"
                className="mt-4 text-sm text-rose-600"
              >
                {actionError}
              </p>
            )}
            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleting(null);
                  setActionError('');
                }}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={() => void deleteTask()}
                className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
              >
                {saving ? 'Deleting...' : 'Delete task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
