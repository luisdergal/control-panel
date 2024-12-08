import './globals.css';

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Control Panel',
  description: 'Control Panel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white min-h-screen flex">
        <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4">
          <nav className="flex flex-col gap-4">
            <Link href="/">Index</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/users">Users</Link>
            <Link href="/regions">Regions</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </aside>
        
        <main className="flex-1 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}