'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { Brand } from './brand';
import { api, AuthResult, session } from '@/lib/api';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const isRegister = mode === 'register';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (isRegister && name.trim().length < 2)
      return setError('Please enter a name with at least 2 characters.');
    if (isRegister && password.length < 8)
      return setError('Password must be at least 8 characters.');
    setPending(true);
    try {
      const result = await api<AuthResult>(`/auth/${mode}`, {
        method: 'POST',
        body: JSON.stringify(
          isRegister ? { name: name.trim(), email, password } : { email, password },
        ),
      });
      session.set(result.token);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[1fr_1fr]">
      <div className="flex min-h-screen flex-col px-8 py-8 sm:px-16 lg:px-20">
        <Brand />
        <div className="mx-auto flex w-full max-w-[410px] flex-1 flex-col justify-center py-12">
          <div className="mb-9">
            <div className="mb-5 inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-primary">
              {isRegister ? 'CREATE YOUR ACCOUNT' : 'WELCOME BACK'}
            </div>
            <h1 className="text-4xl font-bold tracking-[-.04em]">
              {isRegister ? 'Start your journey.' : 'Good to see you again.'}
            </h1>
            <p className="mt-3 leading-7 text-muted">
              {isRegister
                ? 'A more organized day is just a few steps away.'
                : 'Pick up where you left off and keep your day moving.'}
            </p>
          </div>
          <form
            onSubmit={submit}
            className="space-y-5"
          >
            {isRegister && (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Full name</span>
                <span className="relative block">
                  <UserRound
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm placeholder:text-slate-400"
                  />
                </span>
              </label>
            )}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Email address</span>
              <span className="relative block">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm placeholder:text-slate-400"
                />
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Password</span>
              <span className="relative block">
                <LockKeyhole
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  required
                  type={visible ? 'text' : 'password'}
                  minLength={isRegister ? 8 : undefined}
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRegister ? 'At least 8 characters' : 'Enter your password'}
                  className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-12 text-sm placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
                >
                  {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}
            <button
              disabled={pending}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-white shadow-[0_8px_18px_rgba(37,99,235,.2)] hover:bg-blue-700"
            >
              {pending ? 'Please wait...' : isRegister ? 'Create account' : 'Log in'}{' '}
              {!pending && <ArrowRight size={17} />}
            </button>
          </form>
          <p className="mt-7 text-center text-sm text-muted">
            {isRegister ? 'Already have an account?' : 'New to Daymark?'}{' '}
            <Link
              href={isRegister ? '/login' : '/register'}
              className="font-bold text-primary hover:underline"
            >
              {isRegister ? 'Log in' : 'Create an account'}
            </Link>
          </p>
        </div>
        <p className="text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Daymark. Make every day count.
        </p>
      </div>
      <div className="relative hidden min-h-screen items-center justify-center overflow-hidden bg-[#EFF5FF] p-16 lg:flex">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="relative w-full max-w-[480px]">
          <div className="rounded-[24px] border border-white bg-white p-7 shadow-[0_30px_80px_rgba(35,78,150,.13)]">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[.15em] text-muted">
                  MY DAY
                </div>
                <div className="mt-2 text-2xl font-bold">A fresh start, every day.</div>
              </div>
              <div className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-primary">
                Today
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: 'Set today’s priorities',
                  tag: 'High priority',
                  color: 'bg-red-50 text-red-600',
                },
                {
                  title: 'Take the next small step',
                  tag: 'In progress',
                  color: 'bg-blue-50 text-primary',
                },
                {
                  title: 'Celebrate your progress',
                  tag: 'Completed',
                  color: 'bg-emerald-50 text-emerald-600',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"
                >
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border-2 ${index === 2 ? 'border-primary bg-primary text-white' : 'border-slate-300'}`}
                  >
                    {index === 2 ? '✓' : ''}
                  </span>
                  <div className="min-w-0 flex-1 font-semibold">{item.title}</div>
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${item.color}`}>
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-xl bg-blue-50 px-5 py-4">
              <div className="flex justify-between text-sm font-semibold">
                <span>Daily progress</span>
                <span className="text-primary">72%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-blue-100">
                <div className="h-2 w-[72%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-2xl font-bold tracking-tight">Small steps. Big momentum.</p>
            <p className="mt-3 text-muted">Your best work starts with a clear plan.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
