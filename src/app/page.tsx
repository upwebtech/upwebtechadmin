'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  UserCheck,
  Users,
  Database,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Layers,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Globe,
  Code,
  CreditCard,
  Gauge,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Star,
  ChevronDown,
  Menu,
  X,
  HelpCircle,
  FileCheck,
  Award,
  DollarSign,
  ShoppingCart,
  Laptop,
  Check,
} from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { useAuth } from '@/lib/auth/AuthContext';

export default function HomePage() {
  const { loginAs } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Cost Estimator State
  const [calcType, setCalcType] = useState<'ECOMMERCE' | 'SAAS' | 'WEB_APP' | 'BUSINESS'>('ECOMMERCE');
  const [calcAuth, setCalcAuth] = useState(true);
  const [calcPayment, setCalcPayment] = useState(true);
  const [calcAdmin, setCalcAdmin] = useState(true);
  const [calcSpeed, setCalcSpeed] = useState<'STANDARD' | 'EXPRESS'>('STANDARD');

  // Base price calculation in INR
  const basePrices = {
    ECOMMERCE: 65000,
    SAAS: 95000,
    WEB_APP: 75000,
    BUSINESS: 40000,
  };

  const calculatedTotal =
    basePrices[calcType] +
    (calcAuth ? 8000 : 0) +
    (calcPayment ? 12000 : 0) +
    (calcAdmin ? 15000 : 0) +
    (calcSpeed === 'EXPRESS' ? 20000 : 0);

  const calculatedDuration =
    calcSpeed === 'EXPRESS' ? '3 to 4 Weeks' : '6 to 8 Weeks';

  const faqs = [
    {
      q: 'Why do you provide live interactive staging links before launch?',
      a: 'We believe in 100% transparency. With our Live Staging Sandboxes, you can test every button, cart journey, mobile layout, and payment gateway flow in a real environment before your website ever touches public eyes or search engines.',
    },
    {
      q: 'How does milestone payment & GST invoicing work?',
      a: 'We work on transparent, milestone-guarded delivery. Typically, projects are structured into 50% advance to initiate architecture and UI/UX sprints, and 50% upon final client sign-off on the Live Staging Sandbox. Every invoice is 100% GST-compliant with automated input tax credit (ITC) generation.',
    },
    {
      q: 'Who owns the intellectual property and source code?',
      a: 'You do. Upon project completion and final settlement, 100% full intellectual property (IP), source code repository access, Figma design systems, database credentials, and cloud deployment rights are transferred directly to your organization.',
    },
    {
      q: 'Can this platform be self-hosted for our own agency or company operations?',
      a: 'Yes! The UP Web Tech Business Management Platform is engineered using open-source technologies (Next.js 16, React 19, TypeScript, PostgreSQL/Supabase, SheetJS). It requires zero recurring SaaS subscription fees and can be self-hosted on your own cloud VPS or Vercel.',
    },
    {
      q: 'What is your revision and post-launch maintenance policy?',
      a: 'Every project tier includes 3 complimentary comprehensive revision cycles during the Staging QA phase. Post-launch, we provide 30 to 90 days of dedicated warranty bug fixing, security patching, and cloud monitoring.',
    },
  ];

  // Schema.org JSON-LD SEO structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'UP Web Tech - Business Management Platform & Software Engineering',
    image: 'https://upwebtech.com/logo.jpg',
    url: 'https://upwebtech.com',
    telephone: '+919876543210',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tech Zone IV',
      addressLocality: 'Greater Noida / Lucknow Corridor',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201306',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
    sameAs: ['https://github.com/upwebtech', 'https://linkedin.com/company/upwebtech'],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-900 via-slate-900 to-blue-950 text-slate-200 px-4 py-2 text-xs font-semibold border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="truncate">
              🚀 <strong>UP Web Tech (Since 2026)</strong> — Premier Web Engineering &amp; Client Delivery Platform in Uttar Pradesh
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] shrink-0 font-medium">
            <span className="text-slate-400">⚡ Booking Q1/Q2 Sprints</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-bold">Free Live Staging Sandbox</span>
          </div>
        </div>
      </div>

      {/* Main Enterprise Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl px-4 sm:px-8 py-4 sticky top-0 z-40 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo with Since 2026 */}
          <div className="flex items-center gap-4">
            <Logo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#services" className="hover:text-cyan-400 transition">
              Services
            </a>
            <a href="#staging" className="hover:text-cyan-400 transition flex items-center gap-1">
              <span>Live Staging Labs</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 text-[10px] border border-cyan-500/20 font-bold">
                TEST
              </span>
            </a>
            <a href="#process" className="hover:text-cyan-400 transition">
              Our Process
            </a>
            <a href="#calculator" className="hover:text-cyan-400 transition">
              Cost Estimator
            </a>
            <a href="#reviews" className="hover:text-cyan-400 transition">
              Case Studies
            </a>
            <a href="#faq" className="hover:text-cyan-400 transition">
              FAQ
            </a>
          </nav>

          {/* Action Portal Buttons & Hamburger Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/admin/dashboard"
                onClick={() => loginAs('SUPER_ADMIN')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 text-xs font-bold transition shadow-sm"
              >
                Admin
              </Link>
              <Link
                href="/worker/dashboard"
                onClick={() => loginAs('WORKER')}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-emerald-400 hover:text-white border border-slate-800 text-xs font-bold transition shadow-sm"
              >
                Worker
              </Link>
              <Link
                href="/client/dashboard"
                onClick={() => loginAs('CLIENT')}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-600/25"
              >
                Client Portal
              </Link>
            </div>

            {/* Three-Line Hamburger Side Panel Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
              aria-label="Toggle Side Panel"
              title="Open Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sliding Mobile & Quick Side Panel Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 flex justify-end">
          <div className="w-full max-w-sm bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <Logo size="sm" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Portal Gateway Section */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Operational Portal
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => {
                      loginAs('SUPER_ADMIN');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-xs font-bold text-white transition"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      Admin Command Center
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  <Link
                    href="/worker/dashboard"
                    onClick={() => {
                      loginAs('WORKER');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-xs font-bold text-white transition"
                  >
                    <span className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      Worker Station (Developers)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>

                  <Link
                    href="/client/dashboard"
                    onClick={() => {
                      loginAs('CLIENT');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-xs font-bold text-white transition"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-400" />
                      Client Review Portal
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Explore Agency
                </div>
                {[
                  { name: 'Services Catalog', href: '#services' },
                  { name: 'Live Staging Sandboxes', href: '#staging' },
                  { name: '6-Stage Delivery Process', href: '#process' },
                  { name: 'Cost & Timeline Estimator', href: '#calculator' },
                  { name: 'Client Case Studies', href: '#reviews' },
                  { name: 'Frequently Asked Questions', href: '#faq' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Side Panel Footer & Contact */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-xs text-slate-400">
                <div>UP Web Tech (Since 2026)</div>
                <div className="text-[11px] text-slate-500">Greater Noida &amp; Lucknow, UP, India</div>
              </div>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-8 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Zap className="w-4 h-4" /> High-Performance Web &amp; App Engineering
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            We Architect &amp; Deploy Digital Platforms That Build{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Unshakable Client Trust
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
            The end-to-end software engineering studio for ambitious Indian businesses. From fast
            e-commerce stores with instant Razorpay checkout to custom enterprise SaaS, transparent
            sprint milestones, and live interactive staging sandboxes.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/admin/dashboard"
              onClick={() => loginAs('SUPER_ADMIN')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-sm transition shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 group"
            >
              <span>Launch Agency Operating System</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/staging/apollo-retail"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Test Live Staging Sandbox</span>
            </Link>
          </div>

          {/* Trust Checkmarks */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>MSME Registered (UP, India)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Free Self-Hostable Code</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>GST Compliant Invoicing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dedicated Staging Before Launch</span>
            </div>
          </div>

          {/* Live Performance Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">120+</div>
              <div className="text-xs text-slate-400 mt-1">Platforms Deployed</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">₹4.2 Cr+</div>
              <div className="text-xs text-slate-400 mt-1">Client Revenue Processed</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">99.98%</div>
              <div className="text-xs text-slate-400 mt-1">High-Availability Uptime</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">&lt;450ms</div>
              <div className="text-xs text-slate-400 mt-1">Core Web Vitals Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Staging Showcase Section */}
      <section id="staging" className="py-20 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Zero Guesswork • 100% Real
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Explore Our Live Interactive Staging Sandboxes
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Never wait until launch day to see your project. Test live responsive layouts, simulated
              Razorpay checkout journeys, and real-time telemetry directly in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Apollo Supermarket */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🛒</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    E-Commerce
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">
                    Apollo Supermarket Online Store
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Client: Apollo Retail Mart • Noida Sector 62
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fast 30-minute grocery delivery store with dynamic cart drawer, coupon engine
                  (APOLLO20), and working Razorpay checkout simulation.
                </p>
                <div className="pt-2 text-xs text-emerald-400 font-semibold space-y-1">
                  <div>✓ Razorpay UPI &amp; Cards Gateway</div>
                  <div>✓ Express Delivery Geofence</div>
                  <div>✓ Mobile &amp; Desktop Tested</div>
                </div>
              </div>

              <Link
                href="/staging/apollo-retail"
                className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-600/20"
              >
                <span>Launch Apollo Staging Sandbox</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            {/* 2. Nexa Logistics */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🚚</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold">
                    SaaS Telemetry
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">
                    Nexa Fleet GPS Tracking SaaS
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Client: Nexa Logistics Solutions • Delhi &amp; Lucknow
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real-time GPS vehicle telematics portal with simulated driver telemetry, cold-chain reefer
                  temperature sensor monitoring, and fuel optimization.
                </p>
                <div className="pt-2 text-xs text-cyan-400 font-semibold space-y-1">
                  <div>✓ Live WebSocket Telemetry Route</div>
                  <div>✓ Cold-Chain Reefer Sensor Alerts</div>
                  <div>✓ Fleet Dispatch Matrix</div>
                </div>
              </div>

              <Link
                href="/staging/nexa-logistics"
                className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-lg shadow-cyan-600/20"
              >
                <span>Launch Nexa Staging Sandbox</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            {/* 3. Zenith Grand Hotel */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">👑</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                    Luxury Hospitality
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                    Zenith Grand Luxury Resort
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Client: Zenith Hospitality • Varanasi &amp; Lucknow
                  </p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  5-star luxury heritage resort reservation platform with interactive presidential suite
                  viewer, guest count calculators, and banquet bookings.
                </p>
                <div className="pt-2 text-xs text-amber-400 font-semibold space-y-1">
                  <div>✓ 360 Suite Reservation Flow</div>
                  <div>✓ Real-time Room Price Calculator</div>
                  <div>✓ Luxury Concierge Experience</div>
                </div>
              </div>

              <Link
                href="/staging/zenith-hospitality"
                className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20"
              >
                <span>Launch Zenith Staging Sandbox</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Catalog */}
      <section id="services" className="py-20 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              End-To-End Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Engineering Solutions Tailored for Indian Scale
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              We do not build generic template sites. We engineer high-converting digital infrastructure with
              sub-second load times and rock-solid reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: 'High-Converting Web Applications',
                desc: 'Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. Ultra-optimized for SEO, accessibility, and high conversion.',
                tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4'],
                color: 'text-cyan-400',
              },
              {
                icon: ShoppingCart,
                title: 'High-Volume E-Commerce Stores',
                desc: 'Fast shopping carts, instant search, WhatsApp order notifications, and verified Razorpay & Cashfree UPI integration.',
                tech: ['Razorpay', 'Cashfree', 'WhatsApp API', 'Inventory Sync'],
                color: 'text-emerald-400',
              },
              {
                icon: Database,
                title: 'Custom Enterprise SaaS & Portals',
                desc: 'Scalable multi-tenant cloud applications powered by PostgreSQL, Supabase, Redis queues, and strict role-based access control.',
                tech: ['PostgreSQL', 'Supabase', 'Redis', 'Role RBAC'],
                color: 'text-purple-400',
              },
              {
                icon: Smartphone,
                title: 'Cross-Platform Mobile Apps',
                desc: 'Native-feel iOS and Android mobile applications using React Native and Flutter with real-time push notifications and offline mode.',
                tech: ['React Native', 'Flutter', 'iOS & Android', 'Firebase'],
                color: 'text-amber-400',
              },
              {
                icon: Gauge,
                title: 'Technical SEO & Core Web Vitals',
                desc: 'Guaranteed 95+ Google PageSpeed score, JSON-LD Schema markup, structured OpenGraph tags, and sub-450ms TTFB edge caching.',
                tech: ['Schema.org', 'PageSpeed 95+', 'Edge CDN', 'Zero CLS'],
                color: 'text-rose-400',
              },
              {
                icon: ShieldCheck,
                title: 'GST Invoicing & Business OS',
                desc: 'Self-hostable business management platform with automated GST calculations, client CRM, worker allocation, and Excel export.',
                tech: ['SheetJS XLSX', 'GST Auto-calc', 'Worker Station', 'Client CRM'],
                color: 'text-blue-400',
              },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold ${srv.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">{srv.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {srv.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 font-mono border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6-Stage Transparent Delivery Process */}
      <section id="process" className="py-20 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Transparent Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Our Proven 6-Stage Engineering Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How we take your idea from strategic discovery to a verified, live staging sandbox and production launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Strategic Discovery & Architecture',
                desc: 'We map out your business objectives, target audience, database schema requirements, and technical API dependencies.',
              },
              {
                step: '02',
                title: 'High-Fidelity Figma UI/UX Design',
                desc: 'Interactive Figma wireframes and mobile-first design systems crafted with your brand identity before writing code.',
              },
              {
                step: '03',
                title: 'Agile Full-Stack Development',
                desc: 'Clean, type-safe Next.js & React engineering. Daily sprint commits logged directly to your project workspace.',
              },
              {
                step: '04',
                title: 'Dedicated Live Staging Preview',
                desc: 'Your private staging environment goes live. You and your team test the checkout, forms, and speeds in real conditions.',
              },
              {
                step: '05',
                title: 'Client Review & GST Invoicing',
                desc: 'Comprehensive 3-cycle revision guarantee. Final milestone sign-off with official GST input-tax invoice generation.',
              },
              {
                step: '06',
                title: 'Production Launch & 24/7 SLA',
                desc: 'Zero-downtime DNS propagation, Cloudflare edge SSL setup, Google Search Console indexing, and warranty monitoring.',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden"
              >
                <div className="text-3xl font-black text-slate-800 font-mono mb-3">
                  {p.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Cost & Timeline Estimator */}
      <section id="calculator" className="py-20 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950/70">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Instant Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Interactive Project Cost &amp; Timeline Estimator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              Select your requirements below to see an instant ballpark investment estimate in Indian Rupees (₹)
              with milestone payment structure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Options on Left */}
            <div className="lg:col-span-2 space-y-6">
              {/* Type */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  1. Select Platform Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'ECOMMERCE', label: 'E-Commerce Store' },
                    { id: 'SAAS', label: 'Custom SaaS Portal' },
                    { id: 'WEB_APP', label: 'Full-Stack Web App' },
                    { id: 'BUSINESS', label: 'Corporate Website' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setCalcType(t.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                        calcType === t.id
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  2. Required Integrations
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <span className="text-xs font-semibold text-slate-200">
                      Razorpay / Cashfree UPI Payment Gateway &amp; Auto Invoicing (+₹12,000)
                    </span>
                    <input
                      type="checkbox"
                      checked={calcPayment}
                      onChange={(e) => setCalcPayment(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-600 bg-slate-900 border-slate-700 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <span className="text-xs font-semibold text-slate-200">
                      Executive Admin Dashboard &amp; Client CRM (+₹15,000)
                    </span>
                    <input
                      type="checkbox"
                      checked={calcAdmin}
                      onChange={(e) => setCalcAdmin(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-600 bg-slate-900 border-slate-700 focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700">
                    <span className="text-xs font-semibold text-slate-200">
                      OTP / Email Authentication &amp; Customer Accounts (+₹8,000)
                    </span>
                    <input
                      type="checkbox"
                      checked={calcAuth}
                      onChange={(e) => setCalcAuth(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-600 bg-slate-900 border-slate-700 focus:ring-0"
                    />
                  </label>
                </div>
              </div>

              {/* Delivery Speed */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  3. Delivery Timeline
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcSpeed('STANDARD')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                      calcSpeed === 'STANDARD'
                        ? 'bg-slate-800 text-white border-cyan-500/50'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Standard Sprint (6-8 Weeks)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcSpeed('EXPRESS')}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                      calcSpeed === 'EXPRESS'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    ⚡ Express Priority (3-4 Weeks)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Card on Right */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  Estimated Investment
                </span>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                    ₹{calculatedTotal.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">+ 18% GST (ITC Eligible)</div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Sprint Duration:</span>
                    <strong className="text-white">{calculatedDuration}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Phase 1 Advance (50%):</span>
                    <strong className="text-cyan-400 font-mono">
                      ₹{Math.round(calculatedTotal * 0.5).toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Final on Staging Signoff (50%):</span>
                    <strong className="text-emerald-400 font-mono">
                      ₹{Math.round(calculatedTotal * 0.5).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/919876543210?text=Hi%20UP%20Web%20Tech,%20I%20would%20like%20to%20discuss%20my%20project%20estimate."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs transition text-center shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Lock This Price on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Client Testimonials */}
      <section id="reviews" className="py-20 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Proven Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Trusted by Fast-Growing Indian Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Read how UP Web Tech helped businesses modernize their workflows and scale digital sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;UP Web Tech delivered our Apollo Supermarket web store with live Razorpay checkout in record
                time. The live staging link allowed our team to test all 500 grocery SKUs before launch. Our online
                orders skyrocketed by 310% in the first two months!&rdquo;
              </p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Vikram Malhotra</div>
                  <div className="text-[11px] text-slate-400">Managing Director, Apollo Retail Mart</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Verified Client
                </span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;The real-time fleet GPS SaaS built for Nexa Logistics handles 30+ vehicles effortlessly. The
                sub-second WebSocket telemetry and automated reefer temperature alerts saved us thousands in potential
                spoilage. Exceptional engineering caliber.&rdquo;
              </p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Sneha Reddy</div>
                  <div className="text-[11px] text-slate-400">Operations Head, Nexa Logistics</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Verified Client
                </span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;Our luxury resort suites demand elegance and seamless room reservations. The 360 preview
                engine and instant date-picker calculators built by UP Web Tech gave us a direct booking conversion
                rate twice our old portal.&rdquo;
              </p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Rohit Khanna</div>
                  <div className="text-[11px] text-slate-400">General Manager, Zenith Grand Hotel</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Verified Client
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-Friendly FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Everything you need to know about our technology, self-hosting rights, and delivery guarantees.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Level Luxury Enterprise Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Col 1: Identity & Credentials */}
            <div className="lg:col-span-2 space-y-4">
              <Logo size="md" />
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                <strong>UP Web Tech Private Digital Solutions</strong> is Uttar Pradesh&apos;s premier web
                engineering agency. We build, host, and scale modern web platforms, e-commerce stores, and
                custom business operating systems.
              </p>
              <div className="space-y-1 text-[11px] text-slate-500">
                <div>🏢 Registered Office: Tech Zone IV, Greater Noida, UP - 201306</div>
                <div>🇮🇳 MSME Registration: UDYAM-UP-28-009412</div>
                <div>📑 GSTIN: 09AAACU9812K1Z9 (100% Tax Compliant)</div>
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Services</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#services" className="hover:text-cyan-400 transition">Custom Web Applications</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition">E-Commerce Development</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition">SaaS &amp; Cloud Portals</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition">Razorpay Payment Integration</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition">Core Web Vitals SEO</a></li>
              </ul>
            </div>

            {/* Col 3: Staging Sandboxes */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Live Staging Labs</div>
              <ul className="space-y-2 text-xs">
                <li><Link href="/staging/apollo-retail" className="hover:text-cyan-400 transition">Apollo Supermarket Store</Link></li>
                <li><Link href="/staging/nexa-logistics" className="hover:text-cyan-400 transition">Nexa Fleet GPS Portal</Link></li>
                <li><Link href="/staging/zenith-hospitality" className="hover:text-cyan-400 transition">Zenith Grand Suites</Link></li>
                <li><Link href="/client/dashboard" className="hover:text-cyan-400 transition">Client Review Portal</Link></li>
                <li><Link href="/worker/dashboard" className="hover:text-cyan-400 transition">Worker Station</Link></li>
              </ul>
            </div>

            {/* Col 4: Contact & Hotline */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Corporate Hotline</div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>contact@upwebtech.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                    WhatsApp Desk (24/7)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Security Seals */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              &copy; 2026 UP Web Tech. All rights reserved. Self-hostable, open-source agency platform.
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
              </span>
              <span>•</span>
              <span>Cloudflare Edge Secured</span>
              <span>•</span>
              <span>Next.js 16 Powered</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
