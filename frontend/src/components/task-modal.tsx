'use client';

import { FormEvent, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Priority, Status, Task, TaskInput } from '@/lib/api';

export function TaskModal({
  task,
  onClose,
  onSave,
  saving,
  error,
}: {
  task: Task | null;
  onClose: () => void;
  onSave: (input: TaskInput) => Promise<void>;
  saving: boolean;
  error: string;
}) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'medium');
  const [status, setStatus] = useState<Status>(task?.status || 'active');
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await onSave({
      title: title.trim(),
      description: description.trim() || null,
      dueDate: dueDate || null,
      priority,
      status,
    });
  }
  const input =
    'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400';
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213D]/45 p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-dialog-title"
        className="w-full max-w-[560px] rounded-[24px] bg-white p-7 shadow-2xl"
      >
        <div className="mb-7 flex items-start justify-between">
          <div>
            <h2
              id="task-dialog-title"
              className="text-2xl font-bold"
            >
              {task ? 'Edit task' : 'Create a task'}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {task ? 'Update the details below.' : 'Add something important to your list.'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-muted hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={submit}
          className="space-y-5"
        >
          <label className="block text-sm font-semibold">
            Task title <span className="text-red-500">*</span>
            <input
              autoFocus
              required
              maxLength={160}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to get done?"
              className={input}
            />
          </label>
          <label className="block text-sm font-semibold">
            Description <span className="font-normal text-muted">(optional)</span>
            <textarea
              rows={3}
              maxLength={2000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a few details..."
              className={`${input} resize-none`}
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-sm font-semibold">
              Due date
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={input}
              />
            </label>
            <label className="block text-sm font-semibold">
              Priority
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className={input}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          <label className="block text-sm font-semibold">
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className={input}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          {error && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              disabled={saving}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {saving ? 'Saving...' : task ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
