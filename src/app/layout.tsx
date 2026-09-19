import type { Metadata } from 'next';

import Sidebar from '@/components/Sidebar';
import { AppProvider } from '@/components/AppProvider';
import './globals.css';



export const metadata: Metadata = {
  title: 'Farm Activity Planner',
  description: 'AI-powered farm activity planning and resource allocation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AppProvider>
          <div className="min-h-screen md:flex">
            <Sidebar />
            <main className="flex-1 p-5 pt-20 md:p-8">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
