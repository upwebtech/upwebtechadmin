'use client';

import React, { useState, useEffect } from 'react';
import { ScrollText, Search, Clock, User, ShieldCheck } from 'lucide-react';
import { store } from '@/lib/db/store';

export default function ActivityLogsPage() {
  const [, setTick] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const filteredLogs = store.activityLogs.filter(
    (l) =>
      l.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.entityType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          System Activity &amp; Audit Trail
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
            Immutable Log
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete audit history of project state transitions, worker submissions, and billing events
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by user, action, or description..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 transition"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor / User</th>
                <th className="p-3.5">Action Event</th>
                <th className="p-3.5">Entity</th>
                <th className="p-3.5">Event Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-mono text-slate-400">{log.createdAt}</td>
                  <td className="p-3.5 font-bold text-cyan-400">{log.userName}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300 font-semibold">{log.entityType}</td>
                  <td className="p-3.5 text-white">{log.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
