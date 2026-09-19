'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Farmer = { name: string; email: string; country: string };
export type FarmPlan = { id: string; crop: string; acres: number; workers: number; location: string; country: string; region: string; city: string; plantingDate: string; resources: string; weather: string; status: 'Planned' | 'Planted' | 'Weeded' | 'Fertilized' | 'Harvested'; createdAt: string };
type AppContextValue = { farmer: Farmer | null; plans: FarmPlan[]; login: (email: string, password: string) => boolean; register: (farmer: Farmer, password: string) => void; logout: () => void; addPlan: (plan: FarmPlan) => void; updatePlanStatus: (id: string, status: FarmPlan['status']) => void };
const AppContext = createContext<AppContextValue | null>(null);
const USERS_KEY = 'farm-planner-users'; const SESSION_KEY = 'farm-planner-session'; const PLANS_KEY = 'farm-planner-plans'; const IDLE_MS = 10 * 60 * 1000;

function AuthScreen({ onLogin, onRegister }: { onLogin: AppContextValue['login']; onRegister: AppContextValue['register'] }) {
  const [mode, setMode] = useState<'login' | 'register'>('login'); const [message, setMessage] = useState('');
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const email = String(form.get('email') || '').trim().toLowerCase(); const password = String(form.get('password') || ''); if (mode === 'login') { if (!onLogin(email, password)) setMessage('We could not find an account with those details.'); return; } onRegister({ name: String(form.get('name') || '').trim(), email, country: String(form.get('country') || '') }, password); }
  return <main className="min-h-screen grid place-items-center p-6 bg-green-50"><section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"><p className="text-3xl">Farm planner</p><h1 className="mt-2 text-3xl font-bold text-gray-900">Farm Activity Planner</h1><p className="mt-2 text-gray-600">{mode === 'login' ? 'Welcome back to your farm.' : 'Create your farmer account.'}</p><form onSubmit={submit} className="mt-6 space-y-4">{mode === 'register' && <><label className="block text-sm font-medium text-gray-800">Your name<input required name="name" className="mt-1 w-full rounded-lg border p-2 text-gray-900" /></label><label className="block text-sm font-medium text-gray-800">Country<select required name="country" className="mt-1 w-full rounded-lg border p-2 text-gray-900" defaultValue=""><option value="" disabled>Select your country</option><option>Kenya</option><option>Uganda</option><option>Tanzania</option><option>Nigeria</option><option>South Africa</option><option>India</option><option>United States</option><option>United Kingdom</option><option>Other</option></select></label></>}<label className="block text-sm font-medium text-gray-800">Email<input required type="email" name="email" className="mt-1 w-full rounded-lg border p-2 text-gray-900" /></label><label className="block text-sm font-medium text-gray-800">Password<input required minLength={4} type="password" name="password" className="mt-1 w-full rounded-lg border p-2 text-gray-900" /></label>{message && <p className="text-sm text-red-600">{message}</p>}<button className="w-full rounded-lg bg-green-700 py-2 font-semibold text-white hover:bg-green-800">{mode === 'login' ? 'Log in' : 'Create account'}</button></form><button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage(''); }} className="mt-5 text-sm font-medium text-green-700">{mode === 'login' ? 'New farmer? Create an account' : 'Already have an account? Log in'}</button></section></main>;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [farmer, setFarmer] = useState<Farmer | null>(null); const [plans, setPlans] = useState<FarmPlan[]>([]); const [loaded, setLoaded] = useState(false);
  useEffect(() => { setFarmer(JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')); setPlans(JSON.parse(localStorage.getItem(PLANS_KEY) || '[]')); setLoaded(true); }, []);
  const logout = useCallback(() => { localStorage.removeItem(SESSION_KEY); setFarmer(null); }, []);
  useEffect(() => { if (!farmer) return; let timer: ReturnType<typeof setTimeout>; const reset = () => { clearTimeout(timer); timer = setTimeout(logout, IDLE_MS); }; const events = ['pointerdown', 'keydown', 'scroll', 'touchstart']; events.forEach((event) => window.addEventListener(event, reset)); reset(); return () => { clearTimeout(timer); events.forEach((event) => window.removeEventListener(event, reset)); }; }, [farmer, logout]);
  const value = useMemo<AppContextValue>(() => ({ farmer, plans, login: (email, password) => { const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); const user = users.find((item: Farmer & { password: string }) => item.email === email && item.password === password); if (!user) return false; const next = { name: user.name, email: user.email, country: user.country }; localStorage.setItem(SESSION_KEY, JSON.stringify(next)); setFarmer(next); return true; }, register: (next, password) => { const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); const existing = users.filter((item: Farmer) => item.email !== next.email); localStorage.setItem(USERS_KEY, JSON.stringify([...existing, { ...next, password }])); localStorage.setItem(SESSION_KEY, JSON.stringify(next)); setFarmer(next); }, logout, addPlan: (plan) => { const next = [plan, ...plans]; localStorage.setItem(PLANS_KEY, JSON.stringify(next)); setPlans(next); }, updatePlanStatus: (id, status) => { const next = plans.map((plan) => plan.id === id ? { ...plan, status } : plan); localStorage.setItem(PLANS_KEY, JSON.stringify(next)); setPlans(next); } }), [farmer, plans, logout]);
  if (!loaded) return null;

return (
  <AppContext.Provider value={value}>
    {!farmer ? (
      <AuthScreen onLogin={value.login} onRegister={value.register} />
    ) : (
      children
    )}
  </AppContext.Provider>
);
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }

  return context;
}
