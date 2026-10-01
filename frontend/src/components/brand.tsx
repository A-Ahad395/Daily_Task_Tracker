import Link from 'next/link';
import { Check } from 'lucide-react';

export function Brand({ href = '/' }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 font-bold tracking-tight text-ink"
      aria-label="Daymark home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-[0_5px_12px_rgba(37,99,235,.23)]">
        <Check
          size={21}
          strokeWidth={3}
        />
      </span>
      <span className="text-[21px]">
        daymark<span className="text-primary">.</span>
      </span>
    </Link>
  );
}
