'use client';

import React, { useState } from 'react';
import { Settings, Save, RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';
import { store } from '@/lib/db/store';
import { Logo } from '@/components/branding/Logo';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to restore the platform database to factory seed data?')) {
      store.resetToSeed();
      setResetMessage(true);
      setTimeout(() => setResetMessage(false), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          Company &amp; System Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure branding, currency standards, project prefixes, and database maintenance
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        {/* Brand Display */}
        <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Official Brand Identity</h3>
            <p className="text-xs text-slate-400">Branded with your verified emblem and typography</p>
          </div>
          <Logo size="md" />
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                defaultValue="UP Web Tech"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Tagline</label>
              <input
                type="text"
                defaultValue="Web Development • Apps • SEO • Digital Solutions"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Support Email</label>
              <input
                type="email"
                defaultValue="contact@upwebtech.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone</label>
              <input
                type="text"
                defaultValue="+91 9876543210"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Operating Currency</label>
              <input
                type="text"
                defaultValue="INR (₹)"
                disabled
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default Timezone</label>
              <input
                type="text"
                defaultValue="Asia/Kolkata"
                disabled
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Code Prefix</label>
              <input
                type="text"
                defaultValue="PRJ-2026-"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Invoice Prefix</label>
              <input
                type="text"
                defaultValue="INV-2026-"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            {saved ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Settings updated successfully
              </span>
            ) : (
              <span></span>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Database Maintenance / Factory Reset */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-rose-500/20 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <ShieldAlert className="w-4 h-4" />
          <span>Demo Data &amp; Database Maintenance</span>
        </div>
        <p className="text-xs text-slate-400">
          Reset all tables, projects, workers, clients, and activity logs to the clean factory seed state.
        </p>

        {resetMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
            ✓ Database successfully restored to factory seed data!
          </div>
        )}

        <button
          type="button"
          onClick={handleResetData}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 hover:border-rose-500/40 text-slate-300 text-xs font-bold border border-slate-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Factory Demo Data</span>
        </button>
      </div>
    </div>
  );
}
