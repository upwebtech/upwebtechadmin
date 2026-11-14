'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingDown,
  Plus,
  Search,
  DollarSign,
  Download,
  Calendar,
  Layers,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { exportFinancialReport } from '@/lib/excel/excelService';

export default function ExpensesPage() {
  const [, setTick] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Expense Form
  const [category, setCategory] = useState('Cloud Hosting & DB');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('3000');
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const projects = store.projects;
  const expenses = store.expenses;

  const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);

  const filteredExpenses = expenses.filter(
    (e) =>
      e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.projectName && e.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    const project = projects.find((p) => p.id === projectId);

    store.addExpense({
      category,
      description,
      amount: parseFloat(amount) || 0,
      projectId: projectId || undefined,
      projectName: project?.name,
      expenseDate: new Date().toISOString().split('T')[0],
      createdBy: 'Admin',
    });

    setDescription('');
    setAmount('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Business &amp; Project Expenses
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
              ₹{totalExpense.toLocaleString('en-IN')} Total
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track infrastructure, software licenses, domain registrations, and third-party APIs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportFinancialReport(store.invoices, store.expenses)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Expenses</span>
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-lg shadow-rose-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5">Linked Project</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-white">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                      {exp.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-200 font-medium">{exp.description}</td>
                  <td className="p-3.5 text-cyan-400">{exp.projectName || 'General Overhead'}</td>
                  <td className="p-3.5 text-slate-400">{exp.expenseDate}</td>
                  <td className="p-3.5 text-right font-black text-rose-400">
                    -₹{exp.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100">
            <h3 className="text-lg font-bold text-white mb-4">Record New Expense</h3>
            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Expense Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Cloud Hosting & DB">Cloud Hosting &amp; DB</option>
                  <option value="Third-Party API">Third-Party API</option>
                  <option value="Domain & SSL">Domain &amp; SSL</option>
                  <option value="Developer Tools">Developer Tools</option>
                  <option value="Contractor / Design">Contractor / Design</option>
                  <option value="Office & Hardware">Office &amp; Hardware</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. AWS RDS PostgreSQL Instance for 6 Months"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Amount (INR) *</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="3000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Link to Project (Optional)</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="">-- General Overhead --</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition shadow-lg shadow-rose-500/20"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
