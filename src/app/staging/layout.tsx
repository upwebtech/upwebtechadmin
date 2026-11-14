'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  ExternalLink,
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Send,
  X,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';

export default function StagingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role, user } = useAuth();
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackCategory, setFeedbackCategory] = useState<'UI_UX' | 'BUG' | 'FEATURE' | 'GENERAL'>('UI_UX');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const stagingProjects = [
    {
      name: 'Apollo Supermarket Store',
      slug: '/staging/apollo-retail',
      client: 'Apollo Retail Mart',
      badge: 'E-Commerce',
    },
    {
      name: 'Nexa Fleet GPS Portal',
      slug: '/staging/nexa-logistics',
      client: 'Nexa Logistics',
      badge: 'SaaS Dashboard',
    },
    {
      name: 'Zenith Grand Hotel Suite',
      slug: '/staging/zenith-hospitality',
      client: 'Zenith Hospitality',
      badge: 'Luxury Booking',
    },
  ];

  const currentProject = stagingProjects.find((p) => p.slug === pathname) || stagingProjects[0];

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackNote.trim()) return;

    store.logActivity(
      user?.fullName || 'Client Reviewer',
      'STAGING_QA_FEEDBACK',
      'StagingPreview',
      currentProject.name,
      `[${feedbackCategory}] ${feedbackNote}`
    );

    setFeedbackSuccess(true);
    setFeedbackNote('');
    setTimeout(() => {
      setFeedbackSuccess(false);
      setIsFeedbackOpen(false);
    }, 2500);
  };

  const returnHref =
    role === 'CLIENT'
      ? '/client/dashboard'
      : role === 'WORKER'
      ? '/worker/dashboard'
      : '/admin/dashboard';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Universal Staging Environment Header Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between sticky top-0 z-50 select-none shadow-md">
        {/* Left: Back & Project Context */}
        <div className="flex items-center gap-3">
          <Link
            href={returnHref}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit to</span> Portal
          </Link>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Staging Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-[280px] sm:max-w-none">
            {stagingProjects.map((proj) => {
              const isActive = pathname === proj.slug;
              return (
                <Link
                  key={proj.slug}
                  href={proj.slug}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{proj.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Center: Device Viewport Controls */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1.5 font-medium ${
              viewport === 'desktop'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop 100% View"
          >
            <Monitor className="w-4 h-4" />
            <span className="text-[11px]">Desktop</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1.5 font-medium ${
              viewport === 'tablet'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet 768px View"
          >
            <Tablet className="w-4 h-4" />
            <span className="text-[11px]">Tablet</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg text-xs transition flex items-center gap-1.5 font-medium ${
              viewport === 'mobile'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile 390px View"
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-[11px]">Mobile</span>
          </button>
        </div>

        {/* Right: Environment Info & QA Feedback Trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Staging Sandbox Live</span>
          </div>

          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Submit QA Note</span>
          </button>
        </div>
      </header>

      {/* Main Sandbox Container */}
      <main className="flex-1 bg-slate-950 flex flex-col items-center justify-start p-2 sm:p-4 overflow-y-auto">
        <div
          className={`transition-all duration-300 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col ${
            viewport === 'mobile'
              ? 'max-w-[390px] min-h-[750px] border-4 border-slate-750 my-4'
              : viewport === 'tablet'
              ? 'max-w-[768px] min-h-[850px] border-2 border-slate-750 my-4'
              : 'max-w-7xl min-h-[800px]'
          }`}
        >
          {children}
        </div>
      </main>

      {/* Feedback Drawer Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsFeedbackOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Submit Staging QA Feedback</h3>
                <p className="text-xs text-slate-400">
                  Direct review for: <strong className="text-cyan-400">{currentProject.name}</strong>
                </p>
              </div>
            </div>

            {feedbackSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 text-xs">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <div className="font-bold">Feedback Logged Successfully!</div>
                  <div className="text-slate-300 mt-0.5">
                    Assigned lead engineer has been notified in the activity feed.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendFeedback} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Category of Feedback
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'UI_UX', label: 'UI / Design' },
                      { id: 'BUG', label: 'Bug / Issue' },
                      { id: 'FEATURE', label: 'Feature Request' },
                      { id: 'GENERAL', label: 'General Review' },
                    ].map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setFeedbackCategory(cat.id as any)}
                        className={`p-2 text-xs font-semibold rounded-xl border text-center transition ${
                          feedbackCategory === cat.id
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Detailed Notes or Revision Request
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackNote}
                    onChange={(e) => setFeedbackNote(e.target.value)}
                    placeholder="e.g. Please check Razorpay UPI QR code alignment on mobile viewport, or font size in cart modal..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFeedbackOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Engineering Team</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
