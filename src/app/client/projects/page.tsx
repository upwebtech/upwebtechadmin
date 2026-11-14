'use client';

import React from 'react';
import Link from 'next/link';
import { FolderKanban, ExternalLink, Calendar, CheckCircle2, ThumbsUp } from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function ClientProjectsPage() {
  const { user } = useAuth();
  const currentClient =
    store.clients.find((c) => c.email === user?.email) || store.clients[0];

  const myProjects = store.projects.filter((p) => p.clientId === currentClient?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          My Websites &amp; Applications
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review project development progress, staging previews, and deliverables
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {myProjects.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400">{p.projectCode}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{p.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{p.description}</p>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Target Launch Date:</span>
              <strong className="text-white">{p.deadline || 'December 2026'}</strong>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {p.stagingUrl ? (
                <Link
                  href={p.stagingUrl}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-sm"
                >
                  <span>Preview Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="text-xs text-slate-400 italic">Staging link generating...</span>
              )}

              <button
                onClick={() => {
                  store.updateProject(p.id, { status: 'APPROVED' });
                  alert('Milestone approved! The team has been notified.');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 text-xs font-bold border border-slate-700 transition"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Approve</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
