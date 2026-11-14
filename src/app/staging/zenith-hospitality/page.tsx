'use client';

import React, { useState } from 'react';
import {
  Hotel,
  Calendar,
  Users,
  Star,
  CheckCircle2,
  Sparkles,
  Wifi,
  Coffee,
  UtensilsCrossed,
  ShieldCheck,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export default function ZenithHospitalityStagingPage() {
  const [selectedSuite, setSelectedSuite] = useState('royal');
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [isBooked, setIsBooked] = useState(false);

  const suites = [
    {
      id: 'royal',
      name: 'The Royal Presidential Suite',
      price: 18500,
      size: '1,200 sq.ft',
      bed: 'King Bed + Private Jacuzzi',
      features: ['Panoramic Valley View', 'Complimentary Butler', 'Champagne Breakfast', 'Private Helipad Access'],
      rating: 4.98,
      emoji: '👑',
    },
    {
      id: 'heritage',
      name: 'Heritage Luxury Grand Suite',
      price: 12000,
      size: '850 sq.ft',
      bed: 'King Bed + Balcony',
      features: ['Teak Wood Interiors', 'Heated Plunge Pool', 'High Tea Access', 'Spa Voucher'],
      rating: 4.92,
      emoji: '🏰',
    },
    {
      id: 'executive',
      name: 'Executive Deluxe Lakeview Room',
      price: 7500,
      size: '550 sq.ft',
      bed: 'Queen Bed',
      features: ['Lakefront Balcony', 'High-speed Starlink WiFi', 'Smart Room Automation', 'Express Laundry'],
      rating: 4.88,
      emoji: '🪟',
    },
  ];

  const currentSuite = suites.find((s) => s.id === selectedSuite) || suites[0];
  const totalAmount = currentSuite.price * nights;

  return (
    <div className="bg-slate-950 text-slate-100 flex-1 flex flex-col font-sans">
      {/* Luxury Resort Header */}
      <header className="bg-amber-950/40 border-b border-amber-900/40 px-6 py-4 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-serif text-xl font-black">
            Z
          </div>
          <div>
            <div className="text-base font-serif font-black text-amber-100 leading-tight">
              Zenith Grand Palace &amp; Luxury Resort
            </div>
            <div className="text-[11px] text-amber-300/70 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Varanasi Heritage Ghats &amp; Lucknow Estate</span>
            </div>
          </div>
        </div>

        <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
          STAGING PREVIEW v1.9
        </span>
      </header>

      {/* Main Booking Experience */}
      <div className="p-6 flex-1 max-w-6xl mx-auto w-full space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> 5-Star Luxury Heritage Retreat
          </div>
          <h2 className="text-3xl font-serif font-black text-white">
            Experience Timeless Indian Royalty
          </h2>
          <p className="text-xs text-slate-400">
            Preview the custom reservation booking engine built by UP Web Tech for Zenith Hospitality.
          </p>
        </div>

        {/* Room Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suites.map((suite) => (
            <div
              key={suite.id}
              onClick={() => setSelectedSuite(suite.id)}
              className={`p-6 rounded-3xl border transition cursor-pointer flex flex-col justify-between ${
                selectedSuite === suite.id
                  ? 'bg-amber-950/30 border-amber-500/60 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="text-4xl">{suite.emoji}</div>
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                    <span>{suite.size}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{suite.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{suite.name}</h3>
                  <div className="text-xs text-slate-400">{suite.bed}</div>
                </div>

                <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                  {suite.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-amber-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-lg font-black text-amber-300 font-mono">
                    ₹{suite.price.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">per night + taxes</div>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl ${
                    selectedSuite === suite.id
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {selectedSuite === suite.id ? 'Selected' : 'Select'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Reservation Card */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">Your Reservation Summary</h3>
            <div className="text-xs text-slate-300">
              Selected: <strong className="text-amber-400">{currentSuite.name}</strong> • {nights} Nights • {guests} Guests
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <label className="flex items-center gap-1.5">
                <span>Nights:</span>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-14 bg-slate-950 border border-slate-800 rounded-lg p-1 text-center font-bold text-white"
                />
              </label>
              <label className="flex items-center gap-1.5">
                <span>Guests:</span>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-14 bg-slate-950 border border-slate-800 rounded-lg p-1 text-center font-bold text-white"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Estimated Total</div>
              <div className="text-2xl font-black text-amber-300 font-mono">
                ₹{totalAmount.toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => setIsBooked(true)}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20"
            >
              {isBooked ? 'Reservation Queued ✓' : 'Instant Demo Booking'}
            </button>
          </div>
        </div>

        {isBooked && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Demo reservation confirmed for <strong>{currentSuite.name}</strong>! Staging test webhook dispatched.
              </span>
            </div>
            <button
              onClick={() => setIsBooked(false)}
              className="text-xs underline font-bold"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
