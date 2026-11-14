'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Pin,
  Calendar,
  User,
  Tag,
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  Sparkles,
  Layers,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';
import { Notice, NoticeCategory } from '@/types';

export default function WorkerNoticesPage() {
  const { user } = useAuth();
  const [, setTick] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [acknowledged, setAcknowledged] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const workerNotices = store.notices.filter(
    (n) => n.audience === 'ALL' || n.audience === 'WORKER'
  );

  const filteredNotices = workerNotices.filter((n) => {
    const matchesCategory =
      selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'ALL', label: 'All Notices' },
    { id: 'SPRINT', label: 'Sprint & Deadlines' },
    { id: 'POLICY', label: 'Coding Standards' },
    { id: 'MAINTENANCE', label: 'DevOps & Server' },
    { id: 'ANNOUNCEMENT', label: 'General Updates' },
  ];

  const handleToggleAcknowledge = (id: string) => {
    setAcknowledged((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            Internal Operations
          </span>
          <h1 className="text-2xl font-black text-white mt-2 flex items-center gap-2">
            Worker Notice Board &amp; Engineering Advisories
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Official engineering guidelines, sprint delivery schedules, security standards, and platform updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Active Notices</div>
            <div className="text-2xl font-black text-emerald-400">{workerNotices.length}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices, tags..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            No notices found matching your criteria.
          </div>
        ) : (
          filteredNotices.map((notice) => {
            const isAck = acknowledged[notice.id];
            return (
              <div
                key={notice.id}
                className={`p-6 rounded-2xl border transition-all ${
                  notice.isPinned
                    ? 'bg-slate-900/90 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {notice.isPinned && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                          <Pin className="w-3 h-3" /> Pinned Notice
                        </span>
                      )}

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          notice.priority === 'URGENT'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : notice.priority === 'HIGH'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        }`}
                      >
                        {notice.priority}
                      </span>

                      <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {notice.category}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {notice.title}
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
                      {notice.content}
                    </p>

                    {notice.tags && notice.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {notice.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800 font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                    <div className="text-[11px] text-slate-400">
                      <div>Issued by: <strong className="text-slate-200">{notice.author}</strong></div>
                      <div className="text-[10px] text-slate-400">{notice.createdAt}</div>
                    </div>

                    <button
                      onClick={() => handleToggleAcknowledge(notice.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        isAck
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isAck ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{isAck ? 'Acknowledged ✓' : 'Mark as Read'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
