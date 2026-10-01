import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  LayoutDashboard,
  ListTodo,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react';
import { Brand } from '@/components/brand';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFD]">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Brand />
        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_7px_16px_rgba(37,99,235,.18)] hover:bg-blue-700"
          >
            Get started{' '}
            <ArrowRight
              className="ml-1 inline"
              size={15}
            />
          </Link>
        </nav>
      </header>
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-8 pb-24 pt-20 lg:grid-cols-[.95fr_1.05fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-primary">
            <Sparkles size={14} /> A clearer way to get things done
          </div>
          <h1 className="max-w-xl text-6xl font-bold leading-[1.08] tracking-[-.055em] text-ink">
            Make every day <span className="text-primary">count.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-muted">
            A simple home for everything you need to do. Plan your priorities, stay on track, and
            enjoy the feeling of progress.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 font-semibold text-white shadow-[0_14px_25px_rgba(37,99,235,.2)] hover:bg-blue-700"
            >
              Start planning for free <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-ink hover:border-blue-200"
            >
              Log in
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-3 text-sm text-slate-500">
            <div className="flex -space-x-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-amber-100 font-bold text-amber-700">
                A
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-purple-100 font-bold text-purple-700">
                M
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-blue-100 font-bold text-blue-700">
                J
              </span>
            </div>
            <span>Less clutter. More momentum.</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-10 left-0 h-48 w-48 rounded-full bg-indigo-100/70 blur-3xl" />
          <div className="relative overflow-hidden rounded-[26px] border border-slate-100 bg-white p-6 shadow-[0_28px_80px_rgba(34,59,105,.13)]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-muted">
                  Your workspace
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Good morning, Alex <span className="text-amber-400">✳</span>
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Here’s what’s happening with your tasks today.
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-primary">
                <LayoutDashboard size={21} />
              </span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                {
                  label: 'Total tasks',
                  value: '12',
                  icon: ListTodo,
                  shade: 'bg-blue-50 text-blue-600',
                },
                {
                  label: 'In progress',
                  value: '05',
                  icon: Circle,
                  shade: 'bg-amber-50 text-amber-600',
                },
                {
                  label: 'Completed',
                  value: '07',
                  icon: CheckCircle2,
                  shade: 'bg-emerald-50 text-emerald-600',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-100 p-4"
                >
                  <span className={`mb-4 grid h-9 w-9 place-items-center rounded-lg ${item.shade}`}>
                    <item.icon size={18} />
                  </span>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="mt-1 text-xs text-muted">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between">
              <h3 className="font-bold">Today’s priorities</h3>
              <span className="text-xs font-semibold text-primary">View all</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                {
                  title: 'Finalize project proposal',
                  sub: 'Due today · Work',
                  priority: 'High',
                  color: 'bg-red-50 text-red-600',
                  done: false,
                },
                {
                  title: 'Review design feedback',
                  sub: 'Due tomorrow · Design',
                  priority: 'Medium',
                  color: 'bg-amber-50 text-amber-700',
                  done: false,
                },
                {
                  title: 'Plan next week’s goals',
                  sub: 'Completed · Personal',
                  priority: 'Low',
                  color: 'bg-emerald-50 text-emerald-700',
                  done: true,
                },
              ].map((t) => (
                <div
                  key={t.title}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5"
                >
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border ${t.done ? 'border-primary bg-primary text-white' : 'border-slate-300'}`}
                  >
                    {t.done && <Check size={12} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-semibold ${t.done ? 'text-slate-400 line-through' : ''}`}
                    >
                      {t.title}
                    </p>
                    <p className="mt-1 text-xs text-muted">{t.sub}</p>
                  </div>
                  <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${t.color}`}>
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-12 max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[.15em] text-primary">
              Everything in its place
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              A little structure goes a long way.
            </h2>
            <p className="mt-4 text-muted">
              Keep your focus on the work that matters, with the tools you need and none of the
              noise.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ListTodo,
                title: 'Organize your tasks',
                text: 'Capture the details, set due dates, and keep your to-do list in one easy place.',
              },
              {
                icon: Target,
                title: 'Focus on priorities',
                text: 'See what needs attention with clear priority labels and a simple daily view.',
              },
              {
                icon: ShieldCheck,
                title: 'Your space, your progress',
                text: 'Your account keeps your tasks private and ready whenever you return.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-100 bg-[#FAFBFE] p-7"
              >
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-primary">
                  <f.icon size={23} />
                </div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-3 leading-7 text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl items-center justify-between px-8 py-8 text-sm text-muted">
        <Brand />
        <span>Make room for what matters.</span>
      </footer>
    </main>
  );
}
