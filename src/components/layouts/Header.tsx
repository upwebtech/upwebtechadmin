'use client';

import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  FileSpreadsheet,
  Download,
  Database,
  CheckCircle2,
  Menu,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNav } from '@/lib/nav/NavContext';
import { ExcelImportModal } from '@/components/excel/ExcelImportModal';
import { exportFinancialReport } from '@/lib/excel/excelService';
import { store } from '@/lib/db/store';

interface HeaderProps {
  onNewProject?: () => void;
  onNewClient?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewProject, onNewClient }) => {
  const { role, user } = useAuth();
  const { toggleMobileSidebar } = useNav();
  const [isExcelOpen, setIsExcelOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { title: 'New Task Review', desc: 'Amit submitted WebSocket route for Nexa Fleet', time: '10m ago' },
    { title: 'Payment Received', desc: '₹40,120 received for Apollo Supermarket', time: '1h ago' },
    { title: 'Deadline Approaching', desc: 'Zenith Grand Suite Mockup due in 4 days', time: '3h ago' },
  ];

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
        {/* Left: 3-line hamburger button (Mobile / Tablet) + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          {/* Three-line hamburger button */}
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0"
            aria-label="Toggle Side Panel"
            title="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search clients, projects, tasks, invoices..."
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition"
            />
          </div>
        </div>

        {/* Actions & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Database indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>DB: <strong className="text-slate-200">PostgreSQL</strong></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          {/* Admin-only quick actions */}
          {(role === 'SUPER_ADMIN' || role === 'ADMIN') && (
            <>
              <button
                onClick={() => setIsExcelOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                title="Import Excel spreadsheet"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Import Excel</span>
              </button>

              <button
                onClick={() => exportFinancialReport(store.invoices, store.expenses)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                title="Export monthly financial report"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export Report</span>
              </button>

              {onNewProject && (
                <button
                  onClick={onNewProject}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Project</span>
                </button>
              )}
            </>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 relative transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-4 space-y-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white">Agency Notifications</span>
                  <span className="text-[10px] text-cyan-400 font-semibold">3 Unread</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-[11px]">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Excel Import Modal */}
      <ExcelImportModal isOpen={isExcelOpen} onClose={() => setIsExcelOpen(false)} />
    </>
  );
};
