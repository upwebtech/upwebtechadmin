'use client';

import React from 'react';
import { BarChart3, Download, FileSpreadsheet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { store } from '@/lib/db/store';
import { exportFinancialReport, exportProjects } from '@/lib/excel/excelService';

export default function ReportsPage() {
  const invoices = store.invoices;
  const expenses = store.expenses;
  const projects = store.projects;
  const workers = store.workers;

  const totalCollected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const netProfit = totalCollected - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Financial &amp; Operational Reports
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
              Excel Export Ready
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time profit &amp; loss analysis, project-level margin breakdowns, and workload metrics
          </p>
        </div>

        <button
          onClick={() => exportFinancialReport(invoices, expenses)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-500/20"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
          <span>Export Full Report (.xlsx)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Total Revenue Collected</div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">From completed payments</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">Operating Expenses</div>
          <div className="text-2xl font-black text-rose-400 mt-2">
            ₹{totalExpenses.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Cloud infra, domains &amp; APIs</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30">
          <div className="text-xs text-emerald-400 font-bold uppercase">Net Operating Profit</div>
          <div className="text-2xl font-black text-white mt-2">
            ₹{netProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
            {((netProfit / (totalCollected || 1)) * 100).toFixed(1)}% Realized Margin
          </div>
        </div>
      </div>

      {/* Project Profitability Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <h2 className="text-base font-bold text-white">Project-Level Profit Margin Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Project</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Agreed Price</th>
                <th className="p-3.5">Direct Expenses</th>
                <th className="p-3.5">Net Profit</th>
                <th className="p-3.5 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((p) => {
                const projectExpenses = expenses
                  .filter((e) => e.projectId === p.id)
                  .reduce((acc, e) => acc + e.amount, 0);
                const profit = p.finalPrice - projectExpenses;
                const margin = ((profit / (p.finalPrice || 1)) * 100).toFixed(1);

                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-bold text-white">{p.name}</td>
                    <td className="p-3.5 text-slate-300">{p.clientName}</td>
                    <td className="p-3.5 font-semibold text-white">₹{p.finalPrice.toLocaleString('en-IN')}</td>
                    <td className="p-3.5 text-rose-400">₹{projectExpenses.toLocaleString('en-IN')}</td>
                    <td className="p-3.5 font-bold text-emerald-400">₹{profit.toLocaleString('en-IN')}</td>
                    <td className="p-3.5 text-right font-black text-white">{margin}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
