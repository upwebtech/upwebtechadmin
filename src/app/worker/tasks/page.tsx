'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Send,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List,
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import { useAuth } from '@/lib/auth/AuthContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TaskStatus } from '@/types';

export default function WorkerTasksPage() {
  const { user } = useAuth();
  const [, setTick] = useState(0);
  const [viewMode, setViewMode] = useState<'KANBAN' | 'LIST'>('KANBAN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');

  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const currentWorker =
    store.workers.find((w) => w.email === user?.email) || store.workers[0];

  const myTasks = store.tasks.filter(
    (t) => t.assignedWorkerId === currentWorker?.id
  );

  const filteredTasks = myTasks.filter((t) => {
    const matchesPriority =
      selectedPriority === 'ALL' || t.priority === selectedPriority;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.projectTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'TODO', label: 'To Do', color: 'border-slate-700' },
    { id: 'IN_PROGRESS', label: 'In Progress', color: 'border-cyan-500/40' },
    { id: 'IN_REVIEW', label: 'In Review (QA)', color: 'border-amber-400/40' },
    { id: 'DONE', label: 'Completed', color: 'border-emerald-500/40' },
  ];

  const handleMoveStatus = (taskId: string, newStatus: TaskStatus) => {
    store.updateTaskStatus(taskId, newStatus, currentWorker.fullName);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Tasks &amp; Sprint Kanban Board
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
              {myTasks.length} Assigned
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track agile deliverables, move tasks across sprint stages, and verify with staging environments
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('KANBAN')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'KANBAN'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('LIST')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              viewMode === 'LIST'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3 h-3" /> Priority:
          </span>
          {['ALL', 'URGENT', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${
                selectedPriority === p
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, projects..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'KANBAN' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">{col.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs italic">
                      No tasks in {col.label}
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-xl p-3.5 space-y-2.5 transition shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <StatusBadge status={task.priority} type="priority" />
                          <span className="text-[10px] text-slate-400 font-mono">
                            {task.deadline || 'No date'}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-2">
                            {task.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                            {task.description}
                          </p>
                        </div>

                        <div className="text-[10px] text-cyan-400 font-medium truncate pt-1 border-t border-slate-800/60">
                          {task.projectTitle}
                        </div>

                        {/* Staging link helper */}
                        <div className="flex items-center justify-between pt-1">
                          <Link
                            href="/staging/apollo-retail"
                            className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline"
                          >
                            <span>Test on Staging</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>

                          {/* Quick Status Forward / Backward */}
                          <div className="flex items-center gap-1">
                            {col.id !== 'TODO' && (
                              <button
                                onClick={() => {
                                  const prevStatus =
                                    col.id === 'DONE'
                                      ? 'IN_REVIEW'
                                      : col.id === 'IN_REVIEW'
                                      ? 'IN_PROGRESS'
                                      : 'TODO';
                                  handleMoveStatus(task.id, prevStatus);
                                }}
                                title="Move backward"
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                            )}

                            {col.id !== 'DONE' && (
                              <button
                                onClick={() => {
                                  const nextStatus =
                                    col.id === 'TODO'
                                      ? 'IN_PROGRESS'
                                      : col.id === 'IN_PROGRESS'
                                      ? 'IN_REVIEW'
                                      : 'DONE';
                                  handleMoveStatus(task.id, nextStatus);
                                }}
                                title="Move forward"
                                className="p-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List / Table View */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Task Title</th>
                  <th className="p-3.5">Project</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">Deadline</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Staging QA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 font-bold text-white">
                      <div>{task.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                        {task.description}
                      </div>
                    </td>
                    <td className="p-3.5 text-cyan-400 font-medium">
                      {task.projectTitle}
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={task.priority} type="priority" />
                    </td>
                    <td className="p-3.5 text-slate-400">{task.deadline || 'No deadline'}</td>
                    <td className="p-3.5">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          store.updateTaskStatus(
                            task.id,
                            e.target.value as TaskStatus,
                            currentWorker.fullName
                          )
                        }
                        className="bg-slate-950 border border-slate-800 text-[11px] font-semibold text-cyan-400 rounded-lg px-2 py-1 focus:outline-none"
                      >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="BLOCKED">BLOCKED</option>
                        <option value="IN_REVIEW">IN REVIEW</option>
                        <option value="DONE">DONE</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        href="/staging/apollo-retail"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-slate-700 text-[11px] font-bold"
                      >
                        <span>Staging</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
