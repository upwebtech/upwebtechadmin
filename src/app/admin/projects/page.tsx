'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Plus,
  Search,
  Download,
  ExternalLink,
  Calendar,
  DollarSign,
  User,
  Trash2,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { Project, ProjectStatus, TaskPriority } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { exportProjects } from '@/lib/excel/excelService';

export default function ProjectsPage() {
  const [, setTick] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Project Form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [assignedWorkerId, setAssignedWorkerId] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [deadline, setDeadline] = useState('2026-12-15');
  const [finalPrice, setFinalPrice] = useState('50000');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [stagingUrl, setStagingUrl] = useState('');

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const clients = store.clients;
  const workers = store.workers;
  const services = store.services;

  const filteredProjects = store.projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.clientName && p.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.assignedWorkerName && p.assignedWorkerName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !clientId) return;

    store.addProject({
      name,
      description,
      clientId,
      serviceId: serviceId || undefined,
      assignedWorkerId: assignedWorkerId || undefined,
      status: 'PLANNING',
      priority,
      startDate: new Date().toISOString().split('T')[0],
      deadline,
      estimatedBudget: parseFloat(finalPrice) || 0,
      finalPrice: parseFloat(finalPrice) || 0,
      websiteUrl: websiteUrl || undefined,
      stagingUrl: stagingUrl || undefined,
    });

    setName('');
    setDescription('');
    setClientId('');
    setWebsiteUrl('');
    setStagingUrl('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Projects Portfolio
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
              {store.projects.length} Total
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking lifecycle stages from Requirements to Client Approval and Live Deployment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportProjects(store.projects)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Projects</span>
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by name, code, client, or worker..."
            className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 transition"
          />
        </div>

        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 w-full sm:w-auto"
        >
          <option value="ALL">All Statuses</option>
          <option value="PLANNING">Planning</option>
          <option value="DESIGN">Design</option>
          <option value="DEVELOPMENT">Development</option>
          <option value="CLIENT_REVIEW">Client Review</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Code & Project</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Assigned Worker</th>
                <th className="p-3.5">Stage & Status</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Deadline</th>
                <th className="p-3.5">Budget / Price</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                        <FolderKanban className="w-4 h-4" />
                      </div>
                      <div>
                        <div>{project.name}</div>
                        <span className="text-[10px] font-mono text-cyan-400">{project.projectCode}</span>
                        {project.stagingUrl && (
                          <Link
                            href={project.stagingUrl}
                            className="inline-flex items-center gap-0.5 ml-2 text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold"
                          >
                            Staging <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-200 font-medium">{project.clientName}</td>
                  <td className="p-3.5 text-slate-300">
                    {project.assignedWorkerName ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        {project.assignedWorkerName}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {/* Status Changer inline */}
                    <select
                      value={project.status}
                      onChange={(e) => store.updateProject(project.id, { status: e.target.value as ProjectStatus })}
                      className="bg-slate-950 border border-slate-800 text-[11px] font-semibold text-cyan-400 rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="LEAD">LEAD</option>
                      <option value="PLANNING">PLANNING</option>
                      <option value="DESIGN">DESIGN</option>
                      <option value="DEVELOPMENT">DEVELOPMENT</option>
                      <option value="TESTING">TESTING</option>
                      <option value="CLIENT_REVIEW">CLIENT_REVIEW</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={project.priority} type="priority" />
                  </td>
                  <td className="p-3.5 text-slate-400">{project.deadline || 'No deadline'}</td>
                  <td className="p-3.5 font-bold text-white">
                    ₹{project.finalPrice.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => store.deleteProject(project.id)}
                      title="Delete Project"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Project Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Modern E-Commerce Web Store"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Select Client *</label>
                  <select
                    required
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">-- Choose Client --</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Package</label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">-- Choose Service --</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (₹{s.basePrice.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Assign Lead Developer</label>
                  <select
                    value={assignedWorkerId}
                    onChange={(e) => setAssignedWorkerId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">-- Unassigned --</option>
                    {workers.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.fullName} ({w.designation})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Agreed Price (INR) *</label>
                  <input
                    type="number"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key features, tech requirements, deliverables..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-lg shadow-cyan-500/20"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
