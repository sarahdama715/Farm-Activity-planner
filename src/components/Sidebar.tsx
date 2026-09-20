'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useApp } from './AppProvider';

const navItems = [
  { href: '/', label: '🏠 Dashboard' },
  { href: '/generate-plan', label: '📋 Generate Plan' },
  { href: '/resource-allocation', label: '📊 Resource Allocation' },
  { href: '/crop-management', label: '🌿 Crop Management' },
  { href: '/settings', label: '⚙️ Settings' },
];

export default function Sidebar() {
  const { farmer, logout } = useApp();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-green-700 text-white p-4 flex justify-between items-center z-50">
        <h1 className="text-lg font-bold">🌾 Farm Planner</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:static top-16 md:top-0 left-0 w-64 h-screen md:h-auto bg-green-700 text-white flex flex-col transition-transform duration-300 z-40 md:z-0`}
      >
        <div className="px-6 pt-4 text-sm text-green-100">{farmer?.name} · {farmer?.country}</div>
        {/* Header - Desktop Only */}
        <div className="hidden md:block p-6 border-b border-green-600">
          <h1 className="text-2xl font-bold">🌾 Farm Planner</h1>
          <p className="text-green-100 text-sm mt-1">AI-Powered Activity Planning</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-700 font-semibold'
                        : 'hover:bg-green-600 text-green-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-green-600 text-sm text-green-100">
          <button onClick={logout} className="mb-2 font-semibold underline">Log out</button>
          <p>© 2024 Farm Activity Planner</p>
        </div>
      </aside>
    </>
  );
}
