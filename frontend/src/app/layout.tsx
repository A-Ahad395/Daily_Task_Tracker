import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daymark | Daily Task Tracker',
  description: 'A calmer way to plan your day and make progress.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
