'use client';

import React, { useState, useEffect } from 'react';
import {
  Receipt,
  Plus,
  Search,
  DollarSign,
  Download,
  CreditCard,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { exportFinancialReport } from '@/lib/excel/excelService';

export default function InvoicesPage() {
  const [, setTick] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');

  // New Invoice Form
  const [projectId, setProjectId] = useState('');
  const [clientId, setClientId] = useState('');
  const [amount, setAmount] = useState('35000');
  const [notes, setNotes] = useState('Development Milestone 1');

  // Record Payment Form
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI Business');
  const [reference, setReference] = useState('');

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const projects = store.projects;
  const clients = store.clients;
  const invoices = store.invoices;

  const totalInvoiced = invoices.reduce((acc, i) => acc + i.total, 0);
  const totalCollected = invoices.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalOutstanding = totalInvoiced - totalCollected;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    const sub = parseFloat(amount) || 0;
    const tax = Math.round(sub * 0.18); // 18% GST
    const total = sub + tax;
    const client = clients.find((c) => c.id === clientId);
    const project = projects.find((p) => p.id === projectId);

    store.addInvoice({
      projectId: projectId || undefined,
      projectName: project?.name,
      clientId,
      clientName: client?.companyName || 'Client',
      invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      subtotal: sub,
      discount: 0,
      tax,
      total,
      paidAmount: 0,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'SENT',
      notes,
    });

    setIsNewInvoiceOpen(false);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const pAmt = parseFloat(paymentAmount) || 0;
    if (!selectedInvoiceId || pAmt <= 0) return;

    store.recordPayment(selectedInvoiceId, pAmt, paymentMethod, reference);
    setIsPaymentOpen(false);
    setPaymentAmount('');
    setReference('');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Invoices & Billing Ledger
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              INR (₹) Standard
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate GST compliant invoices, record payments, and track client receivables
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportFinancialReport(store.invoices, store.expenses)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Financials</span>
          </button>
          <button
            onClick={() => setIsNewInvoiceOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-xs font-medium">Total Billed</div>
          <div className="text-2xl font-black text-white mt-2">₹{totalInvoiced.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-slate-400 mt-1">{invoices.length} Invoices generated</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-xs font-medium">Total Collected</div>
          <div className="text-2xl font-black text-emerald-400 mt-2">₹{totalCollected.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-400 mt-1">Received via UPI / NEFT</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-xs font-medium">Outstanding Balance</div>
          <div className="text-2xl font-black text-rose-400 mt-2">₹{totalOutstanding.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-slate-400 mt-1">Pending client clearance</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Client & Company</th>
                <th className="p-3.5">Project</th>
                <th className="p-3.5">Total (Incl. GST)</th>
                <th className="p-3.5">Paid Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5 text-right">Payment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv) => {
                const balance = inv.total - inv.paidAmount;
                return (
                  <tr key={inv.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-mono font-bold text-cyan-400">{inv.invoiceNumber}</td>
                    <td className="p-3.5 font-medium text-white">{inv.clientName}</td>
                    <td className="p-3.5 text-slate-300">{inv.projectName || 'General Service'}</td>
                    <td className="p-3.5 font-bold text-white">₹{inv.total.toLocaleString('en-IN')}</td>
                    <td className="p-3.5 text-emerald-400 font-semibold">₹{inv.paidAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3.5">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="p-3.5 text-slate-400">{inv.dueDate}</td>
                    <td className="p-3.5 text-right">
                      {inv.status !== 'PAID' ? (
                        <button
                          onClick={() => {
                            setSelectedInvoiceId(inv.id);
                            setPaymentAmount(String(balance));
                            setIsPaymentOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition shadow-sm"
                        >
                          + Record Payment
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Fully Paid
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isNewInvoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100">
            <h3 className="text-lg font-bold text-white mb-4">Generate GST Invoice</h3>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Client *</label>
                <select
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">-- Choose Client --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Project</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">-- General Service / Milestone --</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subtotal Amount (INR) *</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  18% GST (₹{Math.round((parseFloat(amount) || 0) * 0.18).toLocaleString('en-IN')}) will be added
                  automatically.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description / Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Phase 1 Advance / Deliverable"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewInvoiceOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-lg shadow-cyan-500/20"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {isPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100">
            <h3 className="text-lg font-bold text-white mb-4">Record Payment Receipt</h3>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Amount Paid (INR) *</label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="UPI Business">UPI Business</option>
                  <option value="Bank Transfer (NEFT/RTGS)">Bank Transfer (NEFT/RTGS)</option>
                  <option value="Razorpay">Razorpay Online Gateway</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">UTR / Transaction Reference</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. UTR-SBI20261114-893"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-500/20"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
