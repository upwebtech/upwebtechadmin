'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Pin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  FileText,
  CreditCard,
  AlertCircle,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';

export default function ClientNoticesPage() {
  const { user } = useAuth();
  const [, setTick] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const clientNotices = store.notices.filter(
    (n) => n.audience === 'ALL' || n.audience === 'CLIENT'
  );

  const filteredNotices = clientNotices.filter((n) => {
    const matchesCategory =
      selectedCategory === 'ALL' || n.category === selectedCategory;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'ALL', label: 'All Notices' },
    { id: 'POLICY', label: 'Client SLA & Deliverables' },
    { id: 'ANNOUNCEMENT', label: 'Staging & Releases' },
    { id: 'PAYMENT', label: 'GST & Invoicing' },
    { id: 'MAINTENANCE', label: 'Cloud Uptime' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Client Notice Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
            Client Advisory
          </span>
          <h1 className="text-2xl font-black text-white mt-2">
            Official Agency Notices &amp; Bulletins
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Important updates regarding project delivery milestones, staging environments, GST invoices, and holidays.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-amber-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>UP Web Tech Executive Desk</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bulletins..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Notices */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`p-6 rounded-2xl border transition-all ${
              notice.isPinned
                ? 'bg-slate-900/90 border-amber-400/30 shadow-lg shadow-amber-400/5'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {notice.isPinned && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      <Pin className="w-3 h-3" /> Pinned Bulletin
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800 font-semibold">
                    {notice.category}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {notice.createdAt}
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white">
                {notice.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {notice.content}
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div>
                  Published by: <strong className="text-slate-200">{notice.author}</strong>
                </div>
                <div className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Notice</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
