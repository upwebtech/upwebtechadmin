'use client';

import React, { useState } from 'react';
import { Layers, Plus, CheckCircle2 } from 'lucide-react';
import { store } from '@/lib/db/store';

export default function ServicesPage() {
  const services = store.services;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Service Packages &amp; Offerings
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
              Standard Rates
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pre-configured service packages with standard delivery timelines and base pricing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  {service.estimatedDays} Days Delivery
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Active
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{service.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{service.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">Starting from</div>
              <div className="text-lg font-black text-white">
                ₹{service.basePrice.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
