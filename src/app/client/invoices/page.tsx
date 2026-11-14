'use client';

import React from 'react';
import { Receipt, CheckCircle2, Download } from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function ClientInvoicesPage() {
  const { user } = useAuth();
  const currentClient =
    store.clients.find((c) => c.email === user?.email) || store.clients[0];

  const myInvoices = store.invoices.filter((i) => i.clientId === currentClient?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          Billing &amp; Payment History
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review GST compliant invoices, payment receipts, and settlement dates
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Project / Milestone</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Settled Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {myInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-mono font-bold text-cyan-400">{inv.invoiceNumber}</td>
                  <td className="p-3.5 font-medium text-white">{inv.projectName || inv.notes}</td>
                  <td className="p-3.5 font-bold text-white">₹{inv.total.toLocaleString('en-IN')}</td>
                  <td className="p-3.5 font-semibold text-emerald-400">₹{inv.paidAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3.5">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="p-3.5 text-slate-400">{inv.dueDate}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => alert(`Downloading GST Invoice ${inv.invoiceNumber}...`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-700 transition"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
