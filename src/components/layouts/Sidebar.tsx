'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderKanban,
  CheckSquare,
  Receipt,
  CreditCard,
  TrendingDown,
  BarChart3,
  ScrollText,
  Settings,
  ShieldCheck,
  UserCheck,
  User,
  LogOut,
  Layers,
  Bell,
  ExternalLink,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNav } from '@/lib/nav/NavContext';
import { Logo } from '@/components/branding/Logo';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { role, user, loginAs, logout } = useAuth();
  const { isMobileSidebarOpen, closeMobileSidebar } = useNav();

  const adminNav = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Clients CRM', href: '/admin/clients', icon: Users },
    { name: 'Workers & Team', href: '/admin/workers', icon: UserCheck },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Tasks Board', href: '/admin/tasks', icon: CheckSquare },
    { name: 'Notice Board', href: '/worker/notices', icon: Bell },
    { name: 'Staging Sandbox', href: '/staging/apollo-retail', icon: ExternalLink },
    { name: 'Services Catalog', href: '/admin/services', icon: Layers },
    { name: 'Invoices', href: '/admin/invoices', icon: Receipt },
    { name: 'Expenses', href: '/admin/expenses', icon: TrendingDown },
    { name: 'Financial Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Activity Logs', href: '/admin/activity', icon: ScrollText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const workerNav = [
    { name: 'My Dashboard', href: '/worker/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', href: '/worker/projects', icon: FolderKanban },
    { name: 'Tasks & Sprints', href: '/worker/tasks', icon: CheckSquare },
    { name: 'Notice Board', href: '/worker/notices', icon: Bell },
    { name: 'Staging Sandbox', href: '/staging/apollo-retail', icon: ExternalLink },
  ];

  const clientNav = [
    { name: 'Client Portal', href: '/client/dashboard', icon: LayoutDashboard },
    { name: 'My Websites & Apps', href: '/client/projects', icon: FolderKanban },
    { name: 'Invoices & Receipts', href: '/client/invoices', icon: Receipt },
    { name: 'Official Notices', href: '/client/notices', icon: Bell },
    { name: 'Live Staging Sandbox', href: '/staging/apollo-retail', icon: ExternalLink },
  ];

  const navItems = role === 'CLIENT' ? clientNav : role === 'WORKER' ? workerNav : adminNav;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <Link href="/" className="block">
          <Logo size="sm" />
        </Link>
        {/* Mobile close button */}
        <button
          onClick={closeMobileSidebar}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          title="Close Navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Switcher Pill Bar (Demo / Live Utility) */}
      <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800/80">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
          <span>Active Interface</span>
          <span className="text-cyan-400 font-mono">{role}</span>
        </div>
        <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => loginAs('SUPER_ADMIN')}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg transition ${
              role === 'SUPER_ADMIN' || role === 'ADMIN'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => loginAs('WORKER')}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg transition ${
              role === 'WORKER'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Worker
          </button>
          <button
            onClick={() => loginAs('CLIENT')}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg transition ${
              role === 'CLIENT'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Client
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center justify-between">
          <span>{role === 'CLIENT' ? 'Client Workspace' : role === 'WORKER' ? 'Worker Station' : 'Executive Management'}</span>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileSidebar}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-800/40 border border-slate-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.fullName || 'User'}</div>
              <div className="text-[10px] text-slate-400 truncate">{user?.email || 'user@upwebtech.com'}</div>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log Out / Reset"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 shrink-0 flex-col z-30">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Sliding Drawer (Three-line hamburger destination) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-72 h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
