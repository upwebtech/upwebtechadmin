'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Receipt,
  ThumbsUp,
  AlertCircle,
  CreditCard,
  FileText,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const [, setTick] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  // Find matching client record or default to Apollo Retail
  const currentClient =
    store.clients.find((c) => c.email === user?.email) || store.clients[0];

  const myProjects = store.projects.filter((p) => p.clientId === currentClient?.id);
  const myInvoices = store.invoices.filter((i) => i.clientId === currentClient?.id);

  const activeProject = myProjects[0];

  // Visual Roadmap Stages (Section 11)
  const roadmapStages = [
    { name: 'Requirements', status: 'COMPLETED' },
    { name: 'UI/UX Design', status: 'COMPLETED' },
    { name: 'Development', status: 'IN_PROGRESS' },
    { name: 'Testing & QA', status: 'PENDING' },
    { name: 'Client Review', status: 'PENDING' },
    { name: 'Live Deployment', status: 'PENDING' },
  ];

  const handleApproveWork = () => {
    if (activeProject) {
      store.updateProject(activeProject.id, { status: 'APPROVED' });
      store.logActivity(currentClient.contactName, 'CLIENT_APPROVE', 'Project', activeProject.id, `Client approved project deliverable: ${activeProject.name}`);
    }
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText) return;
    store.logActivity(currentClient.contactName, 'CLIENT_FEEDBACK', 'Project', activeProject?.id || '', `Client feedback: "${feedbackText}"`);
    setFeedbackSent(true);
    setFeedbackText('');
    setTimeout(() => setFeedbackSent(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            Client Portal
          </span>
          <h1 className="text-2xl font-black text-white mt-2">
            Welcome, {currentClient?.contactName || 'Valued Client'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {currentClient?.companyName} • UP Web Tech Verified Client Account
          </p>
        </div>

        {activeProject?.stagingUrl && (
          <Link
            href={activeProject.stagingUrl}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-500/20 shrink-0"
          >
            <span>Live Staging Sandbox</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Visual Roadmap Progression (Section 11) */}
      {activeProject && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono text-cyan-400">{activeProject.projectCode}</span>
              <h2 className="text-base font-bold text-white">{activeProject.name}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Target Launch:</span>
              <strong className="text-xs text-white">{activeProject.deadline || 'December 2026'}</strong>
            </div>
          </div>

          {/* Stepper Roadmap */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {roadmapStages.map((stage, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition ${
                  stage.status === 'COMPLETED'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : stage.status === 'IN_PROGRESS'
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  {stage.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : stage.status === 'IN_PROGRESS' ? (
                    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-ping"></div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700"></div>
                  )}
                </div>
                <div className="text-[11px] font-bold">{stage.name}</div>
                <div className="text-[9px] uppercase tracking-wider mt-0.5">
                  {stage.status === 'COMPLETED' ? 'Done' : stage.status === 'IN_PROGRESS' ? 'Active Now' : 'Upcoming'}
                </div>
              </div>
            ))}
          </div>

          {/* Approval & Changes Quick Panel */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
            <div className="text-xs text-slate-300">
              Deliverables ready for your inspection. Approve the build or request adjustments.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleApproveWork}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-500/20"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Approve Work</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback & Invoices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Revision / Feedback */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Direct Feedback & Revision Requests</h3>
          </div>
          <p className="text-xs text-slate-400">
            Send revision requests or comments directly to the UP Web Tech development team.
          </p>

          <form onSubmit={handleSendFeedback} className="space-y-3">
            <textarea
              rows={4}
              required
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="e.g. Please increase the font size of product titles on mobile devices..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            {feedbackSent && (
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                ✓ Feedback delivered to your development team!
              </div>
            )}
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-lg shadow-cyan-500/20"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Invoices & Billing Receipt */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Invoices & Statements</h3>
          </div>
          <p className="text-xs text-slate-400">Download GST invoices and track received payments</p>

          <div className="space-y-2.5">
            {myInvoices.map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="font-mono font-bold text-xs text-white">{inv.invoiceNumber}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Due: {inv.dueDate}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs text-white">₹{inv.total.toLocaleString('en-IN')}</div>
                  <div className="mt-0.5">
                    <StatusBadge status={inv.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
