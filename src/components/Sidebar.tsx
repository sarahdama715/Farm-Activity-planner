'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: '🏠 Dashboard' },
  { href: '/generate-plan', label: '📋 Generate Plan' },
  { href: '/resource-allocation', label: '📊 Resource Allocation' },
  { href: '/crop-management', label: '🌿 Crop Management' },
  { href: '/settings', label: '⚙️ Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-green-700 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-green-600">
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
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-600 font-semibold'
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
        <p>© 2024 Farm Activity Planner</p>
      </div>
    </aside>
  );
}
