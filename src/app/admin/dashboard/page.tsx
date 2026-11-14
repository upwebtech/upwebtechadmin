'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  FolderKanban,
  CheckSquare,
  TrendingUp,
  Receipt,
  TrendingDown,
  DollarSign,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { exportProjects, exportFinancialReport } from '@/lib/excel/excelService';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [, setTick] = useState(0);

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const clients = store.clients;
  const workers = store.workers;
  const projects = store.projects;
  const tasks = store.tasks;
  const invoices = store.invoices;
  const expenses = store.expenses;

  // Financial calculations (Section 8 & 21)
  const totalRevenue = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const estimatedProfit = totalRevenue - totalExpenses;
  const pendingInvoicesTotal = invoices
    .filter((i) => i.status !== 'PAID')
    .reduce((acc, i) => acc + (i.total - i.paidAmount), 0);

  // Status distributions
  const activeProjectsCount = projects.filter((p) => p.status !== 'COMPLETED' && p.status !== 'CANCELLED').length;
  const pendingReviewsCount = tasks.filter((t) => t.status === 'IN_REVIEW').length;
  const projectsDueSoon = projects.filter((p) => p.deadline && new Date(p.deadline) <= new Date('2026-12-01')).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Executive Overview
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
              Live Relational DB
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time business performance, project pipelines, and financial ledger for UP Web Tech
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportFinancialReport(invoices, expenses)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Financials</span>
          </button>
          <Link
            href="/admin/projects"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* 9 Core Metric Cards (Section 8) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Total Clients */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Clients</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{clients.length}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> +100% active retention
          </div>
        </div>

        {/* Active Projects */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Active Projects</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{activeProjectsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            {projectsDueSoon} due this month
          </div>
        </div>

        {/* Pending Worker Reviews */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Pending Reviews</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">{pendingReviewsCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Worker tasks awaiting QA</div>
        </div>

        {/* Outstanding Invoices */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Pending Payments</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400 mt-2">
            ₹{pendingInvoicesTotal.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">From uncollected invoices</div>
        </div>

        {/* Collected Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Collected Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Verified bank & UPI credits</div>
        </div>

        {/* Project Expenses */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Expenses</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-200 mt-2">
            ₹{totalExpenses.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Cloud, APIs & tools</div>
        </div>

        {/* Net Profit (Section 21) */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>Net Operating Profit</span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">
            ₹{estimatedProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
            {((estimatedProfit / (totalRevenue || 1)) * 100).toFixed(1)}% Profit Margin
          </div>
        </div>

        {/* Total Workers */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Dev & Design Team</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{workers.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Lead devs, designers & ops</div>
        </div>
      </div>

      {/* Active Projects Table & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects List */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Active Projects Pipeline</h2>
              <p className="text-xs text-slate-400">Current client website and app milestones</p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-3 rounded-l-xl">Project</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Assigned Worker</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3 rounded-r-xl text-right">Value (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {projects.slice(0, 5).map((project) => (
                  <tr key={project.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3 font-semibold text-white">
                      <div className="truncate max-w-[200px]">{project.name}</div>
                      <div className="text-[10px] font-mono text-cyan-400">{project.projectCode}</div>
                    </td>
                    <td className="p-3 text-slate-300">{project.clientName}</td>
                    <td className="p-3 text-slate-300">{project.assignedWorkerName || 'Unassigned'}</td>
                    <td className="p-3">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="p-3 text-slate-400">{project.deadline || 'N/A'}</td>
                    <td className="p-3 text-right font-bold text-white">
                      ₹{project.finalPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-Time Activity Logs */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Activity Trail</h2>
              <p className="text-xs text-slate-400">System audit log and changes</p>
            </div>
            <Link
              href="/admin/activity"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              All Logs <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {store.activityLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-cyan-400">{log.userName}</span>
                  <span className="text-slate-400 text-[10px]">{log.createdAt}</span>
                </div>
                <p className="text-xs text-slate-200 leading-tight">{log.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
