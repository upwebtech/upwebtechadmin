'use client';

import React, { useState } from 'react';
import {
  Truck,
  Navigation,
  MapPin,
  Clock,
  ShieldAlert,
  BatteryCharging,
  Gauge,
  Wifi,
  Radio,
  Search,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function NexaLogisticsStagingPage() {
  const [activeTab, setActiveTab] = useState<'FLEET' | 'TELEMETRY' | 'DISPATCH'>('FLEET');
  const [selectedVehicle, setSelectedVehicle] = useState('TRK-01');

  const fleet = [
    {
      id: 'TRK-01',
      plate: 'UP-16-AX-8912',
      driver: 'Rajesh Yadav',
      status: 'ON_ROUTE',
      from: 'Delhi Depot',
      to: 'Noida Hub 3',
      speed: 58,
      fuel: 78,
      temp: '4.2°C (Reefer)',
      eta: '18 mins',
      progress: 68,
    },
    {
      id: 'TRK-02',
      plate: 'UP-32-BZ-4105',
      driver: 'Sunil Gupta',
      status: 'DELIVERED',
      from: 'Greater Noida',
      to: 'Lucknow Central',
      speed: 0,
      fuel: 92,
      temp: 'Ambient',
      eta: 'Completed',
      progress: 100,
    },
    {
      id: 'TRK-03',
      plate: 'DL-01-EF-2290',
      driver: 'Manoj Kumar',
      status: 'ON_ROUTE',
      from: 'Gurugram Warehouse',
      to: 'Kanpur Logistics Park',
      speed: 64,
      fuel: 45,
      temp: '-18.5°C (Cold Chain)',
      eta: '2h 15m',
      progress: 42,
    },
  ];

  const currentVehicle = fleet.find((v) => v.id === selectedVehicle) || fleet[0];

  return (
    <div className="bg-slate-950 text-slate-100 flex-1 flex flex-col font-sans">
      {/* SaaS Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-cyan-600/20">
            🚚
          </div>
          <div>
            <div className="text-base font-black text-white leading-tight flex items-center gap-2">
              Nexa Fleet GPS SaaS
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                LIVE STAGING v3.1
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Real-time Freight &amp; Telemetry Command Portal
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold font-mono">WebSocket Telemetry: CONNECTED</span>
        </div>
      </header>

      {/* Main SaaS Dashboard Body */}
      <div className="p-6 flex-1 max-w-7xl mx-auto w-full space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Active Vehicles</span>
              <Truck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">28 / 30</div>
            <div className="text-[11px] text-emerald-400 mt-1">93.3% Fleet Utilization</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Deliveries Today</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">142 Orders</div>
            <div className="text-[11px] text-cyan-400 mt-1">98.6% On-Time SLA</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Fuel Economy</span>
              <Gauge className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">4.2 km/L</div>
            <div className="text-[11px] text-slate-400 mt-1">Optimal Route Saving ₹18,400</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Active Telemetry Pings</span>
              <Wifi className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white mt-1">120 pings/sec</div>
            <div className="text-[11px] text-purple-400 mt-1">Redis Pub/Sub Latency 14ms</div>
          </div>
        </div>

        {/* Live GPS Route Visualizer & Fleet List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simulated GPS Map */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Live Vehicle Telemetry: {currentVehicle.plate}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                ETA: {currentVehicle.eta}
              </span>
            </div>

            {/* Simulated GPS Radar Grid */}
            <div className="h-72 rounded-xl bg-slate-950 border border-slate-800 relative flex items-center justify-center overflow-hidden p-6">
              <div className="absolute inset-0 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
              <div className="relative text-center space-y-3 z-10">
                <div className="inline-flex p-3 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse">
                  <Truck className="w-8 h-8" />
                </div>
                <div className="text-sm font-bold text-white">
                  Route: {currentVehicle.from} → {currentVehicle.to}
                </div>
                <div className="text-xs text-cyan-300 font-mono">
                  Coordinates: 28.6139° N, 77.2090° E • Speed: {currentVehicle.speed} km/h
                </div>
                {/* Progress bar */}
                <div className="w-64 max-w-full mx-auto bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full transition-all"
                    style={{ width: `${currentVehicle.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Driver</span>
                <div className="font-bold text-white mt-0.5">{currentVehicle.driver}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Reefer Temp</span>
                <div className="font-bold text-cyan-400 mt-0.5">{currentVehicle.temp}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Fuel Tank</span>
                <div className="font-bold text-emerald-400 mt-0.5">{currentVehicle.fuel}%</div>
              </div>
            </div>
          </div>

          {/* Fleet Selector */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>Monitored Vehicles</span>
            </h3>

            <div className="space-y-2">
              {fleet.map((veh) => (
                <button
                  key={veh.id}
                  onClick={() => setSelectedVehicle(veh.id)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    selectedVehicle === veh.id
                      ? 'bg-cyan-500/10 border-cyan-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>{veh.plate}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        veh.status === 'DELIVERED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}
                    >
                      {veh.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {veh.from} → {veh.to}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Driver: {veh.driver} • {veh.speed} km/h
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
